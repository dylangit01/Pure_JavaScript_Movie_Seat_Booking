const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

// Get data from localstorage and populate UI:
const populateUI = () => {
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add('selected')
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('movieIndex');

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
};

populateUI();

let ticketPrice = +movieSelect.value;

const setMovieData = (index, price) => {
  localStorage.setItem('movieIndex', index);
  localStorage.setItem('moviePrice', price)
};

const ticketTotalAmount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected');

  // convert all seats index into an array:
  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.textContent = String(selectedSeats.length);
  total.textContent = String(selectedSeats.length * ticketPrice);
};

movieSelect.addEventListener('change', e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  ticketTotalAmount();
});

container.addEventListener('click', e => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')
  }

  ticketTotalAmount()
});

ticketTotalAmount();





























