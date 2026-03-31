// Welcome user
document.getElementById("welcomeUser").innerText = "Welcome, " + localStorage.getItem("username") + " 👋";

// Map
let map = L.map('map').setView([28.61, 77.23], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

let routeLine;
function resetMap() {
  if (routeLine) map.removeLayer(routeLine);
}

// Stopwatch
let stopwatchInterval, elapsedSeconds = 0;
function startStopwatch() {
  if (stopwatchInterval) return;
  stopwatchInterval = setInterval(() => {
    elapsedSeconds++;
    let hrs = String(Math.floor(elapsedSeconds / 3600)).padStart(2,'0');
    let mins = String(Math.floor((elapsedSeconds % 3600) / 60)).padStart(2,'0');
    let secs = String(elapsedSeconds % 60).padStart(2,'0');
    document.getElementById("stopwatch").innerText = `${hrs}:${mins}:${secs}`;
  }, 1000);
}
function pauseStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}
function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  elapsedSeconds = 0;
  document.getElementById("stopwatch").innerText = "00:00:00";
}

// Calories Counter
let calories = 0;
function addCalories(cals) {
  calories += cals;
  document.getElementById("calories").innerText = calories;
  if (calories % 50 === 0) alert("💧 Drink water! You've burned " + calories + " kcal");
}

// Weather (mock)
document.getElementById("weather").innerText = "☀️ Sunny, 32°C";

// Chatbot
function sendMessage() {
  let input = document.getElementById("chatInput").value.trim();
  if (!input) return;
  
  let chatBody = document.getElementById("chatBody");
  chatBody.innerHTML += `<div><b>You:</b> ${input}</div>`;

  let reply = getBotReply(input);
  chatBody.innerHTML += `<div style="color:blue"><b>Bot:</b> ${reply}</div>`;
  document.getElementById("chatInput").value = "";
  chatBody.scrollTop = chatBody.scrollHeight;
}

function getBotReply(msg) {
  msg = msg.toLowerCase();
  if (msg.includes("hello")) return "Hello! Ready for your fitness journey?";
  if (msg.includes("weather")) return "Today looks sunny with 32°C 🌞";
  if (msg.includes("calories")) return `You’ve burned ${calories} kcal so far!`;
  if (msg.includes("tip")) return "Stay hydrated and take short breaks after every 50 kcal burn 🚰";
  if (msg.includes("time")) return `Your stopwatch is at ${document.getElementById("stopwatch").innerText}`;
  return "I’m still learning 🤖. Ask me about weather, calories, or tips!";
}
