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
  "Soybean",
  "Cotton",
  "Wheat",
  "Tur (Arhar)",
  "Sugarcane",
  "Maize",
  "Barley",
  "Gram",
  "Paddy",
];
const markets = ["Pune", "Nagpur", "Nashik", "Kolhapur"];

// Simple fake prices: crop + market map
const prices = [
  { crop: "Wheat", market: "Pune", mandi: 4700, buyer: 4950 },
  { crop: "Wheat", market: "Nashik", mandi: 4500, buyer: 4800 },
  { crop: "Wheat", market: "Nagpur", mandi: 4550, buyer: 4850 },
  { crop: "Wheat", market: "Kolhapur", mandi: 4600, buyer: 4900 },

  { crop: "Maize", market: "Pune", mandi: 2600, buyer: 2800 },
  { crop: "Maize", market: "Nashik", mandi: 2450, buyer: 2650 },
  { crop: "Maize", market: "Nagpur", mandi: 2500, buyer: 2700 },
  { crop: "Maize", market: "Kolhapur", mandi: 2550, buyer: 2750 },

  { crop: "Jowar", market: "Pune", mandi: 3000, buyer: 3300 },
  { crop: "Jowar", market: "Nashik", mandi: 3100, buyer: 3400 },
  { crop: "Jowar", market: "Nagpur", mandi: 2900, buyer: 3200 },
  { crop: "Jowar", market: "Kolhapur", mandi: 3050, buyer: 3350 },

  { crop: "Bajra", market: "Pune", mandi: 2400, buyer: 2700 },
  { crop: "Bajra", market: "Nashik", mandi: 2600, buyer: 2900 },
  { crop: "Bajra", market: "Nagpur", mandi: 2350, buyer: 2650 },
  { crop: "Bajra", market: "Kolhapur", mandi: 2500, buyer: 2800 },

  { crop: "Barley", market: "Pune", mandi: 1800, buyer: 2000 },
  { crop: "Barley", market: "Nashik", mandi: 1750, buyer: 1950 },
  { crop: "Barley", market: "Nagpur", mandi: 1700, buyer: 1900 },
  { crop: "Barley", market: "Kolhapur", mandi: 1720, buyer: 1920 },

  { crop: "Gram (Chana)", market: "Pune", mandi: 5400, buyer: 5700 },
  { crop: "Gram (Chana)", market: "Nashik", mandi: 5200, buyer: 5500 },
  { crop: "Gram (Chana)", market: "Nagpur", mandi: 5300, buyer: 5600 },
  { crop: "Gram (Chana)", market: "Kolhapur", mandi: 5250, buyer: 5550 },
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
  if (lang === "mr") {
    weatherLine.textContent = "पुणे: पुढील २ दिवसांत हलका पाऊस, २९°C / २१°C.";
  } else if (lang === "hi") {
    weatherLine.textContent =
      "पुणे: अगले 2 दिनों में हल्की बारिश, 29°C / 21°C.";
  } else {
    weatherLine.textContent =
      "Pune: Light rain expected in 2 days, 29°C / 21°C.";
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
