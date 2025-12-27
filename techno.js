// ------- Chatbot Logic for AI Assistant Section ---------
const chatbotForm = document.getElementById("chatbotForm");
const chatbotInput = document.getElementById("chatbotInput");
const chatbotMessages = document.getElementById("chatbotMessages");

async function sendMessageToLLM(message) {
  // OpenAI API endpoint for chat (GPT-3.5/4)
  const endpoint = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${LLM_API_KEY}`,
  };
  const body = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful agricultural assistant for Indian farmers. Answer in simple language. Support Hindi and Marathi if user uses them.",
      },
      { role: "user", content: message },
    ],
    max_tokens: 512,
    temperature: 0.7,
  };
  // Call backend server instead of OpenAI directly
  try {
    const res = await fetch("http://localhost:3001/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });
    if (!res.ok) throw new Error("API error");
    const data = await res.json();
    return data.reply?.trim() || "No response.";
  } catch (err) {
    return "Sorry, I couldn't reach the AI service.";
  }
}

function appendChatMessage(text, sender = "user") {
  const msgDiv = document.createElement("div");
  msgDiv.className = `chatbot-message ${sender}`;
  msgDiv.textContent = text;
  chatbotMessages.appendChild(msgDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

if (chatbotForm && chatbotInput && chatbotMessages) {
  chatbotForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const userMsg = chatbotInput.value.trim();
    if (!userMsg) return;
    appendChatMessage(userMsg, "user");
    chatbotInput.value = "";
    appendChatMessage("...", "bot");
    const botReply = await sendMessageToLLM(userMsg);
    // Remove the loading '...' message
    const loadingMsg = chatbotMessages.querySelector(
      ".chatbot-message.bot:last-child"
    );
    if (loadingMsg && loadingMsg.textContent === "...")
      chatbotMessages.removeChild(loadingMsg);
    appendChatMessage(botReply, "bot");
  });
}
// ------- LLM API Key (DEMO ONLY: Do not expose in production) ---------
const LLM_API_KEY =
  "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";
// ------- Hamburger Menu & Side Menu ---------
const hamburger = document.getElementById("hamburger");
const sideMenu = document.getElementById("sideMenu");
const overlay = document.getElementById("overlay");

function toggleSideMenu() {
  hamburger.classList.toggle("active");
  sideMenu.classList.toggle("active");
  overlay.classList.toggle("active");
}

hamburger.addEventListener("click", toggleSideMenu);
overlay.addEventListener("click", toggleSideMenu);

// ------- Navigation functionality ---------
function showSection(sectionId) {
  // Hide all sections
  document.querySelectorAll(".section").forEach((section) => {
    section.classList.remove("active");
  });

  // Show selected section
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.add("active");
  }

  // Close side menu if open
  if (sideMenu.classList.contains("active")) {
    toggleSideMenu();
  }

  // Scroll to top
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Add click handlers to main navigation links
document.querySelectorAll(".main-nav a").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = item.getAttribute("data-section");
    showSection(sectionId);
  });
});

// Add click handler to brand name
document.querySelector(".brand").addEventListener("click", (e) => {
  e.preventDefault();
  showSection("home");
});

// Add click handlers to side menu items
document.querySelectorAll(".side-menu-item").forEach((item) => {
  item.addEventListener("click", (e) => {
    e.preventDefault();
    const sectionId = item.getAttribute("data-section");
    showSection(sectionId);
  });
});

// Add click handler to CTA button
document.querySelector(".cta-button").addEventListener("click", (e) => {
  e.preventDefault();
  const sectionId = document
    .querySelector(".cta-button")
    .getAttribute("data-section");
  showSection(sectionId);
});

// ------- Dummy data for UI ---------
const crops = [
  "Wheat",
  "Soybean",
  "Cotton",
  "Tur (Arhar)",
  "Sugarcane",
];
const markets = ["Pune", "Nagpur", "Nashik", "Kolhapur"];

// Simple fake prices: crop + market map
const prices = [
  { crop: "Soybean", market: "Pune", mandi: 2450, buyer: 2520 },
  { crop: "Soybean", market: "Nagpur", mandi: 2380, buyer: 2480 },
  { crop: "Soybean", market: "Nashik", mandi: 2380, buyer: 2480 },
  { crop: "Soybean", market: "Kolhapur", mandi: 2380, buyer: 2480 },


  { crop: "Cotton", market: "Pune", mandi: 6850, buyer: 7020 },
  { crop: "Cotton", market: "Nagpur", mandi: 6720, buyer: 6900 },
  { crop: "Cotton", market: "Nashik", mandi: 6720, buyer: 6900 },
  { crop: "Cotton", market: "Kolhapur", mandi: 6720, buyer: 6900 },

  { crop: "Wheat", market: "Pune", mandi: 2100, buyer: 2180 },
  { crop: "Wheat", market: "Nagpur", mandi: 2050, buyer: 2140 },
  { crop: "Wheat", market: "Nashik", mandi: 2050, buyer: 2140 },
  { crop: "Wheat", market: "Kolhapur", mandi: 2050, buyer: 2140 },

  { crop: "Tur (Arhar)", market: "Pune", mandi: 9200, buyer: 9400 },
  { crop: "Tur (Arhar)", market: "Nagpur", mandi: 9200, buyer: 9400 },
  { crop: "Tur (Arhar)", market: "Nashik", mandi: 9200, buyer: 9400 },
  { crop: "Tur (Arhar)", market: "Kolhapur", mandi: 9200, buyer: 9400 },

  { crop: "Sugarcane", market: "Pune", mandi: 3100, buyer: 3200 },
  { crop: "Sugarcane", market: "Nagpur", mandi: 3100, buyer: 3200 },
  { crop: "Sugarcane", market: "Nashik", mandi: 3100, buyer: 3200 },
  { crop: "Sugarcane", market: "Kolhapur", mandi: 3100, buyer: 3200 },
];


// ------- Helper to fill <select> options --------
function fillSelectOptions(selectId, items) {
  const sel = document.getElementById(selectId);
  sel.innerHTML = "";
  items.forEach((item) => {
    const opt = document.createElement("option");
    opt.value = item;
    opt.textContent = item;
    sel.appendChild(opt);
  });
}

// ------- Render prices ----------
function renderPrices() {
  const crop = document.getElementById("cropSelect").value;
  const market = document.getElementById("marketSelect").value;
  const container = document.getElementById("priceList");
  container.innerHTML = "";

  const headerRow = document.createElement("div");
  headerRow.className = "price-row header";
  headerRow.innerHTML =
    "<span>Crop / Market</span><span>Mandi (₹)</span><span>Buyer (₹)</span>";
  container.appendChild(headerRow);

  const filtered = prices.filter(
    (p) =>
      (crop ? p.crop === crop : true) && (market ? p.market === market : true)
  );

  if (filtered.length === 0) {
    const row = document.createElement("div");
    row.className = "price-row";
    row.innerHTML = "<span>No data</span><span>-</span><span>-</span>";
    container.appendChild(row);
    return;
  }

  filtered.forEach((p) => {
    const row = document.createElement("div");
    row.className = "price-row";
    row.innerHTML =
      `<span>${p.crop} – ${p.market}</span>` +
      `<span>₹${p.mandi}</span>` +
      `<span>₹${p.buyer}</span>`;
    container.appendChild(row);
  });
}

// ------- Save alert (only simulated) ----------
function saveAlert() {
  const crop = document.getElementById("alertCrop").value;
  const type = document.getElementById("alertType").value;
  const price = document.getElementById("alertPrice").value;
  const output = document.getElementById("alertSavedText");

  if (!price) {
    output.textContent = "Please enter target price.";
    output.style.color = "#b91c1c";
    return;
  }

  const typeText = type === "above" ? "goes above" : "goes below";
  output.style.color = "#047857";
  output.textContent = `Alert saved: Notify when ${crop} price ${typeText} ₹${price}/quintal.`;
}

// ------- Profit calculator ----------
function calculateProfit() {
  const crop = document.getElementById("pcCrop").value;
  const qty = parseFloat(document.getElementById("pcQuantity").value || "0");
  const price = parseFloat(document.getElementById("pcPrice").value || "0");
  const box = document.getElementById("pcResult");

  if (!qty || !price) {
    box.style.display = "block";
    box.textContent = "Please enter both quantity and price.";
    return;
  }

  const revenue = qty * price;
  box.style.display = "block";
  box.innerHTML =
    `Estimated income for <b>${crop}</b><br>` +
    `${qty} quintal × ₹${price.toFixed(0)} = <b>₹${revenue.toFixed(0)}</b>`;
}

// ------- Language change (UI demo only) --------
function handleLanguageChange() {
  const lang = document.getElementById("languageSelect").value;
  const weatherLine = document.getElementById("weatherLine");

  // just demo text; real app would use i18n
  if (!weatherLine) return;
  if (lang === "mr") {
    weatherLine.textContent = "पुणे: पुढील २ दिवसांत हलका पाऊस, २९°C / २१°C.";
  } else if (lang === "hi") {
    weatherLine.textContent = "पुणे: अगले 2 दिनों में हल्की बारिश, 29°C / 21°C.";
  } else {
    weatherLine.textContent = "Pune: Light rain expected in 2 days, 29°C / 21°C.";
  }
}

// ------- OpenWeatherMap integration -------
const OPENWEATHER_API_KEY = "b565af6352c29f6a81e9ca21006f66d1";
// Crop price API key (replace with your real key)
const CROP_PRICE_API_KEY = "REPLACE_WITH_YOUR_CROP_PRICE_API_KEY";

// Helper to allow user-provided API key (input id: openWeatherApiKey) with localStorage fallback
function getOpenWeatherApiKey() {
  const input = document.getElementById("openWeatherApiKey");
  if (input && input.value && input.value.trim()) return input.value.trim();
  const stored = localStorage.getItem("openWeatherApiKey");
  if (stored) return stored;
  return OPENWEATHER_API_KEY;
}

function setOpenWeatherApiKey(val) {
  if (!val) return;
  localStorage.setItem("openWeatherApiKey", val);
  const input = document.getElementById("openWeatherApiKey");
  if (input) input.value = val;
}

// If an API key input exists on the page, populate it from localStorage and save on change
const apiKeyInput = document.getElementById("openWeatherApiKey");
if (apiKeyInput) {
  apiKeyInput.value = localStorage.getItem("openWeatherApiKey") || "";
  apiKeyInput.addEventListener("change", (e) => {
    setOpenWeatherApiKey(e.target.value.trim());
  });
}

async function updateWeather(city = "Pune") {
  const tempElem = document.querySelector(".weather-temp");
  const locElem = document.querySelector(".weather-location");
  const statusElem = document.querySelector(".weather-status");

  if (!tempElem || !locElem || !statusElem) return;

  statusElem.textContent = "Loading...";

  try {
    const key = getOpenWeatherApiKey();
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        city
      )}&appid=${key}&units=metric`
    );
    if (!res.ok) throw new Error("weather API error");
    const data = await res.json();

    const t = Math.round(data.main.temp);
    const tmin = Math.round(data.main.temp_min);
    const tmax = Math.round(data.main.temp_max);

    tempElem.textContent = `${tmax}°C / ${tmin}°C`;
    locElem.textContent = `${data.name}${data.sys && data.sys.country ? ", " + data.sys.country : ""}`;
    statusElem.textContent = `${data.weather && data.weather[0] ? data.weather[0].description : ""} • Feels like ${Math.round(
      data.main.feels_like
    )}°C`;
  } catch (err) {
    statusElem.textContent = "Unable to fetch weather.";
  }
}

