const video = document.getElementById("video");

const burnoutText = document.getElementById("burnout");
const focusText = document.getElementById("focus");
const stateText = document.getElementById("state");
const screenText = document.getElementById("screen");
const fatigueText = document.getElementById("fatigue");
const stabilityText = document.getElementById("stability");
const solutionText = document.getElementById("solution");

/* START CAMERA */
async function startCamera() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        runAI();
    } catch {
        document.getElementById("status").innerText = "Camera blocked ❌";
    }
}

/* 🔥 SMART DYNAMIC ANALYSIS */
function runAI(){

    setInterval(() => {

        /* simulate real facial signals */
        let eye = Math.random();       // eye fatigue
        let motion = Math.random();    // head movement
        let blink = Math.random();     // blink rate

        let score = (eye + motion + blink) / 3;

        let burnout, focus, state, screen, fatigue, stability, solution;

        /* 🔥 DYNAMIC CHANGING STATES */
        if(score < 0.3){
            burnout = "Low ✅";
            focus = 90;
            state = "Highly Focused";
            screen = "1-2 hrs";
            fatigue = 15;
            stability = "Very High";
            solution = "You are performing at peak. Maintain flow and hydration.";
        }
        else if(score < 0.6){
            burnout = "Moderate ⚡";
            focus = 65;
            state = "Mild Fatigue";
            screen = "3-5 hrs";
            fatigue = 45;
            stability = "Medium";
            solution = "Take a 5-10 min break, reduce screen brightness, and stretch.";
        }
        else if(score < 0.8){
            burnout = "High ⚠️";
            focus = 45;
            saveData("face", {
  burnout: "High",
  focus: 45
});
            state = "Cognitive Overload";
            screen = "6-8 hrs";
            fatigue = 70;
            stability = "Low";
            solution = "Use Pomodoro (25-5), drink water, and avoid multitasking.";
        }
        else{
            burnout = "Critical 🚨";
            focus = 25;
            state = "Severe Mental Fatigue";
            screen = "8+ hrs";
            fatigue = 90;
            stability = "Very Low";
            solution = "Stop work immediately. Sleep, avoid screens, and reset your brain.";
        }

        /* UPDATE UI */
        burnoutText.innerText = "Burnout: " + burnout;
        focusText.innerText = "Focus Score: " + focus + "/100";
        stateText.innerText = "State: " + state;
        screenText.innerText = "Estimated Screen Time: " + screen;
        fatigueText.innerText = "Fatigue Index: " + fatigue + "/100";
        stabilityText.innerText = "Attention Stability: " + stability;
        solutionText.innerText = "Recommendation: " + solution;

    }, 2000); // updates every 2 sec
}

startCamera();
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