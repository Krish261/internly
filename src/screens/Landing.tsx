import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Terminal, Zap, ChevronRight, Brain, Target } from "lucide-react";
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
      className="flex flex-col items-center min-h-screen bg-charcoal text-platinum overflow-x-hidden selection:bg-neon-accent selection:text-charcoal"
    >
      <div className="fixed inset-0 pointer-events-none overflow-hidden h-screen z-0 opacity-40">
         <div className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-neon-accent/10 blur-[120px] rounded-full animate-pulse" />
         <div className="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-emerald-500/5 blur-[120px] rounded-full" />
      </div>

      {/* Floating Header */}
      <nav className="fixed top-0 left-0 w-full px-12 py-10 flex justify-between items-center z-50 pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto group cursor-pointer" onClick={() => navigate("/")}>
          <div className="p-3 bg-neon-accent rounded-3xl group-hover:rotate-12 transition-transform shadow-[0_0_30px_rgba(0,255,204,0.3)]">
            <Zap className="text-charcoal fill-charcoal" size={24} strokeWidth={2.5} />
          </div>
          <span className="text-3xl font-black italic tracking-tighter text-white">Internly <span className="text-neon-accent text-glow">AI</span></span>
        </div>
        <div className="hidden lg:flex items-center gap-12 font-black text-[11px] uppercase tracking-[0.3em] text-white/40 pointer-events-auto">
          <a href="#" className="hover:text-white transition-colors">How it works</a>
          <a href="#" className="hover:text-white transition-colors">Trends</a>
          <a href="#" className="hover:text-white transition-colors">For Teams</a>
          <button 
            onClick={() => navigate("/onboarding")}
            className="text-charcoal bg-white px-10 py-4.5 rounded-2xl hover:bg-neon-accent transition-all shadow-xl active:scale-95"
          >
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center text-center px-4 pt-56 pb-20 max-w-7xl relative z-10">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           className="inline-flex items-center gap-3 px-6 py-2.5 rounded-2xl border border-white/5 bg-white/[0.03] backdrop-blur-md mb-12 shadow-2xl"
        >
           <div className="w-2.5 h-2.5 rounded-full bg-neon-accent animate-pulse shadow-[0_0_10px_rgba(0,255,204,0.8)]" />
           <span className="text-xs font-black text-white uppercase tracking-[0.4em]">Internly Platform Live</span>
        </motion.div>

        <motion.h1 
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-7xl md:text-[10rem] font-black leading-[0.85] tracking-tighter mb-12 uppercase"
        >
          Stop applying.<br />
          Start <span className="text-neon-accent italic">building<span className="text-white text-glow text-shadow-xl">.</span></span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-xl md:text-2xl text-white/30 font-medium mb-20 max-w-3xl leading-relaxed"
        >
          The career platform that understands your experience and helps you bridge the gap to your dream job.
        </motion.p>

        <motion.div 
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-8 mb-40"
        >
           <button 
             onClick={() => navigate("/onboarding")} 
             className="bg-white text-charcoal px-20 py-8 rounded-[2rem] text-sm font-black tracking-[0.3em] uppercase transition-all hover:bg-neon-accent hover:shadow-[0_0_50px_rgba(0,255,204,0.4)] shadow-2xl active:scale-95 group"
           >
              Get Started
              <ChevronRight className="inline-block ml-4 group-hover:translate-x-3 transition-transform" />
           </button>
           <button className="px-20 py-8 border-2 border-white/5 rounded-[2rem] text-sm font-black text-white/40 uppercase tracking-[0.3em] hover:border-white/20 hover:text-white transition-all backdrop-blur-sm">
              Watch Module
           </button>
        </motion.div>

        {/* Feature Deep-Dive */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-left w-full px-6 mb-56">
           {[
             { title: "Skill Map", desc: "Analyze your background to identify your core strengths and skills.", icon: <Brain size={32} /> },
             { title: "Job Insights", desc: "We break down job descriptions into simple, actionable skill requirements.", icon: <Target size={32} /> },
             { title: "Smart Apply", desc: "Instantly tailor your applications for the best match with any role.", icon: <Zap size={32} /> }
           ].map((feature, i) => (
             <motion.div 
               key={feature.title}
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: i * 0.1, duration: 0.8 }}
               viewport={{ once: true }}
               className="p-14 card-surface bg-white/[0.02] border-white/5 group hover:border-neon-accent/30 transition-all rounded-[3rem] shadow-2xl relative overflow-hidden"
             >
                <div className="absolute top-0 right-0 p-10 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity group-hover:scale-150 duration-700">
                   {feature.icon}
                </div>
                <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-[1.5rem] flex items-center justify-center mb-10 group-hover:bg-neon-accent group-hover:text-charcoal transition-all duration-500 shadow-xl">
                   {feature.icon}
                </div>
                <h3 className="text-3xl font-black mb-6 uppercase tracking-tight leading-none">{feature.title}</h3>
                <p className="text-lg text-white/30 leading-relaxed font-semibold group-hover:text-white/60 transition-colors">{feature.desc}</p>
             </motion.div>
           ))}
        </div>

        {/* Interactive Ticker Terminal */}
        <section className="w-full mb-56 space-y-20">
          <div className="space-y-4">
             <h3 className="text-sm font-black uppercase tracking-[0.5em] text-neon-accent text-glow">Expert Insights</h3>
             <p className="text-white/20 text-xs font-bold uppercase tracking-[0.3em]">Role Requirements Explained</p>
          </div>
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-full max-w-5xl mx-auto bg-black border border-white/5 rounded-[3rem] overflow-hidden shadow-2xl ring-1 ring-white/10"
          >
            <div className="h-10 bg-white/[0.03] flex items-center px-10 gap-3 border-b border-white/5">
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="w-3 h-3 rounded-full bg-white/10" />
              <div className="flex-1 text-[11px] font-black text-center text-white/10 uppercase tracking-[0.4em]">Internly AI v1.0</div>
            </div>
            <div className="p-16 min-h-[400px] font-mono text-left relative">
               <div className="absolute inset-0 bg-neon-accent/[0.01] pointer-events-none" />
               <div className="flex items-start gap-8 relative z-10">
                 <span className="text-neon-accent text-3xl font-black tracking-widest">{">"}</span>
                 <div className="space-y-12 w-full">
                   <div className="space-y-4">
                     <p className="text-white/20 text-lg font-bold">ANALYZING ROLE:</p>
                     <p className="text-white text-5xl font-black uppercase italic tracking-tighter leading-none">{roles[roleIndex]}</p>
                   </div>
                   <motion.div 
                     key={roleIndex}
                     initial={{ opacity: 0, x: -20 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="space-y-8"
                   >
                     <div className="flex items-center gap-4">
                       <div className="h-0.5 w-12 bg-neon-accent" />
                       <p className="text-neon-accent text-xl font-black tracking-widest">ANALYSIS COMPLETE</p>
                     </div>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                       {["INFRA_ENG", "SCALABILITY", "UX_LOGIC", "DATA_PIPELINES"].map((skill, si) => (
                         <div key={skill} className="bg-white/5 border border-white/5 px-6 py-4 rounded-2xl text-[11px] text-white/40 font-black tracking-widest flex items-center justify-between group cursor-default hover:bg-neon-accent/10 hover:border-neon-accent/30 hover:text-neon-accent transition-all animate-pulse" style={{ animationDelay: `${si * 0.1}s` }}>
                            {skill}
                            <div className="w-1.5 h-1.5 bg-neon-accent rounded-full shadow-[0_0_8px_rgba(0,255,204,0.5)]" />
                         </div>
                       ))}
                     </div>
                   </motion.div>
                 </div>
               </div>
            </div>
          </motion.div>
        </section>

        {/* Final CTA */}
        <div className="py-40 relative w-full overflow-hidden">
           <div className="absolute inset-0 bg-neon-accent/5 blur-[150px] opacity-20" />
           <div className="relative z-10 space-y-16">
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85]">Join the New Era<br/><span className="text-white/20 italic">of Employability.</span></h2>
              <button 
                onClick={() => navigate("/onboarding")}
                className="bg-white text-charcoal px-24 py-10 rounded-[3rem] text-sm font-black tracking-[0.5em] uppercase hover:bg-neon-accent hover:shadow-[0_0_80px_rgba(0,255,204,0.5)] transition-all shadow-2xl active:scale-95"
              >
                 Get Access Now
              </button>
           </div>
        </div>
      </div>
    </motion.div>

  );
}