// ------- Init ----------
fillSelectOptions("cropSelect", crops);
fillSelectOptions("marketSelect", markets);
fillSelectOptions("alertCrop", crops);
fillSelectOptions("pcCrop", crops);

renderPrices();

document.getElementById("cropSelect").addEventListener("change", renderPrices);
document
  .getElementById("marketSelect")
  .addEventListener("change", renderPrices);
document.getElementById("saveAlertBtn").addEventListener("click", saveAlert);
document.getElementById("pcCalcBtn").addEventListener("click", calculateProfit);
document
  .getElementById("languageSelect")
  .addEventListener("change", handleLanguageChange);

// Weather button wiring (if present)
const cityBtn = document.getElementById("cityWeatherBtn");
if (cityBtn) {
  cityBtn.addEventListener("click", async () => {
    const cityInput = document.getElementById("cityWeather");
    const city = cityInput && cityInput.value ? cityInput.value.trim() : "Pune";
    try {
      const API_key = getOpenWeatherApiKey();
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
          city
        )}&appid=${API_key}&units=metric`
      );
      if (!response.ok) throw new Error("weather API error");
      const data = await response.json();

      const temp = data.main && typeof data.main.temp !== "undefined" ? data.main.temp : null;
      const tempElem = document.querySelector(".weather-temp");
      const locElem = document.querySelector(".weather-location");
      const statusElem = document.querySelector(".weather-status");

      if (tempElem) tempElem.textContent = `${temp}°C`;
      if (locElem) locElem.textContent = data.name || city;
      if (statusElem)
        statusElem.textContent =
          data.weather && data.weather[0]
            ? `${data.weather[0].description} • Feels like ${Math.round(
                data.main.feels_like
              )}°C`
            : "";
    } catch (err) {
      const statusElem = document.querySelector(".weather-status");
      if (statusElem) statusElem.textContent = "Unable to fetch weather.";
    }
  });
}

// Trigger search on Enter in the city input field
const cityInputElem = document.getElementById("cityWeather");
if (cityInputElem) {
  cityInputElem.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (cityBtn) cityBtn.click();
    }
  });
}

// Initialize weather with default city
updateWeather("Pune");

// Update weather card date/time every second
function updateWeatherDateTime() {
  const el = document.getElementById("weatherDateTime");
  if (!el) return;
  const now = new Date();
  const dateStr = now.toLocaleDateString();
  const timeStr = now.toLocaleTimeString();
  el.textContent = `${dateStr} • ${timeStr}`;
}
updateWeatherDateTime();
setInterval(updateWeatherDateTime, 1000);



// Add click handler for mobile login button
const mobileLoginBtn = document.querySelector(".mobile-login-btn");
if (mobileLoginBtn) {
  mobileLoginBtn.addEventListener("click", function (e) {
    e.preventDefault();
    showSection("login");
  });
}

// ------- Login handler ----------
document.getElementById("loginBtn").addEventListener("click", () => {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  // Demo login - in real app, this would connect to backend
  alert("Login functionality - connect to your backend API");
});

