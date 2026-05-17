import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: "You are the FHS Fashion AI Assistant. You help customers with finding premium men's clothing, size guides, order tracking, and style advice. Keep your tone professional, premium, and helpful.",
        }
      });

      // sendMessage only accepts { message: string }
      const result = await chat.sendMessage({ message });
      res.json({ text: result.text });
    } catch (error) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: "Failed to get AI response" });
    }
  });

  app.post("/api/recommendations", async (req, res) => {
    try {
      const { preferences } = req.body;
      const prompt = `Based on these customer preferences: ${preferences}, suggest 3 types of men's clothing categories or styles from FHS Fashion (Men's Collections, Shirts, T-Shirts, Pants, Shoes, Sunglasses). Return as JSON: { "suggestions": [{ "category": "string", "reason": "string" }] }`;
      
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{ parts: [{ text: prompt }] }],
        config: {
          responseMimeType: "application/json"
        }
      });
      const text = result.text;
      res.json(JSON.parse(text));
    } catch (error) {
      console.error("Recommendation Error:", error);
      res.status(500).json({ error: "Failed to get recommendations" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // In production, serve static files from dist
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    // SPA fallback
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
