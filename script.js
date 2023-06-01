// Написати таймер зворотнього відліку до Нового року який можна зупиняти при кліку на кнопку **Stop**

//! === Two button option ===

// const refs = {
//   timer: document.getElementById('timer'),
//   startBtn: document.getElementById('startBtn'),
//   stopBtn: document.getElementById('stopBtn'),
// };

// /*
//     1. створимо дату наступного Нового року, до якого будемо рахувати час
//     2. отримати поточну дату
//     3. від дати Нового року відняти поточну дату, таким чином ми отримаємо кількість мілісекунд, яка лишилась до Нового року
//     4. З нашої різниці витягнути дні, години, хвилини і секунди
//     5. Показати результат на екрані
//     6. Запустити сет інтервал, який буде оновлювати час кожну секунду
// */

// const countDownDate = new Date(`Jan 1 ${new Date().getFullYear() + 1}`);

// refs.startBtn.addEventListener('click', startTimer);
// refs.stopBtn.addEventListener('click', stopTimer);

// countDownTimeToNY();
// let intervalId = setInterval(countDownTimeToNY, 1000);

// function countDownTimeToNY() {
//   const now = new Date().getTime();
//   const diff = countDownDate - now;
//   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//   const minutes = Math.floor((diff / (1000 * 60)) % 60);
//   const seconds = Math.floor((diff / 1000) % 60);
//   refs.timer.textContent = `${days} days ${addZero(hours)} hours ${addZero(
//     minutes,
//   )} minutes ${addZero(seconds)} seconds`;

// }

// function stopTimer() {
//   clearInterval(intervalId);
//   refs.stopBtn.disabled = true;
//   refs.startBtn.disabled = false;
//   console.log(intervalId);
// }

// function startTimer() {
//   intervalId = setInterval(countDownTimeToNY, 1000);
//   refs.stopBtn.disabled = false;
//   refs.startBtn.disabled = true;
//   console.log(intervalId);
// }

// function addZero(number) {
//   return String(number).padStart(2, 0);
// }

//! === One button option ===
const BUTTON_UI = {
  activeBtn: 'stop',
  start: {
    text: 'Start',
    class: 'start',
  },
  stop: {
    text: 'Stop',
    class: 'stop',
  },
};

const refs = {
  timer: document.getElementById('timer'),
  btn: document.getElementById('btn'),
};

const countDownDate = new Date(`Jan 1 ${new Date().getFullYear() + 1}`);

refs.btn.addEventListener('click', handleButtonClick);

countDownTimeToNY();
let intervalId = setInterval(countDownTimeToNY, 1000);

function countDownTimeToNY() {
  const now = new Date().getTime();
  const diff = countDownDate - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  refs.timer.textContent = `${days} days ${addZero(hours)} hours ${addZero(
    minutes,
  )} minutes ${addZero(seconds)} seconds`;
}

function stopTimer() {
  clearInterval(intervalId);
}

function startTimer() {
  intervalId = setInterval(countDownTimeToNY, 1000);
}

function addZero(number) {
  return String(number).padStart(2, 0);
}

function handleButtonClick() {
  const {
    activeBtn,
    stop: { class: stopClass, text: stopText },
    start: { class: startClass, text: startText },
  } = BUTTON_UI;

  if (activeBtn === stopClass) {
    stopTimer();
    BUTTON_UI.activeBtn = startClass;
    refs.btn.textContent = startText;
    refs.btn.classList.add(startClass);
    refs.btn.classList.remove(stopClass);
  } else {
    startTimer();
    BUTTON_UI.activeBtn = stopClass;
    refs.btn.textContent = stopText;
    refs.btn.classList.add(stopClass);
    refs.btn.classList.remove(startClass);
  }
}
