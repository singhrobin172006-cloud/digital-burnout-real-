const ids = ["sleep","study","screen","stress","mood"];

ids.forEach(id=>{
    const el = document.getElementById(id);
    const val = document.getElementById(id+"Val");
    el.oninput = () => val.innerText = el.value;
});

let lineChart, donutChart, meterChart;

/* ===================== FIXED ANALYZE FUNCTION ===================== */
function analyze() {

    const sleep = +sleepVal.innerText;
    const study = +studyVal.innerText;
    const screen = +screenVal.innerText;
    const stress = +stressVal.innerText;
    const mood = +moodVal.innerText;

    let score = (
        (sleep/24)*30 +
        (study/24)*20 +
        (mood/10)*30 -
        (stress/10)*20 -
        (screen/24)*20
    );

    score = Math.round(Math.max(0, Math.min(100, score)));

    document.getElementById("score").innerText = "Score: " + score + "/100";

    const riskEl = document.getElementById("risk");
    const insight = document.getElementById("insight");
    const rec = document.getElementById("recommendation");

    riskEl.classList.remove("low","moderate","high");

    let burnoutLevel = "";

    if(score < 40){
        burnoutLevel = "High";
        riskEl.innerText = "⚡ High Burnout Risk";
        riskEl.classList.add("high");
        insight.innerText = "Critical burnout risk. Reduce screen time & improve sleep.";
    }
    else if(score < 70){
        burnoutLevel = "Moderate";
        riskEl.innerText = "⚡ Moderate Burnout Risk";
        riskEl.classList.add("moderate");
        insight.innerText = "Stable but inconsistent. Improve balance.";
    }
    else{
        burnoutLevel = "Low";
        riskEl.innerText = "⚡ Low Burnout Risk";
        riskEl.classList.add("low");
        insight.innerText = "Excellent performance. Maintain routine.";
    }

    let tips = [];

    if(sleep < 6) tips.push("Increase sleep");
    if(screen > 8) tips.push("Reduce screen time");
    if(stress > 6) tips.push("Manage stress");
    if(mood < 5) tips.push("Relax activities");

    rec.innerText = tips.length 
        ? "AI Recommendation: " + tips.join(" | ") 
        : "AI Recommendation: Routine optimal";

    updateCharts(score);

    localStorage.setItem("score", score);
    localStorage.setItem("burnout", burnoutLevel);

    saveData("dashboard", { score, sleep, study, screen, stress, mood });
}
/* ===================== END FIX ===================== */

function resetAll(){
    location.reload();
}

/* CHARTS */
function updateCharts(score){

    const data = Array.from({length:7}, (_,i)=> Math.max(0, score - i*2));

    if(lineChart) lineChart.destroy();
    lineChart = new Chart(document.getElementById("lineChart"), {
        type:"line",
        data:{
            labels:["D1","D2","D3","D4","D5","D6","D7"],
            datasets:[{
                label:"Score Trend",
                data:data,
                borderColor:"#00f0ff",
                fill:true,
                backgroundColor:"rgba(0,255,255,0.2)",
                tension:0.4,
                pointRadius:4,
                pointBackgroundColor:"#00f0ff"
            }]
        },
        options:{
            responsive:true,
            maintainAspectRatio:false,
            animation:{
                duration:1500,
                easing:"easeInOutQuart"
            },
            plugins:{
                legend:{labels:{color:"#fff"}}
            },
            scales:{
                x:{
                    ticks:{color:"#ccc"},
                    grid:{color:"rgba(255,255,255,0.08)"}
                },
                y:{
                    ticks:{color:"#ccc"},
                    grid:{color:"rgba(255,255,255,0.08)"}
                }
            }
        }
    });

    if(donutChart) donutChart.destroy();
    donutChart = new Chart(document.getElementById("donutChart"), {
        type:"doughnut",
        data:{
            datasets:[{
                data:[100-score, score],
                backgroundColor:["#111","#00f0ff"],
                borderWidth:2
            }]
        },
        options:{
            responsive:true,
            maintainAspectRatio:false,
            animation:{duration:1200}
        }
    });

    if(meterChart) meterChart.destroy();
    meterChart = new Chart(document.getElementById("meterChart"), {
        type:"doughnut",
        data:{
            datasets:[{
                data:[100-score, score],
                backgroundColor:["#111","#00ff88"],
                borderWidth:2
            }]
        },
        options:{
            responsive:true,
            maintainAspectRatio:false,
            animation:{duration:1200}
        }
    });
}

updateCharts(50);

function goRecovery(){
    let scoreText = document.getElementById("score").innerText;

    let score = scoreText.replace("Score:", "")
                         .replace("/100","")
                         .trim();

    localStorage.setItem("score", score);

    window.location.href = "recovery.html";
}

/* BACKEND FUNCTION */
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