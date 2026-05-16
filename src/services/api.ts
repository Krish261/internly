export const api = {
  analyzeProfile: async (background: string) => {
    const res = await fetch("/api/analyze-profile", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ background }),
    });
    if (!res.ok) throw new Error("Failed to analyze profile");
    return res.json();
  },
  generateAssessment: async (skill: string) => {
    const res = await fetch("/api/generate-assessment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ skill }),
    });
    if (!res.ok) throw new Error("Failed to generate assessment");
    return res.json();
  },
  analyzeJob: async (jd: string) => {
    const res = await fetch("/api/analyze-job", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jd }),
    });
    if (!res.ok) throw new Error("Failed to analyze job");
    return res.json();
  },
  tailorResume: async (profile: any, jd: string) => {
    const res = await fetch("/api/tailor-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ profile, jd }),
    });
    if (!res.ok) throw new Error("Failed to tailor resume");
    return res.json();
  },
  generateCoverLetter: async (userProfile: any, jobDetails: any, tone: string, length: number) => {
    const res = await fetch("/api/generate-cover-letter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userProfile, jobDetails, tone, length }),
    });
    if (!res.ok) throw new Error("Failed to generate cover letter");
    return res.json();
  },
  generateRoadmap: async (currentSkills: string[], targetRole: string) => {
    const res = await fetch("/api/generate-roadmap", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ currentSkills, targetRole }),
    });
    if (!res.ok) throw new Error("Failed to generate roadmap");
    return res.json();
  },
  interviewChat: async (messages: any[], userProfile: any, targetRole: string) => {
    const res = await fetch("/api/interview-chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, userProfile, targetRole }),
    });
    if (!res.ok) throw new Error("Failed to handle interview chat");
    return res.json();
  },
};
