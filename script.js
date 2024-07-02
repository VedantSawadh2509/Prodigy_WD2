let startTime = null;
let elapsedTime = 0;
let timerInterval = null;
let lapTimes = [];

const timeDisplay = document.getElementById('time');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');

function updateTime() {
    const currentTime = new Date().getTime();
    elapsedTime = currentTime - startTime;
    const milliseconds = Math.floor((elapsedTime % 1000) / 10);
    const seconds = Math.floor((elapsedTime / 1000) % 60);
    const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);

    timeDisplay.textContent = `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(milliseconds)}`;
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}

function startTimer() {
    startTime = new Date().getTime();
    timerInterval = setInterval(updateTime, 10);
    startBtn.disabled = true;
    stopBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
}

function stopTimer() {
    clearInterval(timerInterval);
    startBtn.disabled = false;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
}

function resetTimer() {
    clearInterval(timerInterval);
    startTime = null;
    elapsedTime = 0;
    lapTimes = [];
    timeDisplay.textContent = '00:00.000';
    lapList.innerHTML = '';
    startBtn.disabled = false;
    stopBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
}

function recordLap() {
    const currentTime = new Date().getTime();
    const lapTime = currentTime - startTime;
    const milliseconds = Math.floor((lapTime % 1000) / 10);
    const seconds = Math.floor((lapTime / 1000) % 60);
    const minutes = Math.floor((lapTime / (1000 * 60)) % 60);
    const lapTimeString = `${padNumber(minutes)}:${padNumber(seconds)}.${padNumber(milliseconds)}`;
    lapTimes.push(lapTimeString);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapTimes.length}: ${lapTimeString}`;
    lapList.appendChild(lapItem);
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);