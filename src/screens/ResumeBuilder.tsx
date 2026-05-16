import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { api } from "../services/api";
import { 
  FileText, 
  Loader2, 
  Zap, 
  Download, 
  RefreshCcw, 
  ChevronRight,
  Sparkles,
  Layout
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function ResumeBuilder() {
  const { user, setUser } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"editor" | "preview">("editor");

  const generateResume = async () => {
    if (!user?.jd) return;
    setLoading(true);
    try {
      const profile = {
        background: user.background,
        hardSkills: user.hardSkills,
        softSkills: user.softSkills
      };
      const data = await api.tailorResume(profile, user.jd);
      setUser({
        ...user,
        tailoredResume: data
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resume = user?.tailoredResume;

  return (
    <div className="min-h-screen flex flex-col h-screen overflow-hidden bg-charcoal">
      {/* Top Nav */}
      <nav className="h-16 border-b border-white/5 px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <FileText className="text-neon-accent" size={20} />
          <h1 className="font-mono text-sm tracking-widest uppercase">RESUME_WORKSPACE</h1>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setActiveTab("editor")}
            className={`px-4 py-1 text-[10px] font-mono border-b-2 transition-all ${activeTab === 'editor' ? 'border-neon-accent text-white' : 'border-transparent text-white/40'}`}
          >
            AI_SETTINGS
          </button>
          <button 
             onClick={() => setActiveTab("preview")}
             className={`px-4 py-1 text-[10px] font-mono border-b-2 transition-all ${activeTab === 'preview' ? 'border-neon-accent text-white' : 'border-transparent text-white/40'}`}
          >
            LIVE_PREVIEW
          </button>
        </div>
        <button 
          onClick={generateResume}
          disabled={loading}
          className="flex items-center gap-2 text-neon-accent font-mono text-[10px] uppercase hover:brightness-110 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 className="animate-spin" size={14} /> : <Zap size={14} />}
          {resume ? "Regenerate Content" : "Analyze & Build"}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Settings/Keyword Injector */}
        <div className={`w-full md:w-96 border-r border-white/5 p-8 space-y-12 overflow-y-auto custom-scrollbar ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          <section className="space-y-6">
            <h4 className="label-mono text-neon-accent font-bold tracking-[0.3em]">Requirement_Nodes</h4>
            <div className="flex flex-wrap gap-2">
              {(user?.mustHave || user?.hardSkills || []).slice(0, 8).map(kw => (
                <div key={kw} className="px-3 py-1 bg-neon-accent/5 border border-neon-accent/20 rounded text-[9px] font-mono uppercase text-neon-accent font-black tracking-widest">
                   {kw}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6">
             <h4 className="label-mono text-white/20 font-bold tracking-[0.3em]">Deployment_Console</h4>
             <div className="space-y-3">
                {[
                  { label: "High-impact verbs", val: "ENABLED" },
                  { label: "Metric-driven optimization", val: "ACTIVE" },
                  { label: "ATS keyword density", val: "8.5%" },
                  { label: "Neural tailoring", val: "SYNCED" }
                ].map(stat => (
                  <div key={stat.label} className="p-4 bg-surface-matte/40 border border-white/5 flex justify-between items-center rounded-xl group hover:border-white/20 transition-all">
                    <span className="text-[10px] font-mono text-white/40 uppercase group-hover:text-white/60">{stat.label}</span>
                    <span className="text-[10px] font-mono text-neon-accent font-bold italic tracking-tighter">{stat.val}</span>
                  </div>
                ))}
             </div>
          </section>

          <section className="space-y-4">
             <h4 className="label-mono text-white/20 font-bold tracking-[0.3em]">System_Log</h4>
             <div className="bg-black/40 border border-white/5 p-4 h-48 rounded-xl font-mono text-[9px] overflow-y-auto space-y-2 text-white/30 italic custom-scrollbar">
                <p className="text-neon-accent">[09:21:44] INITIALIZING TAILORING CORE...</p>
                <p>[09:21:45] MAPPING PROFILE TO TARGET JD...</p>
                <p>[09:21:47] EXTRACTING PERFORMANCE VECTORS...</p>
                <p>[09:21:48] OPTIMIZING KEYWORD DENSITY...</p>
                <p className="text-emerald-400">[09:21:50] READY FOR EXCEPTION EXPORT.</p>
             </div>
          </section>
        </div>

        {/* Right Side: Document Canvas */}
        <div className="flex-1 bg-[#232B29] p-4 md:p-12 overflow-y-auto flex justify-center">
          <AnimatePresence mode="wait">
            {!resume ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-6"
              >
                <div className="w-20 h-28 border-2 border-dashed border-white/10 rounded flex items-center justify-center">
                  <Sparkles className="text-white/10" size={32} />
                </div>
                <p className="text-white/20 font-mono text-sm uppercase max-w-xs leading-relaxed">
                  The canvas is empty. Initialize the AI Tailoring Engine to build your 
                  ATS-optimized workspace profile.
                </p>
                <button 
                  onClick={generateResume}
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? "PROCESSING..." : "BUILD RESUME"}
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="doc"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-[850px] bg-white text-[#1a1a1a] shadow-inner p-12 md:p-20 min-h-[1100px] shadow-[0_0_100px_rgba(0,0,0,0.5)] font-serif"
              >
                <header className="mb-12 border-b-4 border-black pb-10">
                  <h1 className="text-5xl font-black uppercase tracking-tight mb-4 font-sans">{user.identity.fullName}</h1>
                  <div className="flex flex-wrap gap-6 text-[10px] font-mono uppercase mb-8 opacity-60">
                     <span>{user.identity.email}</span>
                     <span>•</span>
                     <span>{user.identity.phone}</span>
                     <span>•</span>
                     <span>Linkedin.com/in/verified</span>
                  </div>
                  <p className="text-base font-light leading-relaxed italic border-l-2 border-black/10 pl-6">
                    {resume.tailoredBio}
                  </p>
                </header>

                <div className="space-y-16">
                  <section>
                    <h2 className="text-[11px] font-black uppercase tracking-[0.3em] border-b-2 border-black/5 mb-8 pb-2 font-sans flex justify-between">
                       Verified Experience
                       <span className="opacity-20 font-mono">Archive_Node_{user.identity.fullName.charAt(0)}</span>
                    </h2>
                    <div className="space-y-12">
                      {resume.tailoredExperience.map((exp: any, i: number) => (
                        <div key={i} className="space-y-4">
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-bold text-xl leading-none font-sans">{exp.title}</h3>
                            <span className="text-[10px] font-mono uppercase opacity-50 tracking-widest">{exp.company}</span>
                          </div>
                          <ul className="list-disc list-outside pl-6 space-y-3 text-[15px] leading-relaxed font-light">
                            {exp.bullets.map((bullet: string, j: number) => (
                              <li key={j} className="marker:text-black/20">{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-8">
                     <section>
                       <h2 className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black/10 mb-6 pb-2 font-sans">Core_Technology</h2>
                       <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-mono opacity-80 uppercase leading-snug">
                          {user.hardSkills.map(s => <span key={s}>• {s}</span>)}
                       </div>
                     </section>
                     <section>
                       <h2 className="text-[10px] font-black uppercase tracking-[0.2em] border-b border-black/10 mb-6 pb-2 font-sans">Strategic_Capabilities</h2>
                       <div className="flex flex-wrap gap-x-4 gap-y-2 text-[11px] font-mono opacity-80 uppercase leading-snug">
                          {user.softSkills.map(s => <span key={s}>• {s}</span>)}
                       </div>
                     </section>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer Controls */}
      <div className="h-20 border-t border-white/5 bg-charcoal px-8 flex items-center justify-between">
        <div className="text-[10px] font-mono text-white/20 uppercase">
          Generated via Google AI Studio // Gemini-3-Flash-Preview
        </div>
        <div className="flex gap-4">
           <button className="flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs font-mono uppercase">
             <Download size={14} /> EXPORT PDF
           </button>
           <button 
            onClick={() => navigate("/apply")}
            className="btn-primary py-2 px-6 text-xs"
           >
             PROCEED TO 1-CLICK APPLY HUB
           </button>
        </div>
      </div>
    </div>
  );
}
