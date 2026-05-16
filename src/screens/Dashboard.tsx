import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { 
  CheckCircle,
  Zap, 
  ChevronRight,
  Target,
  FileText,
  Briefcase
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const { user, tier } = useApp();
  const navigate = useNavigate();

  if (!user) return null;

  const assessmentCount = Object.keys(user?.assessments || {}).length;
  const totalSkills = user?.hardSkills?.length || 0;
  const progressPercent = totalSkills > 0 ? (assessmentCount / totalSkills) * 100 : 0;

  return (
    <div className="p-8 lg:p-12 space-y-16 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div className="space-y-4">
          <p className="text-sm font-bold text-white/30 uppercase tracking-[0.4em]">Status: Active</p>
          <h2 className="text-7xl font-black tracking-tight leading-none uppercase">Your<br/><span className="text-neon-accent">Dashboard</span></h2>
          <p className="text-lg text-white/40 font-medium">Welcome back, {user.identity.fullName.split(' ')[0]}. Everything is ready.</p>
        </div>
        <div className="flex flex-col items-end gap-4">
           <div className={`px-6 py-2 rounded-2xl border font-black text-[10px] uppercase tracking-[0.2em] shadow-lg ${tier === 'Gold' ? 'bg-neon-accent/10 border-neon-accent/30 text-neon-accent' : 'bg-white/5 border-white/10 text-white/40'}`}>
              Plan: {tier} Member
           </div>
           {tier !== "Gold" && (
             <button onClick={() => navigate("/checkout")} className="text-[11px] text-neon-accent font-bold uppercase tracking-widest hover:text-white transition-colors">Upgrade Plan →</button>
           )}
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Skill Matrix Diagram */}
        <div className="lg:col-span-2 card-surface p-12 bg-white/[0.02] border-white/5 rounded-[3rem] flex flex-col relative overflow-hidden shadow-2xl">
           <div className="flex justify-between items-center mb-12 relative z-10">
              <div className="space-y-1">
                 <h3 className="text-xs font-black uppercase tracking-[0.4em] text-white/40 text-glow">Skill Overview</h3>
                 <p className="text-[10px] font-bold text-neon-accent uppercase tracking-widest">Your complete skill profile</p>
              </div>
              <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest text-white/20">
                 <span className="flex items-center gap-2"><div className="w-2 h-2 bg-neon-accent rounded-full shadow-[0_0_8px_rgba(0,255,204,0.5)]" /> Core</span>
                 <span className="flex items-center gap-2"><div className="w-2 h-2 bg-burned-coral rounded-full" /> Soft</span>
              </div>
           </div>
           
           <div className="flex-1 flex items-center justify-center relative min-h-[300px]">
              <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none scale-150">
                 {[1, 2, 3, 4, 5].map(i => (
                   <div key={i} className={`border border-white rounded-full absolute`} style={{ width: i * 120, height: i * 120 }} />
                 ))}
                 <div className="w-px h-[200%] bg-white absolute" />
                 <div className="w-[200%] h-px bg-white absolute" />
                 <div className="w-[200%] h-px bg-white absolute rotate-45" />
                 <div className="w-[200%] h-px bg-white absolute -rotate-45" />
              </div>
              
              <div className="relative group">
                <div className="absolute inset-0 blur-3xl bg-neon-accent/10 rounded-full group-hover:bg-neon-accent/20 transition-all duration-700" />
                <svg className="w-80 h-80 relative z-10 drop-shadow-[0_0_30px_rgba(0,255,204,0.2)]">
                   <motion.polygon 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
                      points="160,40 260,100 260,220 160,280 60,220 60,100"
                      className="fill-neon-accent/10 stroke-neon-accent/40 stroke-[1.5]"
                   />
                   <motion.polygon 
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 0.8 }}
                      transition={{ delay: 0.5, duration: 1.5, type: "spring" }}
                      points="160,80 220,120 220,200 160,240 100,200 100,120"
                      className="fill-neon-accent/20 stroke-neon-accent/60 stroke-2"
                   />
                   {[
                     { x: 160, y: 80 }, { x: 220, y: 120 }, { x: 220, y: 200 },
                     { x: 160, y: 240 }, { x: 100, y: 200 }, { x: 100, y: 120 }
                   ].map((p, i) => (
                      <circle key={i} cx={p.x} cy={p.y} r="5" className="fill-neon-accent shadow-glow shadow-neon-accent" />
                   ))}
                </svg>
              </div>

              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute top-10 right-10 bg-white/[0.03] border border-white/10 p-8 rounded-[2rem] shadow-2xl z-20 backdrop-blur-xl group hover:border-neon-accent/30 transition-all cursor-default"
              >
                 <p className="text-[10px] font-black uppercase tracking-widest text-white/30 mb-2">Overall Score</p>
                 <div className="flex items-baseline gap-2">
                    <p className="text-6xl font-black tracking-tighter text-white">84</p>
                    <p className="text-xl font-bold text-neon-accent">/100</p>
                 </div>
                 <div className="mt-4 flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                       <Zap size={12} className="text-neon-accent" />
                       <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none">Global Ranking: 98th</span>
                    </div>
                    <div className="flex items-center gap-2">
                       <Target size={12} className="text-neon-accent" />
                       <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none">Market Match: High</span>
                    </div>
                 </div>
              </motion.div>
           </div>
        </div>

        {/* Aggregate Rank & Scoring */}
        <div className="space-y-12 h-full flex flex-col">
           <div className="card-surface flex-1 p-12 bg-white/[0.02] border-white/5 rounded-[3rem] shadow-2xl flex flex-col justify-between relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-neon-accent/5 blur-[100px] -mr-24 -mt-24 transition-all group-hover:bg-neon-accent/10" />
              
              <div className="space-y-2">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Learning Velocity</p>
                <h4 className="text-sm font-bold text-neon-accent uppercase tracking-widest">Accelerated Track</h4>
              </div>

              <div className="text-center py-10 relative">
                <div className="absolute inset-0 blur-3xl bg-neon-accent/5 rounded-full" />
                <div className="text-9xl font-black text-white italic tracking-tighter leading-none relative z-10 group-hover:scale-110 transition-transform duration-500">B<span className="text-neon-accent text-glow">+</span></div>
                <p className="text-xs font-bold text-white/20 uppercase tracking-[0.4em] mt-6">Current Standing</p>
              </div>

              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex justify-between text-[10px] font-bold text-white/40 uppercase tracking-widest">
                    <span>Market Readiness</span>
                    <span className="text-neon-accent">82%</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/5 p-0.5">
                    <div className="h-full bg-gradient-to-r from-neon-accent to-emerald-400 rounded-full shadow-[0_0_15px_rgba(0,255,204,0.3)] transition-all duration-1000" style={{ width: '82%' }} />
                  </div>
                </div>
                
                <button 
                  onClick={() => navigate("/assess")}
                  className="w-full bg-white text-charcoal py-6 rounded-2xl text-xs font-black tracking-[0.2em] uppercase transition-all hover:bg-neon-accent hover:shadow-[0_0_30px_rgba(0,255,204,0.3)] shadow-xl active:scale-95"
                >
                  Boost Rating
                </button>
              </div>
           </div>
        </div>
      </div>

      {/* Verified Badges Grid */}
      <section className="space-y-12">
        <div className="flex justify-between items-end border-b border-white/10 pb-10">
           <div className="space-y-2">
              <h3 className="text-sm font-black text-white/80 uppercase tracking-widest">Your Skills</h3>
              <p className="text-xs font-medium text-white/20">Verified skills from your assessments</p>
           </div>
           <div className="bg-white/5 px-6 py-2 rounded-full border border-white/10">
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{assessmentCount} Verified / {totalSkills} Skills</span>
           </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
           {(user?.hardSkills || []).map(skill => (
             <motion.div 
               whileHover={{ y: -10 }}
               key={skill} 
               className={`card-surface p-10 bg-white/[0.02] border-white/5 rounded-[2.5rem] group hover:border-neon-accent/30 transition-all duration-500 shadow-xl relative overflow-hidden`}
             >
               {user?.assessments?.[skill] && (
                 <div className="absolute -top-10 -right-10 w-24 h-24 bg-neon-accent/5 rounded-full blur-2xl group-hover:bg-neon-accent/10 transition-colors" />
               )}
               
               <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 border ${user?.assessments?.[skill] ? 'bg-neon-accent/10 border-neon-accent/20 text-neon-accent group-hover:bg-neon-accent group-hover:text-charcoal' : 'bg-white/5 border-white/10 text-white/10'}`}>
                    <CheckCircle size={28} strokeWidth={user?.assessments?.[skill] ? 2.5 : 1.5} />
                  </div>
                  {user?.assessments?.[skill] && (
                    <div className="text-right">
                       <span className="text-3xl font-black text-white group-hover:text-neon-accent transition-colors leading-none">{user.assessments[skill].toFixed(0)}</span>
                       <span className="text-xs text-white/20 font-bold ml-1">%</span>
                    </div>
                  )}
               </div>
               
               <h4 className="text-2xl font-black text-white/60 group-hover:text-white transition-colors mb-2 uppercase tracking-tight">{skill}</h4>
               <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest mb-10">Confirmed Skill</p>
               
               <div className="flex justify-between items-center pt-8 border-t border-white/5 relative">
                  <span className="text-[9px] font-bold text-white/20 uppercase tracking-widest">
                    {user?.assessments?.[skill] ? "Verified Status" : "Assessment Required"}
                  </span>
                  <button 
                    onClick={() => navigate("/assess")} 
                    className="text-[10px] font-black uppercase text-neon-accent hover:text-white transition-colors tracking-widest"
                  >
                    {user?.assessments?.[skill] ? "Retake" : "Verify →"}
                  </button>
               </div>
             </motion.div>
           ))}
        </div>
      </section>

      {/* In-Line Upsell Banner */}
      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="card-surface bg-white/[0.04] border border-white/10 p-16 flex flex-col lg:flex-row items-center justify-between gap-16 rounded-[4rem] shadow-2xl relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 w-96 h-96 bg-neon-accent/10 blur-[120px] -ml-48 -mt-48 transition-all group-hover:bg-neon-accent/20" />
        
        <div className="space-y-6 max-w-2xl relative z-10">
           <div className="inline-flex items-center gap-3 px-4 py-2 bg-neon-accent/10 rounded-xl border border-neon-accent/20">
              <Zap size={14} className="text-neon-accent" />
              <span className="text-[10px] font-black text-neon-accent uppercase tracking-widest">Premium Intelligence</span>
           </div>
           <h4 className="text-5xl font-black tracking-tight leading-none uppercase">Gain the<br/><span className="text-neon-accent">Competitive Edge</span></h4>
           <p className="text-xl font-medium text-white/60 leading-relaxed">
              Unlock real-time market data, AI interview simulations, and unlimited cover letter generations to stay ahead.
           </p>
        </div>
        
        <button 
          onClick={() => navigate("/checkout")} 
          className="btn-primary whitespace-nowrap px-16 py-8 rounded-3xl text-xs font-black uppercase tracking-[0.3em] shadow-xl shadow-neon-accent/20 transition-all hover:scale-105 active:scale-95 relative z-10"
        >
          Upgrade Today
        </button>
      </motion.div>
    </div>

  );
}
