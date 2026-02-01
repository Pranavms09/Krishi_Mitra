# Setup Instructions for Krishi Mitra AI Chatbot

## ⚠️ PowerShell Permission Issue Detected

Your system has PowerShell script execution restrictions. Here are **two ways** to fix this:

---

## Option 1: Enable PowerShell Scripts (Recommended)

Run PowerShell as **Administrator** and execute:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Then run this in your normal PowerShell:
```bash
cd "c:\Users\prana\OneDrive\web\WEB DEVLOPMENT\Krishi_Mitra"
npm install
npm start
```

---

## Option 2: Use Command Prompt Instead

1. Open **Command Prompt** (cmd.exe) - not PowerShell
2. Run these commands:
```cmd
cd "c:\Users\prana\OneDrive\web\WEB DEVLOPMENT\Krishi_Mitra"
npm install
npm start
```

---

## After Server Starts:

1. Open browser and go to: `http://localhost:3001/index.html`
2. Click on "🤖 AI Voice Assistant" in the menu
3. Type a message like "hi" or "how can I improve my farming?"
4. The AI should respond! 🎉

---

## What Was Fixed:

### The Problem:
- Your chatbot was calling Gemini API directly from the browser
- Browsers block this due to CORS (Cross-Origin Resource Sharing) security
- The API key was also exposed in client-side code (security risk)

### The Solution:
✅ Created `server.js` - Backend server that:
  - Proxies requests to Gemini API
  - Keeps API key secure on the server
  - Fixes CORS issues
  - Serves your files properly

✅ Updated `techno.js` - Now calls `localhost:3001` instead of Google directly

✅ Added `package.json` - Node.js dependencies configuration

---

## Troubleshooting:

**"Cannot find module 'express'" error:**
- You need to run `npm install` first

**Port 3001 already in use:**
- Edit `server.js`, change line 4 from `PORT = 3001` to `PORT = 3002`
- Then access `http://localhost:3002/index.html`

**Still not working:**
- Check the browser console (F12) for errors
- Check the terminal where you ran `npm start` for error messages
- Make sure you're accessing via `http://localhost:3001/` NOT opening the file directly

---

Good luck! 🚜🌾
