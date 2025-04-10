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
          content:
            "You are a helpful assistant for an insurance agency. Answer only questions related to insurance tasks or processes, specifically those involving Policy Center, Apex, and Agency Zoom. If the user asks something off-topic, politely steer them back to those topics."
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
  console.log("Server running on port 10000");
});
