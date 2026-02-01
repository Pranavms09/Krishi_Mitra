const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3001;

// Your Gemini API key (kept securely on the server)
const GEMINI_API_KEY = "AIzaSyAlaifqLLTdvfkcC14gbcLk8uDG4AHraFU";

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json());
app.use(express.static(__dirname)); // Serve static files from current directory

// Chat endpoint - Using Real Gemini AI
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // Call Gemini API with working model
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;
    
    const requestBody = {
      contents: [{
        parts: [{
          text: `You are Krishi Mitra, an AI farming assistant for Indian farmers. You provide practical, helpful advice on:
- Crop cultivation (wheat, rice, soybean, cotton, vegetables, etc.)
- Soil testing and fertilizer management
- Pest and disease control
- Irrigation and water management
- Weather-based farming tips
- Government schemes and subsidies
- Market prices and selling strategies

IMPORTANT: Always respond in ENGLISH ONLY. Be concise, practical, and use simple language. Provide specific, actionable advice tailored for Indian agriculture.

User question: ${message}`
        }]
      }]
    };

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.candidates && data.candidates[0] && data.candidates[0].content) {
      const reply = data.candidates[0].content.parts[0].text;
      res.json({ reply: reply.trim() });
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Failed to get AI response',
      details: error.message 
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Krishi Mitra server running at http://localhost:${PORT}`);
  console.log(`📱 Open http://localhost:${PORT}/index.html in your browser`);
});
