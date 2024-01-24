const startBtn = document.getElementById("start");
const stopBtn = document.getElementById("stop");
const resetBtn = document.getElementById("reset");
const lapBtn = document.getElementById("lap");

const lap = document.querySelector(".lap");
const tapTotal = document.querySelector(".lapTotal");
const total = document.querySelector(".total");


var timeInMs = 0;
var lapTimes = [];
var timer;
var lapStartTime;

startBtn.addEventListener('click', startBtnHandler);
stopBtn.addEventListener('click', stopBtnHandler);
resetBtn.addEventListener('click', resetBtnHandler);
lapBtn.addEventListener('click', lapBtnHandler);

/*******************************************************************
//  resetTimer function will reset the value of timerInMs to 0.
//  ********************************************************************/

function resetBtnHandler(e) {
    clearInterval(timer);
    timeInMs = 0;
    lapTimes = [];
    updateTime(timeInMs);
    startBtn.disabled = false;
    stopBtn.disabled = false;

    lapStartTime = new Date().getTime();

    const lapList = document.querySelector(".lapList");
    lapList.innerHTML = "";
}


/*******************************************************************
//  LapTimer function will lap the timer.
//  ********************************************************************/

function lapBtnHandler(e) {
    const lapList = document.querySelector(".lapList");

    // Update content of existing divs with class "lap", "lapTotal", and "total"
    lap.innerHTML = "Lap";
    tapTotal.innerHTML = "Lap Time";
    total.innerHTML = "Total Time";

    const currentTime = new Date().getTime();
    const lapElapsedTime = currentTime - lapStartTime;
    lapStartTime = currentTime;

    const lapObj = {
        lapNumber: lapTimes.length + 1,
        lapTime: lapTimes.length === 0 ? timeInMs : lapElapsedTime,
        totalTime: timeInMs
    };

    lapTimes.push(lapObj);

    // Extract minutes, seconds, and milliseconds from lap time and total time
    const lapMinutes = Math.floor(lapObj.lapTime / 60000);
    const lapSeconds = Math.floor((lapObj.lapTime % 60000) / 1000);
    const lapMilliseconds = Math.floor((lapObj.lapTime % 1000) / 10);

    const totalMinutes = Math.floor(lapObj.totalTime / 60000);
    const totalSeconds = Math.floor((lapObj.totalTime % 60000) / 1000);
    const totalMilliseconds = Math.floor((lapObj.totalTime % 1000) / 10);

    // Display lap data
    const lapItem = document.createElement("li");

    // Add csss to lapItem
    lapItem.classList.add("lapItem");

    lapItem.innerHTML = `<hr><div class="lapItemChild"><strong class="t">${lapObj.lapNumber}</strong>
     <span class="lt">${formatTimeSegment(lapMinutes)}:${formatTimeSegment(lapSeconds)}:${formatTimeSegment(lapMilliseconds)}</span> 
     <span class="t">${formatTimeSegment(totalMinutes)}:${formatTimeSegment(totalSeconds)}:${formatTimeSegment(totalMilliseconds)}</span></div>
     `;

    // Append lapItem to lapList
    lapList.appendChild(lapItem);

    updateTime(timeInMs);
}

function formatTimeSegment(segment) {
    return segment < 10 ? "0" + segment : segment;
}

function formatTime(time) {
    const sec = Math.floor(time / 1000);
    const min = Math.floor(time / 60000);
    const hour = Math.floor(time / 3600000)
    const milSec = Math.floor(time % 1000) / 10;

    return `${hour < 10 ? "0" + hour : hour}:${min % 60 < 10 ? "0" + min % 60 : min % 60}:${sec % 60 < 10 ? "0" + sec % 60 : sec % 60}.${milSec < 10 ? "0" + milSec : milSec}`;
}


/*******************************************************************
//  pauseTimer function will stop the timer using clearInterval method.
//  ********************************************************************/

function stopBtnHandler(e) {
    clearInterval(timer);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

/*******************************************************************
//  startTimer function will increase the timer value by 10 every times.
//  ********************************************************************/

function startBtnHandler(e) {
    timer = setInterval(() => {
        timeInMs += 10;
        updateTime(timeInMs);
    }, 10);
    startBtn.disabled = true;
    stopBtn.disabled = false;

}

/*******************************************************************
//  updateTimer function will update DOM.
//  ********************************************************************/

function updateTime(time) {
    const minTimer = document.getElementById("min");
    const secTimer = document.getElementById("sec");
    const milSecTimer = document.getElementById("ms");
    const hourTimer = document.getElementById("hour");

    hourTimer.innerText = formatTime(time).split(":")[0] + ":";
    minTimer.innerText = formatTime(time).split(":")[1];
    secTimer.innerText = formatTime(time).split(":")[2].split(".")[0];
    milSecTimer.innerText = formatTime(time).split(":")[2].split(".")[1];
}

