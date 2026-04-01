let currentTime = 25 * 60;
let timer = null;
let sessions = 0;

function updateTimer() {
    let min = Math.floor(currentTime / 60);
    let sec = currentTime % 60;

    document.getElementById("timer").innerText =
        `${min}:${sec < 10 ? "0" : ""}${sec}`;
}

function startTimer() {
    if (timer) return;

    timer = setInterval(() => {
        currentTime--;

        if (currentTime <= 0) {
            clearInterval(timer);
            timer = null;

            saveData("focus", {
  session: 25,
  completed: true
});
            document.getElementById("sessions").innerText = sessions;

            alert("Session Complete!");
            currentTime = 25 * 60;
        }

        updateTimer();
    }, 1000);
}

function pauseTimer() {
    clearInterval(timer);
    timer = null;
}

function resetTimer() {
    clearInterval(timer);
    timer = null;
    currentTime = 25 * 60;
    updateTimer();
}

updateTimer();
function saveData(page, payload) {
  fetch("http://127.0.0.1:5000/save", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      page: page,
      payload: payload
    })
  });
}
function goHistory() {
  window.location.href = "history.html";
}