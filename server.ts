import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Gemini Initialization
let ai: GoogleGenAI | null = null;
function getAI() {
  if (!ai) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is not defined in environment variables");
    }
    ai = new GoogleGenAI({ 
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return ai;
}

app.post("/api/analyze-profile", async (req, res) => {
  try {
    const { background } = req.body;
    const client = getAI();

    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: `
      Analyze the following professional background and extract:
      1. hardSkills (array of strings)
      2. softSkills (array of strings)
      3. trajectory (string)
      4. skillSummary (string).
      
      Background:
      ${background}
      
      Return as valid JSON only.
    ` }] }]
    });

    const text = response.text || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    res.json({
      hardSkills: data.hardSkills || [],
      softSkills: data.softSkills || [],
      trajectory: data.trajectory || "",
      skillSummary: data.skillSummary || data.skillDNA || ""
    });
  } catch (error) {
    console.error("Profile Analysis Error:", error);
    res.status(500).json({ error: "Failed to analyze profile" });
  }
});

app.post("/api/generate-assessment", async (req, res) => {
  try {
    const { skill } = req.body;
    const client = getAI();

    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: `
      Generate a 5-question multiple choice assessment for the skill: ${skill}.
      Each question should have:
      1. question (string)
      2. options (array of 4 strings)
      3. correctIndex (number, 0-3)
      
      Return as a valid JSON array of objects only.
    ` }] }]
    });

    const text = response.text || "[]";
    const jsonMatch = text.match(/\[[\s\S]*\]/);
    const questions = jsonMatch ? JSON.parse(jsonMatch[0]) : [];
    res.json(questions.map((q: any) => ({
      question: q.question || "",
      options: q.options || ["", "", "", ""],
      correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0
    })));
  } catch (error) {
    console.error("Assessment Error:", error);
    res.status(500).json({ error: "Failed to generate assessment" });
  }
});

app.post("/api/tailor-resume", async (req, res) => {
  try {
    const { profile, jd } = req.body;
    const client = getAI();

    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: `
      Tailor the following profile for the given job description.
      Profile: ${JSON.stringify(profile)}
      Job: ${jd}
      
      Return a JSON object with:
      1. tailoredBio (string, a professional summary)
      2. tailoredExperience (array of objects: { title: string, company: string, bullets: string[] })
      
      Generate at least 2 detailed experience entries based on the profile's background.
      Return valid JSON only.
    ` }] }]
    });

    const text = response.text || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    res.json({
      tailoredBio: data.tailoredBio || "",
      tailoredExperience: data.tailoredExperience || []
    });
  } catch (error) {
    console.error("Resume Tailoring Error:", error);
    res.status(500).json({ error: "Failed to tailor resume" });
  }
});

app.post("/api/generate-cover-letter", async (req, res) => {
  try {
    const { userProfile, jobDetails, tone, length } = req.body;
    const client = getAI();

    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: `
      You are Internly AI, a professional career assistant.
      Generate a highly personalized cover letter for the following user and job.
      
      User Profile:
      - Name: ${userProfile.identity.fullName}
      - Email: ${userProfile.identity.email}
      - Hard Skills: ${userProfile.hardSkills.join(", ")}
      - Soft Skills: ${userProfile.softSkills.join(", ")}
      
      Job Details:
      - Title: ${jobDetails.title}
      - Description: ${jobDetails.description}
      
      Requirements:
      - Tone: ${tone}
      - Length: Approximately ${length}% of a standard page.
      
      Format as Markdown.
    ` }] }]
    });

    res.json({ letter: response.text || "" });
  } catch (error) {
    console.error("Cover Letter Error:", error);
    res.status(500).json({ error: "Failed to generate cover letter" });
  }
});

app.post("/api/analyze-job", async (req, res) => {
  try {
    const { jd } = req.body;
    const client = getAI();

    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: `
      Analyze the following job description and break it down into:
      1. mustHave (array of technical skills)
      2. niceToHave (array of bonus skills)
      3. tools (array of platforms/tools)
      4. interviewPrep (array of tips)
      
      Job Description:
      ${jd}
      
      Return as valid JSON only.
    ` }] }]
    });

    const text = response.text || "{}";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const data = jsonMatch ? JSON.parse(jsonMatch[0]) : {};
    res.json({
      mustHave: data.mustHave || [],
      niceToHave: data.niceToHave || [],
      tools: data.tools || [],
      interviewPrep: data.interviewPrep || []
    });
  } catch (error) {
    console.error("Job Analysis Error:", error);
    res.status(500).json({ error: "Failed to analyze job" });
  }
});

app.post("/api/generate-roadmap", async (req, res) => {
  try {
    const { currentSkills, targetRole } = req.body;
    const client = getAI();

    const response = await client.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: [{ parts: [{ text: `
      Create a personalized learning roadmap for a user who wants to become a ${targetRole}.
      Current Skills: ${currentSkills.join(", ")}
      Format as Markdown with structured stages.
    ` }] }]
    });

    res.json({ roadmap: response.text || "" });
  } catch (error) {
    console.error("Roadmap Error:", error);
    res.status(500).json({ error: "Failed to generate roadmap" });
  }
});

app.post("/api/interview-chat", async (req, res) => {
  try {
    const { messages, userProfile, targetRole } = req.body;
    const client = getAI();

    const chat = client.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: `You are an Internly AI Interviewer. Mock interview for: ${targetRole}. User: ${JSON.stringify(userProfile)}. Welcome and ask the first question.`
      }
    });

    const lastMessage = messages[messages.length - 1];
    const response = await chat.sendMessage({ message: lastMessage.content });
    res.json({ response: response.text || "" });
  } catch (error) {
    console.error("Interview Chat Error:", error);
    res.status(500).json({ error: "Failed to handle interview chat" });
  }
});

async function startServer() {
  const appInstance = app;

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    appInstance.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    appInstance.use(express.static(distPath));
    appInstance.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  appInstance.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
