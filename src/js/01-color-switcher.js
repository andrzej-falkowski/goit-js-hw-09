const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let backgroundInterval;

function setColor() {
  document.body.style.background = getRandomHexColor();
}

startBtn.addEventListener('click', event => {
  event.target.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled');
  backgroundInterval = setInterval(setColor, 1000);
});

stopBtn.addEventListener('click', (event) => {
    event.target.setAttribute('disabled', '');
    startBtn.removeAttribute('disabled');
  clearInterval(backgroundInterval);
});
