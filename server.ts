import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

let aiClient: GoogleGenAI | null = null;

function getAI() {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY environment variable is required");
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health Check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API Routes
  
  // 1. Analyze Profile (Bronze)
  app.post("/api/analyze-profile", async (req, res) => {
    try {
      const { background } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Analyze the following career background and identify hidden hard and soft skills. return a JSON object with 'hardSkills' (array of strings) and 'softSkills' (array of strings). \n\nBackground: ${background}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              hardSkills: { type: Type.ARRAY, items: { type: Type.STRING } },
              softSkills: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["hardSkills", "softSkills"]
          }
        }
      });
      res.json(JSON.parse(response.text));
    } catch (error) {
      console.error("Analyze Profile Error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to analyze profile" });
    }
  });

  // 2. Generate Assessment (Bronze)
  app.post("/api/generate-assessment", async (req, res) => {
    try {
      const { skill } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are an expert recruiter. Generate 5 multiple-choice questions to test proficiency in '${skill}'. Return a JSON array of objects, each with 'question' (string), 'options' (array of strings), and 'correctIndex' (number, 0-3).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                question: { type: Type.STRING },
                options: { type: Type.ARRAY, items: { type: Type.STRING } },
                correctIndex: { type: Type.NUMBER }
              },
              required: ["question", "options", "correctIndex"]
            }
          }
        }
      });
      res.json(JSON.parse(response.text));
    } catch (error) {
      console.error("Generate Assessment Error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to generate assessment" });
    }
  });

  // 3. Deconstruct Job (Silver)
  app.post("/api/deconstruct-job", async (req, res) => {
    try {
      const { jd } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Extract required skills from this job description. Categorize them into 'mustHave' and 'niceToHave'. \n\nJD: ${jd}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              mustHave: { type: Type.ARRAY, items: { type: Type.STRING } },
              niceToHave: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["mustHave", "niceToHave"]
          }
        }
      });
      res.json(JSON.parse(response.text));
    } catch (error) {
      console.error("Deconstruct Job Error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to deconstruct job" });
    }
  });

  // 4. Tailor Resume (Gold)
  app.post("/api/tailor-resume", async (req, res) => {
    try {
      const { profile, jd } = req.body;
      const ai = getAI();
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `You are an expert ATS optimizer. Tailor the following profile to the job description provided. Rewrite bullet points to highlight matching keywords without lying. Return a JSON object with 'tailoredBio' (string) and 'tailoredExperience' (array of objects with 'title', 'company', 'bullets'). \n\nProfile: ${JSON.stringify(profile)} \n\nJD: ${jd}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              tailoredBio: { type: Type.STRING },
              tailoredExperience: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    company: { type: Type.STRING },
                    bullets: { type: Type.ARRAY, items: { type: Type.STRING } }
                  },
                  required: ["title", "company", "bullets"]
                }
              }
            },
            required: ["tailoredBio", "tailoredExperience"]
          }
        }
      });
      res.json(JSON.parse(response.text));
    } catch (error) {
      console.error("Tailor Resume Error:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Failed to tailor resume" });
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
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Failed to start server:", err);
});
