require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const supabase = require("./supabase");

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json()); // make sure this is above routes!

const PORT = process.env.PORT || 5000;

// ✅ Gemini AI setup
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Helper function to get model configuration
const getGeminiConfig = () => ({
  model: "gemini-2.0-flash",
  generationConfig: {
    temperature: 0.1, // Lower temperature for more focused responses
    topP: 0.1, // Lower top_p for more deterministic outputs
    maxOutputTokens: 200, // Limit output size for faster responses
  }
});

// ✅ GET /todos
app.get("/todos", async (req, res) => {
  const { data, error } = await supabase.from("todos").select("*");
  if (error) {
    console.error("GET /todos error:", error.message);
    return res.status(500).json({ error: error.message });
  }
  res.json(data);
});

// ✅ POST /todos
app.post("/todos", async (req, res) => {
  try {
    console.log("Received POST /todos body:", req.body);
    const { text } = req.body;
    if (!text || typeof text !== "string") {
      return res.status(400).json({ error: "Missing or invalid 'text' field." });
    }

    const { data, error } = await supabase.from("todos").insert([{ text }]);
    if (error) {
      console.error("Supabase insert error:", error.message);
      return res.status(500).json({ error: error.message });
    }

    res.status(201).json(data);
  } catch (err) {
    console.error("POST /todos server error:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

// ✅ DELETE /todos/:id
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { error } = await supabase.from("todos").delete().eq("id", id);
    if (error) {
      console.error("DELETE error:", error.message);
      return res.status(500).json({ error: error.message });
    }
    res.json({ message: "Deleted successfully" });
  } catch (err) {
    console.error("DELETE /todos/:id server error:", err.message);
    res.status(500).json({ error: "Internal server error." });
  }
});

// ✅ POST /summarize
app.post("/summarize", async (req, res) => {
  try {
    console.log("Starting /summarize endpoint...");
    console.log("Attempting to fetch todos from Supabase...");
    const { data: todos, error } = await supabase.from("todos").select("*");
    if (error) {
      console.error("Supabase fetch error:", error.message);
      console.error("Full error object:", error);
      return res.status(500).json({ error: error.message });
    }
    console.log("Successfully fetched todos:", todos?.length || 0, "items");

    const todoTexts = todos.map(t => t.text).join("\n");
    if (!todoTexts) {
      return res.status(400).json({ error: "No todos to summarize." });
    }

    // Use Gemini with optimized flash settings
    const model = genAI.getGenerativeModel(getGeminiConfig());
    const prompt = `Quick bullet-point summary of these todos (be very concise):\n${todoTexts}`;
    const result = await model.generateContent(prompt);    const summary = result.response.text();
    console.log("Generated summary:", summary);
    
    console.log("Attempting to send to Slack webhook URL:", process.env.SLACK_WEBHOOK_URL);
    try {
      await axios.post(process.env.SLACK_WEBHOOK_URL, {
        text: `📝 Quick Todo Summary:\n${summary}`,
      });
      console.log("Successfully sent to Slack!");
      res.json({ message: "Summary sent to Slack!" });
    } catch (slackError) {
      console.error("Slack webhook error:", {
        status: slackError.response?.status,
        statusText: slackError.response?.statusText,
        data: slackError.response?.data
      });
      throw new Error(`Slack webhook error: ${slackError.message}`);
    }
  } catch (err) {
    console.error("POST /summarize error:", err.message);
    res.status(500).json({ error: "Failed to summarize or send to Slack." });
  }
});

// ✅ Start server
app.listen(PORT, async () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
  
  // Test Supabase connection
  try {
    const { data, error } = await supabase.from('todos').select('count');
    if (error) throw error;
    console.log('✅ Supabase connection successful');
  } catch (err) {
    console.error('❌ Supabase connection error:', err.message);
    console.log('Please check your environment variables:');
    console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? '✓ Set' : '✗ Missing');
    console.log('SUPABASE_KEY:', process.env.SUPABASE_KEY ? '✓ Set' : '✗ Missing');
  }
});
