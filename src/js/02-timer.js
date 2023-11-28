import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');
const dateTimePickerInput = document.querySelector('#datetime-picker');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < new Date()) {
      return Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.disabled = false;
    }
  },
};

const flatpickrInstance = flatpickr(dateTimePickerInput, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

let timerId;
function updateCountdown() {
  const timeDifference = flatpickrInstance.selectedDates[0] - new Date();

  if (timeDifference <= 0) {
    clearInterval(timerId);
    startBtn.disabled = false;
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  daysElement.innerHTML = addLeadingZero(days);
  hoursElement.innerHTML = addLeadingZero(hours);
  minutesElement.innerHTML = addLeadingZero(minutes);
  secondsElement.innerHTML = addLeadingZero(seconds);
}

startBtn.addEventListener('click', () => {
  updateCountdown();
  startBtn.disabled = true;
  timerId = setInterval(updateCountdown, 1000);
});
