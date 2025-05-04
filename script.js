// ==== TAB SWITCHING ====
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Rimuove classi attive
    tabButtons.forEach(btn => btn.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));

    // Aggiunge classi attive alla selezione
    button.classList.add('active');
    document.getElementById(button.dataset.tab).classList.add('active');
  });
});

// ==== OROLOGIO ====
function updateClock() {
  const now = new Date();
  const timeString = now.toLocaleTimeString('it-IT', { hour12: false });
  document.getElementById('current-time').textContent = timeString;
}
setInterval(updateClock, 1000);
updateClock();

// ==== CRONOMETRO ====
let stopwatchInterval;
let stopwatchStartTime;
let stopwatchElapsed = 0;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const milliseconds = String(ms % 1000).padStart(3, '0').slice(0, 2);
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

function updateStopwatch() {
  const now = Date.now();
  const elapsed = now - stopwatchStartTime + stopwatchElapsed;
  document.getElementById('stopwatch-display').textContent = formatTime(elapsed);
}

document.getElementById('start-stopwatch').addEventListener('click', () => {
  if (!stopwatchInterval) {
    stopwatchStartTime = Date.now();
    stopwatchInterval = setInterval(updateStopwatch, 30);
  }
});

document.getElementById('stop-stopwatch').addEventListener('click', () => {
  if (stopwatchInterval) {
    stopwatchElapsed += Date.now() - stopwatchStartTime;
    clearInterval(stopwatchInterval);
    stopwatchInterval = null;
  }
});

document.getElementById('reset-stopwatch').addEventListener('click', () => {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  stopwatchElapsed = 0;
  document.getElementById('stopwatch-display').textContent = '00:00:00.00';
});

// ==== TIMER ====
let timerInterval;
let timerRemaining = 0;

function formatTimer(ms) {
  const minutes = String(Math.floor(ms / 60000)).padStart(2, '0');
  const seconds = String(Math.floor((ms % 60000) / 1000)).padStart(2, '0');
  return `${minutes}:${seconds}`;
}

function updateTimer() {
  if (timerRemaining <= 0) {
    clearInterval(timerInterval);
    timerInterval = null;
    document.getElementById('timer-display').textContent = '00:00';
    alert("⏰ Timer concluso!");
    return;
  }
  timerRemaining -= 1000;
  document.getElementById('timer-display').textContent = formatTimer(timerRemaining);
}

document.getElementById('start-timer').addEventListener('click', () => {
  if (!timerInterval) {
    const minutes = parseInt(document.getElementById('timer-minutes').value) || 0;
    const seconds = parseInt(document.getElementById('timer-seconds').value) || 0;
    timerRemaining = (minutes * 60 + seconds) * 1000;
    if (timerRemaining <= 0) return;
    document.getElementById('timer-display').textContent = formatTimer(timerRemaining);
    timerInterval = setInterval(updateTimer, 1000);
  }
});

document.getElementById('stop-timer').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

document.getElementById('reset-timer').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  timerRemaining = 0;
  document.getElementById('timer-display').textContent = '00:00';
  document.getElementById('timer-minutes').value = '';
  document.getElementById('timer-seconds').value = '';
});