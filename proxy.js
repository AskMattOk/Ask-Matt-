
const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/ask-ai", async (req, res) => {
  const { question } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `
You are a helpful and knowledgeable insurance agency assistant.

ONLY answer questions about:
- Insurance processes
- Policy changes in Policy Center
- Documentation in Apex
- Task mirroring in Agency Zoom

✅ If someone asks how to:
- Change a deductible
- Bind a policy
- Upload a note in Apex
- Mirror tasks in Agency Zoom

...you should answer with specific steps.

🚫 If a user asks anything unrelated (e.g., movies, weather), respond politely:
"I'm here to help with insurance-related questions. Try asking me about Policy Center, Apex, or Agency Zoom!"

Respond in a clear, step-by-step, and supportive tone — like a smart coworker.`
        },
        {
          role: "user",
          content: question
        }
      ]
    })
  });

  const data = await response.json();
  res.json(data);
});

app.listen(10000, () => {
  console.log("Ask Matt backend is running on port 10000");
});
