let startTime = 0;
let elapsedTime = 0;
let timerInterval;

export function startTimer(timerElement) {
  startTime = Date.now() - elapsedTime;
  timerInterval = setInterval(() => {
    elapsedTime = Date.now() - startTime;
    updateTimer(timerElement);
  }, 10);
}

export function stopTimer() {
  clearInterval(timerInterval);
}

export function resetTimer(timerElement) {
  clearInterval(timerInterval);
  elapsedTime = 0;
  updateTimer(timerElement);
}

export function updateTimer(timerElement) {
    const seconds = Math.floor(elapsedTime / 1000) % 60;
    const minutes = Math.floor(elapsedTime / (1000 * 60));
    const timerString = `${padNumber(minutes)}:${padNumber(seconds)}`;
    timerElement.textContent = timerString;
}

export function padNumber(number) {
  return number.toString().padStart(2, '0');
}

// Example usage: start the stopwatch
startTimer();
