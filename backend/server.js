// backend/server.js
// Simple Express backend to relay chat requests to OpenAI API securely

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
const PORT = 3001;

// Replace with your OpenAI API key
const OPENAI_API_KEY =
  "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";

app.use(cors());
app.use(bodyParser.json());

app.post("/api/chat", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: "No message provided" });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
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
      }),
    });
    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message) {
      res.json({ reply: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: "No response from OpenAI" });
    }
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
