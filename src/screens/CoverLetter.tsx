import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import { FileText, Zap, ChevronRight, Layout, Sparkles, Copy, Download, RefreshCcw } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

export default function CoverLetter() {
  const { user } = useApp();
  const [length, setLength] = useState(50);
  const [tone, setTone] = useState("Concise & Direct");
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState("");

  const generateLetter = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const response = await fetch("/api/generate-cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userProfile: user,
          jobDetails: {
            title: "Senior Product Manager", // This should ideally be dynamic
            description: "A fast-paced tech company looking for a metrics-driven PM to lead growth initiatives."
          },
          tone,
          length
        })
      });
      const data = await response.json();
      if (data.letter) {
        setLetter(data.letter);
      }
    } catch (error) {
      console.error("Error generating letter:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal flex flex-col">
       <nav className="h-24 border-b border-white/10 px-10 flex justify-between items-center bg-white/[0.02] backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <h2 className="text-2xl font-black tracking-tight leading-none uppercase">Cover Letter <span className="text-neon-accent">Builder</span></h2>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex gap-2">
            <span className="px-4 py-1 bg-neon-accent/10 border border-neon-accent/20 rounded-full text-[10px] font-bold text-neon-accent uppercase tracking-widest leading-none">Gold Member</span>
          </div>
        </div>
        <div className="flex gap-4">
          <button className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-3 rounded-2xl text-xs font-bold uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/10 transition-all">
            <Download size={18} /> Export Document
          </button>
        </div>
      </nav>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Parameters */}
        <div className="w-full md:w-[400px] border-r border-white/5 p-10 space-y-12 overflow-y-auto custom-scrollbar">
           <section className="space-y-8">
              <h4 className="text-[11px] font-bold text-white/20 tracking-[0.4em] uppercase">Customize Tone</h4>
              <div className="space-y-3">
                 {["Concise & Direct", "Narrative & Creative", "Metrics Focused", "Standard Corporate"].map(t => (
                   <button 
                     key={t} 
                     onClick={() => setTone(t)}
                     className={`w-full text-left p-5 text-xs font-bold uppercase tracking-widest border transition-all rounded-2xl shadow-inner ${tone === t ? 'bg-neon-accent/10 border-neon-accent text-neon-accent' : 'bg-white/[0.02] border-white/5 text-white/40 hover:border-white/20 hover:bg-white/[0.05] hover:text-white'}`}
                   >
                      {t}
                   </button>
                 ))}
              </div>
           </section>

           <section className="space-y-8">
              <h4 className="text-[11px] font-bold text-white/20 tracking-[0.4em] uppercase">Letter Length</h4>
              <div className="space-y-6">
                 <input 
                    type="range" 
                    value={length}
                    onChange={(e) => setLength(parseInt(e.target.value))}
                    className="w-full accent-neon-accent bg-white/5 h-2 rounded-full appearance-none shadow-inner"
                 />
                 <div className="flex justify-between text-[10px] font-bold text-white/20 uppercase tracking-widest">
                    <span>Short & Sweet</span>
                    <span>Detailed</span>
                 </div>
              </div>
           </section>

           <button 
             onClick={generateLetter}
             className="w-full btn-primary py-6 rounded-2xl flex items-center justify-center gap-4 shadow-2xl shadow-neon-accent/10"
           >
             <Sparkles size={24} className="fill-current" />
             <span className="font-black tracking-[0.2em] text-xs uppercase">Generate Letter</span>
           </button>
        </div>

        {/* Right Side: Preview */}
        <div className="flex-1 bg-[#1e2422] overflow-y-auto p-12 lg:p-24 custom-scrollbar flex justify-center">
           <AnimatePresence mode="wait">
              {loading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  className="flex flex-col items-center justify-center h-full gap-10"
                >
                   <div className="relative">
                      <div className="absolute inset-0 blur-3xl bg-neon-accent/20 rounded-full animate-pulse" />
                      <RefreshCcw className="animate-spin text-neon-accent relative z-10" size={64} />
                   </div>
                   <div className="text-center space-y-3">
                      <p className="text-3xl font-black uppercase tracking-tight">Writing your letter...</p>
                      <p className="text-xs font-bold text-white/20 uppercase tracking-widest">Adding a personal touch for the best impression</p>
                   </div>
                </motion.div>
              ) : letter ? (
                <motion.div
                  key="letter"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="w-full max-w-[750px] bg-white text-charcoal p-20 md:p-28 shadow-[0_50px_100px_rgba(0,0,0,0.6)] font-serif rounded-sm"
                >
                   <div className="border-b-[6px] border-black pb-12 mb-12 font-sans">
                      <h1 className="text-5xl font-black uppercase tracking-tight mb-6 leading-none">{user?.identity.fullName}</h1>
                      <div className="flex gap-8 text-xs font-bold text-black/50 uppercase tracking-widest">
                         <span>{user?.identity.email}</span>
                         <span>•</span>
                         <span>Professional Portfolio</span>
                      </div>
                   </div>
                   <div className="prose prose-lg font-serif leading-relaxed text-black/80">
                      <ReactMarkdown>{letter}</ReactMarkdown>
                   </div>
                   <div className="mt-24 pt-10 border-t border-black/5 flex justify-between items-center text-[11px] font-bold tracking-widest text-black/20 uppercase">
                      <span>Document ID: CL-2024-X</span>
                      <span>Verified: {new Date().toLocaleDateString()}</span>
                   </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-center gap-10 opacity-20">
                   <div className="w-24 h-32 border-2 border-dashed border-white/20 rounded-3xl flex items-center justify-center bg-white/[0.01]">
                      <FileText size={48} />
                   </div>
                   <p className="text-xs font-bold uppercase tracking-[0.4em]">Ready to build your masterpiece</p>
                </div>
              )}
           </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
