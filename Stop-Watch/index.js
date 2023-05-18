// getting elements from DOM
const timer = document.querySelector("p");
const lapContainer = document.querySelector(".lapContainer");
const myBtns = document.querySelector(".myBtns");
const start = document.getElementById("start");
const lap = document.getElementById("lap");
const pause = document.getElementById("pause");
const reset = document.getElementById("reset");
const resume = document.getElementById("resume");

// creating variable and function to increase time
let timeIncrese;
let miliSecond = 0,
  second = 0,
  minute = 0,
  hour = 0,
  lapId = 1;

// setting variables for lap
let miliSecondPrevious = 0,
  secondPrevious = 0,
  minutePrevious = 0,
  hourPrevious = 0,
  hourDifference = 0,
  minuteDifference = 0,
  secondDifference = 0,
  miliSecondDifference = 0;

function increaseMili() {
  miliSecond += 1;
}

function increaseSecond() {
  if (miliSecond === 100) {
    miliSecond = 0;
    second += 1;
  }
}

function increaseMinute() {
  if (second === 60) {
    second = 0;
    minute += 1;
  }
}

function increaseHour() {
  if (minute === 60) {
    minute = 0;
    hour += 1;
  }
}

// setting the intervals as function
function startInterval() {
  // timeIncrese is decleared above as a veriable
  timeIncrese = setInterval(() => {
    increaseMili();
    increaseSecond();
    increaseMinute();
    increaseHour();
    timer.innerText = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}:${second.toString().padStart(2, "0")}.${miliSecond
      .toString()
      .padStart(2, "0")}`;
  }, 10);
}

function stopInterval() {
  clearInterval(timeIncrese);
}

//functions for when buttons are clicked
function startClicked() {
  start.style.display = "none";
  lap.style.display = "flex";
  pause.style.display = "flex";
}

function pauseClicked() {
  lap.style.display = "none";
  pause.style.display = "none";
  reset.style.display = "flex";
  resume.style.display = "flex";
}

function resumeClicked() {
  reset.style.display = "none";
  resume.style.display = "none";
  lap.style.display = "flex";
  pause.style.display = "flex";
}

function resetClicked() {
  reset.style.display = "none";
  resume.style.display = "none";
  start.style.display = "flex";

  (hour = 0), (minute = 0), (second = 0), (miliSecond = 0);
  (miliSecondPrevious = 0),
    (secondPrevious = 0),
    (minutePrevious = 0),
    (hourPrevious = 0);
  (hourDifference = 0),
    (minuteDifference = 0),
    (secondDifference = 0),
    (miliSecondDifference = 0);
  lapId = 1;

  timer.innerText = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")}`;

  while (lapContainer.firstChild) {
    lapContainer.removeChild(lapContainer.firstChild);
  }
}

function lapClicked() {
  const p1 = document.createElement("p");
  const p2 = document.createElement("p");
  const p3 = document.createElement("p");
  const lapLine = document.createElement("div");

  lapLine.classList.add("lapLine");
  p1.classList.add("lapTime");
  p2.classList.add("lapTime");
  p3.classList.add("lapTime");
  p1.id = "index";
  p2.id = "currentTime";
  p3.id = "incrementTime";

  hourDifference = hour - hourPrevious;
  if (minute < minutePrevious) {
    hourDifference -= 1;
    minuteDifference = minute + 60 - minutePrevious;
  } else {
    minuteDifference = minute - minutePrevious;
  }
  if (second < secondPrevious) {
    minuteDifference -= 1;
    secondDifference = second + 60 - secondPrevious;
  } else {
    secondDifference = second - secondPrevious;
  }
  if (miliSecond < miliSecondPrevious) {
    secondDifference -= 1;
    miliSecondDifference = miliSecond + 100 - miliSecondPrevious;
  } else {
    miliSecondDifference = miliSecond - miliSecondPrevious;
  }

  p1.innerText = `${lapId.toString().padStart(2, "0")}`;
  lapId += 1;
  p2.innerText = `${hour.toString().padStart(2, "0")}:${minute
    .toString()
    .padStart(2, "0")}:${second.toString().padStart(2, "0")}.${miliSecond
    .toString()
    .padStart(2, "0")}`;
  p3.innerText = `+${hourDifference
    .toString()
    .padStart(2, "0")}:${minuteDifference
    .toString()
    .padStart(2, "0")}:${secondDifference
    .toString()
    .padStart(2, "0")}.${miliSecondDifference.toString().padStart(2, "0")}`;

  lapLine.append(p1, p2, p3);
  if (lapContainer.firstChild) {
    lapContainer.insertBefore(lapLine, lapContainer.firstChild);
  } else {
    lapContainer.append(lapLine);
  }

  (miliSecondPrevious = miliSecond),
    (secondPrevious = second),
    (minutePrevious = minute),
    (hourPrevious = hour);
}

// eventlistners on the buttons
start.addEventListener("click", () => {
  startClicked();
  startInterval();
});

pause.addEventListener("click", () => {
  pauseClicked();
  stopInterval();
});

resume.addEventListener("click", () => {
  resumeClicked();
  startInterval();
});

reset.addEventListener("click", () => {
  resetClicked();
});

lap.addEventListener("click", () => {
  lapClicked();
});
