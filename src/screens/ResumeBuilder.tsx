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
      <nav className="h-20 border-b border-white/10 px-10 flex items-center justify-between bg-white/[0.02]">
        <div className="flex items-center gap-4">
          <FileText className="text-neon-accent" size={24} />
          <h1 className="font-bold text-lg tracking-tight uppercase">Resume <span className="text-neon-accent">Assistant</span></h1>
        </div>
        <div className="flex items-center gap-6">
          <button 
            onClick={() => setActiveTab("editor")}
            className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-full ${activeTab === 'editor' ? 'bg-neon-accent/10 text-neon-accent border border-neon-accent/20' : 'text-white/40 hover:text-white/60'}`}
          >
            Options
          </button>
          <button 
             onClick={() => setActiveTab("preview")}
             className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all rounded-full ${activeTab === 'preview' ? 'bg-neon-accent/10 text-neon-accent border border-neon-accent/20' : 'text-white/40 hover:text-white/60'}`}
          >
            Preview
          </button>
        </div>
        <button 
          onClick={generateResume}
          disabled={loading}
          className="flex items-center gap-3 bg-neon-accent text-charcoal px-6 py-2.5 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 active:scale-95 transition-all disabled:opacity-50 shadow-xl shadow-neon-accent/20"
        >
          {loading ? <Loader2 className="animate-spin" size={18} /> : <Zap size={18} className="fill-current" />}
          {resume ? "Regenerate" : "Create Resume"}
        </button>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Settings/Keyword Injector */}
        <div className={`w-full md:w-[400px] border-r border-white/5 p-10 space-y-12 overflow-y-auto custom-scrollbar ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          <section className="space-y-8">
            <h4 className="text-[11px] font-bold text-neon-accent tracking-[0.4em] uppercase">Target Skills</h4>
            <div className="flex flex-wrap gap-2">
              {(user?.mustHave || user?.hardSkills || []).slice(0, 10).map(kw => (
                <div key={kw} className="px-4 py-1.5 bg-white/[0.03] border border-white/10 rounded-xl text-[10px] font-bold uppercase text-white/60 tracking-widest whitespace-nowrap">
                   {kw}
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-8">
             <h4 className="text-[11px] font-bold text-white/20 tracking-[0.4em] uppercase">Status</h4>
             <div className="space-y-3">
                {[
                  { label: "Action Words", val: "ENABLED" },
                  { label: "Results Focus", val: "ACTIVE" },
                  { label: "Skill Match", val: "8.5%" },
                  { label: "Tailored", val: "SYNCED" }
                ].map(stat => (
                  <div key={stat.label} className="p-5 bg-white/[0.02] border border-white/5 flex justify-between items-center rounded-2xl group hover:border-white/20 transition-all shadow-inner">
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white/60">{stat.label}</span>
                    <span className="text-[11px] font-black text-neon-accent tracking-widest">{stat.val}</span>
                  </div>
                ))}
             </div>
          </section>

          <section className="space-y-6">
             <h4 className="text-[11px] font-bold text-white/20 tracking-[0.4em] uppercase">Writing Progress</h4>
             <div className="bg-charcoal/50 border border-white/5 p-6 h-56 rounded-[2rem] font-mono text-[10px] overflow-y-auto space-y-3 text-white/30 custom-scrollbar shadow-inner">
                <p className="text-neon-accent/60">● Getting ready...</p>
                <p>● Looking at your goals...</p>
                <p>● Picking out highlights...</p>
                <p>● Putting it all together...</p>
                <p className="text-emerald-400 font-bold">● Your resume is ready.</p>
             </div>
          </section>
        </div>

        {/* Right Side: Document Canvas */}
        <div className="flex-1 bg-[#1e2422] p-6 md:p-16 overflow-y-auto flex justify-center custom-scrollbar">
          <AnimatePresence mode="wait">
            {!resume ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center space-y-10"
              >
                <div className="w-24 h-32 border-2 border-dashed border-white/10 rounded-3xl flex items-center justify-center bg-white/[0.01]">
                   <div className="relative">
                      <div className="absolute inset-0 blur-xl bg-neon-accent/20 rounded-full" />
                      <Sparkles className="text-neon-accent relative z-10" size={40} />
                   </div>
                </div>
                <div className="space-y-4">
                  <p className="text-white/40 text-sm font-medium max-w-sm leading-relaxed uppercase tracking-[0.2em]">
                    Ready to build your masterpiece? 
                  </p>
                  <p className="text-white/20 text-xs max-w-xs mx-auto leading-relaxed">
                    Choose your options on the left and start the builder to create an optimized professional resume.
                  </p>
                </div>
                <button 
                  onClick={generateResume}
                  disabled={loading}
                  className="btn-primary px-12 py-5 rounded-2xl text-xs font-black tracking-widest shadow-2xl shadow-neon-accent/10"
                >
                  {loading ? "WORKING..." : "BUILD RESUME"}
                </button>
              </motion.div>
            ) : (
              <motion.div 
                key="doc"
                initial={{ y: 80, opacity: 0, scale: 0.98 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                className="w-full max-w-[850px] bg-white text-[#1a1a1a] p-16 md:p-24 min-h-[1100px] shadow-[0_50px_100px_rgba(0,0,0,0.6)] font-serif rounded-sm"
              >
                <header className="mb-16 border-b-[6px] border-black pb-12">
                  <h1 className="text-6xl font-black uppercase tracking-tight mb-6 font-sans leading-none">{user.identity.fullName}</h1>
                  <div className="flex flex-wrap gap-8 text-[11px] font-bold text-black/50 uppercase tracking-[0.2em] mb-10">
                     <span className="hover:text-black transition-colors cursor-default">{user.identity.email}</span>
                     <span>•</span>
                     <span className="hover:text-black transition-colors cursor-default">{user.identity.phone}</span>
                     <span>•</span>
                     <span className="hover:text-black transition-colors cursor-default">Professional Portfolio</span>
                  </div>
                  <p className="text-lg font-light leading-relaxed italic border-l-4 border-black/5 pl-8 text-black/70">
                    {resume.tailoredBio}
                  </p>
                </header>

                <div className="space-y-20">
                  <section>
                    <h2 className="text-xs font-black uppercase tracking-[0.4em] border-b border-black/10 mb-12 pb-3 font-sans flex justify-between items-end">
                       Professional Experience
                       <span className="text-[10px] font-bold text-black/20 tracking-widest uppercase">Certified History</span>
                    </h2>
                    <div className="space-y-16">
                      {resume.tailoredExperience.map((exp: any, i: number) => (
                        <div key={i} className="space-y-6">
                          <div className="flex justify-between items-end">
                            <h3 className="font-bold text-2xl tracking-tight leading-none font-sans">{exp.title}</h3>
                            <span className="text-xs font-bold text-black/40 uppercase tracking-widest">{exp.company}</span>
                          </div>
                          <ul className="list-disc list-outside pl-8 space-y-4 text-[16px] leading-[1.6] font-light text-black/80">
                            {exp.bullets.map((bullet: string, j: number) => (
                              <li key={j} className="marker:text-black/30">{bullet}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </section>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-20 pt-10">
                     <section className="space-y-8">
                       <h2 className="text-[11px] font-black uppercase tracking-[0.3em] border-b border-black/10 pb-3 font-sans">Key Skills</h2>
                       <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-black/60 uppercase tracking-widest leading-relaxed">
                          {user.hardSkills.map(s => <span key={s} className="hover:text-black transition-colors">/ {s}</span>)}
                       </div>
                     </section>
                     <section className="space-y-8">
                       <h2 className="text-[11px] font-black uppercase tracking-[0.3em] border-b border-black/10 pb-3 font-sans">Core Strengths</h2>
                       <div className="flex flex-wrap gap-x-6 gap-y-3 text-xs font-bold text-black/60 uppercase tracking-widest leading-relaxed">
                          {user.softSkills.map(s => <span key={s} className="hover:text-black transition-colors">/ {s}</span>)}
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
      <div className="h-24 border-t border-white/10 bg-white/[0.02] px-10 flex items-center justify-between">
        <div className="text-[10px] font-bold text-white/10 uppercase tracking-[0.2em]">
          Powered by Internly
        </div>
        <div className="flex gap-6">
           <button className="flex items-center gap-3 text-white/40 hover:text-white transition-all text-[11px] font-bold uppercase tracking-widest group">
             <Download size={18} /> Export PDF
           </button>
           <button 
            onClick={() => navigate("/apply")}
            className="btn-primary py-3.5 px-10 rounded-2xl text-[11px] font-black tracking-widest shadow-2xl shadow-neon-accent/10"
           >
             Go to Job Hub
           </button>
        </div>
      </div>
    </div>
  );
}
