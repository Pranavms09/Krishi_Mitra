// Quick test script to check if your API key works
const API_KEY = "AIzaSyAlaifqLLTdvfkcC14gbcLk8uDG4AHraFU";

async function testGeminiAPI() {
  console.log("Testing Gemini API...\n");
  
  // Test 1: Try to list models
  console.log("Test 1: Listing available models...");
  try {
    const listResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );
    
    if (listResponse.ok) {
      const models = await listResponse.json();
      console.log("✅ API Key is valid!");
      console.log("\nAvailable models:");
      models.models?.forEach(model => {
        console.log(`  - ${model.name}`);
      });
    } else {
      const error = await listResponse.text();
      console.log("❌ Error listing models:");
      console.log(error);
    }
  } catch (err) {
    console.log("❌ Network error:", err.message);
  }

  // Test 2: Try generating content with different models
  console.log("\n\nTest 2: Testing content generation...");
  
  const modelsToTry = [
    "gemini-pro",
    "gemini-1.5-pro",
    "gemini-1.5-flash",
    "gemini-2.0-flash-exp"
  ];

  for (const modelName of modelsToTry) {
    console.log(`\nTrying model: ${modelName}`);
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{
              parts: [{ text: "Say hello in one word" }]
            }]
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
        console.log(`✅ ${modelName} works! Response: ${reply}`);
        console.log(`\n🎉 SUCCESS! Use this model: ${modelName}`);
        return modelName;
      } else {
        const error = await response.text();
        console.log(`❌ ${modelName} failed:`, JSON.parse(error).error.message);
      }
    } catch (err) {
      console.log(`❌ ${modelName} error:`, err.message);
    }
  }
  
  console.log("\n❌ No working model found. Please check:");
  console.log("1. Go to https://aistudio.google.com/app/apikey");
  console.log("2. Make sure 'Generative Language API' is enabled");
  console.log("3. Create a new API key if needed");
}

testGeminiAPI();
