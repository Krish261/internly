import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import { FileText, Zap, ChevronRight, Layout, Sparkles, Copy, Download, RefreshCcw } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function CoverLetter() {
  const { user } = useApp();
  const [length, setLength] = useState(50);
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState("");

  const generateLetter = () => {
    setLoading(true);
    setTimeout(() => {
      setLetter(`Dear Hiring Team,

I am deploying my verified skill matrix for the **Senior Product Manager** role. As a ${user?.identity.fullName} with verified authority in **${user?.hardSkills[0]}** and **${user?.hardSkills[1]}**, I am optimized for your technical ecosystem.

My recent benchmarks indicate a 94% alignment with your core mission. unlike standard applicants, my profile is AI-verified and metric-driven.

I look forward to the next deployment phase.

Best,
${user?.identity.fullName}`);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-charcoal flex flex-col">
       <nav className="border-b border-white/5 p-6 flex justify-between items-center bg-charcoal/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-6">
          <h2 className="text-xl font-black italic tracking-tighter uppercase">COVER_GENERATOR</h2>
          <div className="h-6 w-px bg-white/10" />
          <div className="flex gap-2">
            <span className="px-3 py-1 bg-neon-accent/10 border border-neon-accent/20 rounded-full text-[9px] font-mono text-neon-accent font-bold">GOLD_TIER_ACTIVE</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="btn-secondary px-6 flex items-center gap-2">
            <Download size={16} /> EXPORT_DOC
          </button>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Parameters */}
        <div className="w-full md:w-96 border-r border-white/5 p-8 space-y-12 overflow-y-auto">
           <section className="space-y-6">
              <h4 className="label-mono text-white/20 font-bold tracking-[0.3em]">TONE_CALIBRATION</h4>
              <div className="space-y-3">
                 {["Concise & Direct", "Narrative & Creative", "Metrics Focused", "Standard Corporate"].map(tone => (
                   <button key={tone} className="w-full card-surface p-4 text-left text-[10px] font-mono uppercase tracking-widest hover:border-white/20 bg-white/5 transition-all">
                      {tone}
                   </button>
                 ))}
              </div>
           </section>

           <section className="space-y-6">
              <h4 className="label-mono text-white/20 font-bold tracking-[0.3em]">LENGTH_CONTROL</h4>
              <div className="space-y-4">
                 <input 
                    type="range" 
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full accent-neon-accent"
                 />
                 <div className="flex justify-between text-[9px] font-mono text-white/30 uppercase">
                    <span>Short (TL;DR)</span>
                    <span>Detailed</span>
                 </div>
              </div>
           </section>

           <button 
             onClick={generateLetter}
             className="w-full btn-primary py-6 flex items-center justify-center gap-3 shadow-[0_0_50px_rgba(0,255,204,0.1)]"
           >
             <Sparkles size={18} />
             GENERATE_LETTER
           </button>
        </div>

        {/* Right Side: Preview */}
        <div className="flex-1 bg-black/40 overflow-y-auto p-12 lg:p-24 custom-scrollbar">
           <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-8"
                >
                   <RefreshCcw className="animate-spin text-neon-accent" size={48} />
                   <div className="text-center space-y-2">
                      <p className="text-xl font-black italic italic">SYNTHESIZING_NARRATIVE...</p>
                      <p className="label-mono text-white/20">Optimizing for regional cultural bias...</p>
                   </div>
                </motion.div>
              ) : letter ? (
                <motion.div
                  key="letter"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-[700px] mx-auto bg-white text-charcoal p-16 shadow-[0_0_100px_rgba(0,0,0,0.4)] font-serif"
                >
                   <div className="border-b border-black/10 pb-10 mb-10 font-sans">
                      <h1 className="text-3xl font-black uppercase tracking-tight mb-2">{user?.identity.fullName}</h1>
                      <p className="text-[10px] font-mono opacity-60 uppercase">{user?.identity.email} • LinkedIn.com/in/verified</p>
                   </div>
                   <div className="prose prose-sm font-serif leading-relaxed text-base italic opacity-90">
                      <ReactMarkdown>{letter}</ReactMarkdown>
                   </div>
                   <div className="mt-20 pt-10 border-t border-black/5 flex justify-between items-center font-mono opacity-20 text-[9px]">
                      <span>Letter_UUID: {Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                      <span>System_Verified: {new Date().toLocaleDateString()}</span>
                   </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center gap-6 opacity-20">
                   <FileText size={64} />
                   <p className="label-mono italic">Ready for document generation...</p>
                </div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
