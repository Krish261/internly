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
};
