import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Terminal, Zap, ChevronRight } from "lucide-react";
import { useState, useEffect } from "react";

const roles = ["Software Engineer", "Product Manager", "Data Scientist", "UI Designer", "DevOps Engineer"];

export default function Landing() {
  const navigate = useNavigate();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen bg-charcoal text-platinum overflow-hidden"
    >
      {/* Floating Header */}
      <nav className="fixed top-0 left-0 w-full px-8 py-6 flex justify-between items-center backdrop-blur-md bg-charcoal/20 border-b border-white/5 z-50">
        <div className="flex items-center gap-2">
          <Zap className="text-neon-accent" size={20} />
          <span className="text-xl font-black heading-bold text-neon-accent italic">INTERNLY</span>
        </div>
        <div className="flex items-center gap-8 font-mono text-[10px] uppercase font-bold tracking-widest text-white/50">
          <a href="#" className="hover:text-neon-accent transition-colors">Product</a>
          <a href="#" className="hover:text-neon-accent transition-colors">Pricing</a>
          <button className="text-neon-accent border border-neon-accent px-4 py-1 rounded hover:bg-neon-accent hover:text-charcoal transition-all">Sign In</button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center px-4 pt-32 pb-20 max-w-5xl">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-accent/30 bg-neon-accent/5 mb-8"
        >
           <div className="w-1.5 h-1.5 rounded-full bg-neon-accent animate-pulse" />
           <span className="text-[10px] font-mono text-neon-accent font-bold uppercase tracking-[0.3em]">INTERNLY v4.2</span>
        </motion.div>

        <motion.h1 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-6xl md:text-[84px] font-[900] heading-bold mb-8 leading-[0.9] tracking-tighter"
        >
          STOP APPLYING.<br />
          START <span className="text-neon-accent text-glow">YOUR CAREER.</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg md:text-xl text-white/40 font-mono mb-16 uppercase tracking-tight max-w-2xl leading-relaxed"
        >
          The first career platform that deconstructs your dream roles and automates your entire application pipeline.
        </motion.p>

        <div className="flex gap-4 mb-24">
           <button onClick={() => navigate("/onboarding")} className="btn-primary px-12 py-5 text-sm tracking-[0.4em] shadow-[0_0_50px_rgba(0,255,204,0.3)]">
              GET STARTED
           </button>
           <button className="px-12 py-5 border border-white/5 font-mono text-[10px] uppercase tracking-widest hover:border-white/20 transition-all">
              EXPLORE FEATURES
           </button>
        </div>

        {/* Feature Deep-Dive (Screen 02) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-7xl mx-auto px-6 mb-32">
           {[
             { title: "NO MANUAL ENTRY", desc: "Our AI engine extracts your profile from your existing data. No forms. No repetition." },
             { title: "JOB ANALYSIS", desc: "Every job description is broken down into its core requirements for precise matching." },
             { title: "EASY APPLY", desc: "1-Tap application submission. Our platform handles the form-fills while you improve your skills." }
           ].map((feature, i) => (
             <motion.div 
               key={feature.title}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               transition={{ delay: i * 0.1 }}
               viewport={{ once: true }}
               className="p-10 card-surface bg-surface-matte/20 border-white/5 group hover:border-neon-accent/30 transition-all"
             >
                <div className="flex items-center gap-2 text-neon-accent font-mono text-[8px] font-bold mb-4 italic">FEATURE_{i+1}</div>
                <div className="w-10 h-10 bg-white/5 border border-white/5 flex items-center justify-center mb-6 group-hover:bg-neon-accent/10 transition-all">
                   <Zap size={20} className="text-white/20 group-hover:text-neon-accent" />
                </div>
                <h3 className="text-xl font-black italic tracking-tighter mb-4 uppercase">{feature.title}</h3>
                <p className="text-xs font-mono text-white/30 leading-relaxed uppercase">{feature.desc}</p>
             </motion.div>
           ))}
        </div>

        {/* Interactive Ticker Terminal */}
        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full max-w-2xl bg-surface-matte border border-white/10 rounded-lg overflow-hidden shadow-2xl mb-12"
        >
          <div className="h-8 bg-white/5 flex items-center px-4 gap-1.5 border-b border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
            <div className="flex-1 text-[10px] font-mono text-center text-white/20 uppercase tracking-widest">AI_ENGINE</div>
          </div>
          <div className="p-8 h-48 font-mono text-left space-y-4">
             <div className="flex items-start gap-4">
               <span className="text-neon-accent">{">"}</span>
               <div className="space-y-2">
                 <p className="text-white/40 text-xs">ANALYZING ROLE: <span className="text-platinum uppercase font-bold">{roles[roleIndex]}</span></p>
                 <motion.div 
                   key={roleIndex}
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   className="space-y-1"
                 >
                   <p className="text-neon-accent text-sm">IDENTIFYING SKILLS...</p>
                   <div className="flex flex-wrap gap-2 pt-2">
                     <span className="bg-neon-accent/10 border border-neon-accent/20 px-2 py-0.5 text-[9px] text-neon-accent">DYNAMIC_ROUTING</span>
                     <span className="bg-neon-accent/10 border border-neon-accent/20 px-2 py-0.5 text-[9px] text-neon-accent">REALTIME_PIPELINES</span>
                     <span className="bg-neon-accent/10 border border-neon-accent/20 px-2 py-0.5 text-[9px] text-neon-accent">SYSTEM_ARCH</span>
                   </div>
                 </motion.div>
               </div>
             </div>
          </div>
        </motion.div>

        <motion.button 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate("/onboarding")}
          className="btn-primary glow-neon-pulse text-2xl px-12 py-5"
        >
          Start Free Skill Mapping
        </motion.button>
      </div>
    </motion.div>
  );
}
