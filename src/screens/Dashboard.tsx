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

  const assessmentCount = Object.keys(user.assessments).length;
  const totalSkills = user.hardSkills.length;
  const progressPercent = totalSkills > 0 ? (assessmentCount / totalSkills) * 100 : 0;

  return (
    <div className="p-8 lg:p-12 space-y-12 max-w-7xl mx-auto">
      <header className="flex justify-between items-start">
        <div>
          <p className="text-xl font-black text-white/50 italic mb-1">Welcome back, {user.identity.fullName.split(' ')[0]}</p>
          <h2 className="text-4xl heading-bold mb-2 uppercase">YOUR_HUB</h2>
          <p className="label-mono italic">"Your career progress is live in real-time..."</p>
        </div>
        <div className="text-right">
           <span className="label-mono block mb-2">Account_Level: {tier}</span>
           {tier === "Bronze" && (
             <button onClick={() => navigate("/checkout")} className="text-[10px] text-neon-accent font-bold uppercase tracking-widest hover:underline">Upgrade to Silver</button>
           )}
        </div>
      </header>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Skill Matrix Diagram (Radar Component Mockup) */}
        <div className="lg:col-span-2 card-surface h-[450px] flex flex-col relative overflow-hidden">
           <div className="flex justify-between items-center mb-8 relative z-10">
              <h3 className="label-mono text-neon-accent font-bold">Skill Breakdown</h3>
              <div className="flex gap-4 text-[8px] font-mono uppercase tracking-widest text-white/30">
                 <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-neon-accent rounded-full" /> Hard Skills</span>
                 <span className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 bg-burned-coral rounded-full" /> Soft Skills</span>
              </div>
           </div>
           
           <div className="flex-1 flex items-center justify-center relative">
              {/* Radar Chart Background Grid */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                 {[1, 2, 3, 4].map(i => (
                   <div key={i} className={`border border-white/20 rounded-full absolute`} style={{ width: i * 80, height: i * 80 }} />
                 ))}
                 <div className="w-[1px] h-full bg-white/20 absolute" />
                 <div className="w-full h-[1px] bg-white/20 absolute" />
                 <div className="w-full h-[1px] bg-white/20 absolute rotate-45" />
                 <div className="w-full h-[1px] bg-white/20 absolute -rotate-45" />
              </div>
              
              <svg className="w-64 h-64 relative z-10">
                 <motion.polygon 
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ duration: 1, type: "spring" }}
                   points="128,40 200,80 200,160 128,216 56,160 56,80"
                   className="fill-neon-accent/20 stroke-neon-accent stroke-2"
                 />
                 {[
                   { x: 128, y: 40, label: "Core" },
                   { x: 200, y: 80, label: "Scale" },
                   { x: 200, y: 160, label: "Logic" },
                   { x: 128, y: 216, label: "Data" },
                   { x: 56, y: 160, label: "Vision" },
                   { x: 56, y: 80, label: "Speed" }
                 ].map((p, i) => (
                    <circle key={i} cx={p.x} cy={p.y} r="4" className="fill-neon-accent" />
                 ))}
              </svg>

              {/* Data Tooltip Mockup (Screen 07 Spec) */}
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="absolute top-1/4 right-[20%] bg-charcoal/90 border border-neon-accent/50 p-3 rounded shadow-2xl z-20 backdrop-blur-sm"
              >
                 <p className="label-mono text-neon-accent">Capability Score</p>
                 <p className="text-2xl font-black italic tracking-tighter">84/100</p>
                 <div className="mt-2 text-[8px] font-mono text-white/40 uppercase">Top 5% Global</div>
              </motion.div>
           </div>
        </div>

        {/* Aggregate Rank & Scoring */}
        <div className="space-y-6">
           <div className="card-surface text-center p-10 glow-neon h-full flex flex-col justify-center gap-6">
              <div>
                <p className="label-mono mb-2">CAREER_RANK</p>
                <div className="text-8xl font-black text-neon-accent italic tracking-tighter text-glow">B+</div>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Hiring Probability</p>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                   <div className="h-full bg-neon-accent w-[64%]" />
                </div>
                <div className="flex justify-between text-[8px] font-mono text-white/20 uppercase pt-1">
                   <span>Current</span>
                   <span>Target: A+</span>
                </div>
              </div>
              <button 
                onClick={() => navigate("/assess")}
                className="w-full btn-primary py-4 text-xs mt-4"
              >
                GO TO ASSESSMENTS
              </button>
           </div>
        </div>
      </div>

      {/* Verified Badges Grid (Screen 07 Spec) */}
      <section className="space-y-8">
        <div className="flex justify-between items-end">
           <h3 className="label-mono text-neon-accent font-bold">Your Skills</h3>
           <span className="label-mono text-white/20">{assessmentCount}/{totalSkills} Validated</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {user.hardSkills.map(skill => (
             <div key={skill} className="card-surface bg-surface-matte/40 group hover:border-neon-accent/30 hover:scale-[1.02] transition-all cursor-default">
               <div className="flex justify-between items-start mb-6">
                  <div className={`p-2 rounded ${user.assessments[skill] ? 'bg-neon-accent/10 border border-neon-accent/20' : 'bg-white/5 border border-white/5'}`}>
                    <CheckCircle className={user.assessments[skill] ? 'text-neon-accent' : 'text-white/10'} size={20} />
                  </div>
                  {user.assessments[skill] && (
                    <div className="text-right">
                       <span className="text-neon-accent font-black text-lg italic">{user.assessments[skill].toFixed(0)}</span>
                       <span className="text-[10px] text-neon-accent/50 font-bold">%</span>
                    </div>
                  )}
               </div>
               <h4 className="text-xl font-black heading-bold mb-6 text-white/90 group-hover:text-white">{skill}</h4>
               <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <span className="text-[8px] font-mono text-white/20 uppercase">
                    {user.assessments[skill] ? "Verified: 08/2026" : "Awaiting Verification"}
                  </span>
                  <button 
                    onClick={() => navigate("/assess")} 
                    className="text-[8px] font-bold uppercase text-neon-accent hover:underline tracking-widest"
                  >
                    {user.assessments[skill] ? "Retake Test" : "Verify Skill"}
                  </button>
               </div>
             </div>
           ))}
        </div>
      </section>

      {/* In-Line Upsell Banner (Screen 07 Spec) */}
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="card-surface bg-[#1A2321] border-neon-accent/20 p-12 flex flex-col md:flex-row items-center justify-between gap-12 shadow-[0_0_50px_rgba(0,255,204,0.05)] rounded-2xl"
      >
        <div className="space-y-4 max-w-2xl">
           <h4 className="text-3xl font-black heading-bold italic">UNLOCK JOB INSIGHTS</h4>
           <p className="text-base font-mono text-white/50 uppercase leading-relaxed tracking-tight">
              You possess <span className="text-neon-accent font-bold">65%</span> of the skills required for your target role. <span className="text-white font-bold">Unlock Silver Tier</span> to see the exact missing 35% and bridge the gap.
           </p>
           <div className="flex gap-4 pt-2">
              <div className="flex items-center gap-2"><Target size={14} className="text-neon-accent" /> <span className="text-[10px] font-bold uppercase">Job Analysis</span></div>
              <div className="flex items-center gap-2"><Briefcase size={14} className="text-neon-accent" /> <span className="text-[10px] font-bold uppercase">Market Trends</span></div>
           </div>
        </div>
        <button 
          onClick={() => navigate("/checkout")} 
          className="btn-primary whitespace-nowrap px-12 text-sm shadow-[0_0_30px_rgba(0,255,204,0.4)]"
        >
          UPGRADE YOUR ACCOUNT
        </button>
      </motion.div>
    </div>
  );
}
