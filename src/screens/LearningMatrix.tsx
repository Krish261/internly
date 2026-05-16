import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { 
  BookOpen, 
  ChevronRight, 
  Youtube, 
  ExternalLink, 
  CheckSquare, 
  Square,
  Zap,
  ArrowLeft,
  Activity
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function LearningMatrix() {
  const { user, tier, setTier } = useApp();
  const navigate = useNavigate();
  const [completed, setCompleted] = useState<string[]>([]);

  if (!user || !user.mustHave) return null;

  // Filter skills not in users hardSkills
  const missingSkills = user.mustHave.filter(skill => 
    !(user?.hardSkills || []).some(s => s.toLowerCase().includes(skill.toLowerCase()))
  );

  const toggleComplete = (skill: string) => {
    setCompleted(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-16">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-neon-accent font-bold text-[11px] uppercase tracking-[0.3em]">
            <BookOpen size={18} /> Learning Plan
          </div>
          <h1 className="text-6xl font-black tracking-tight leading-none uppercase">Learning<br/><span className="text-neon-accent">Guide</span></h1>
          <p className="text-white/40 font-medium max-w-md">Resources to help you master the skills needed for your goals.</p>
        </div>

        <div className="w-full md:w-72 space-y-4 bg-white/[0.02] p-6 rounded-2xl border border-white/5 shadow-xl">
           <div className="flex justify-between items-end">
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Overall Progress</span>
              <span className="text-neon-accent font-black text-xl leading-none">{Math.round((completed.length / missingSkills.length) * 100 || 0)}%</span>
           </div>
           <div className="h-2 bg-white/5 overflow-hidden rounded-full border border-white/5">
              <motion.div 
                className="h-full bg-neon-accent glow-neon-small"
                initial={{ width: 0 }}
                animate={{ width: `${(completed.length / missingSkills.length) * 100}%` }}
              />
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-32">
        {missingSkills.map((skill, i) => (
          <motion.div 
            key={skill}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`card-surface bg-white/[0.03] group border-white/10 hover:border-neon-accent/30 ${completed.includes(skill) ? 'opacity-40 grayscale pointer-events-none' : ''} transition-all duration-500 rounded-[2.5rem] p-10 flex flex-col justify-between min-h-[400px] relative overflow-hidden shadow-2xl`}
          >
            {completed.includes(skill) && (
              <div className="absolute inset-0 bg-neon-accent/5 flex items-center justify-center z-10">
                 <CheckSquare className="text-neon-accent drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]" size={64} />
              </div>
            )}
            
            <div className="space-y-8">
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="text-3xl font-black tracking-tight text-white/90 leading-[0.9]">{skill}</h3>
                </div>
                <button 
                  onClick={() => toggleComplete(skill)}
                  className="text-white/10 hover:text-neon-accent transition-all bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-neon-accent/30 shadow-inner group-hover:scale-110"
                >
                  <Square size={24} />
                </button>
              </div>

              <div className="space-y-4">
                 <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Study Materials</span>
                 <a href="#" className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-neon-accent/30 transition-all font-bold text-xs group/item rounded-2xl shadow-lg">
                    <div className="flex items-center gap-4">
                       <Youtube size={20} className="text-red-500" />
                       <span className="tracking-tight text-white/60 group-hover/item:text-white transition-colors capitalize">Intro to {skill.toLowerCase()} Masterclass</span>
                    </div>
                    <ExternalLink size={16} className="text-white/10 group-hover/item:text-neon-accent transition-all" />
                 </a>
                 <a href="#" className="flex items-center justify-between p-5 bg-white/[0.03] border border-white/10 hover:bg-white/[0.05] hover:border-neon-accent/30 transition-all font-bold text-xs group/item rounded-2xl shadow-lg">
                    <div className="flex items-center gap-4">
                       <BookOpen size={20} className="text-neon-accent" />
                       <span className="tracking-tight text-white/60 group-hover/item:text-white transition-colors capitalize">Documentation Guide</span>
                    </div>
                    <ExternalLink size={16} className="text-white/10 group-hover/item:text-neon-accent transition-all" />
                 </a>
              </div>
            </div>

            <div className="pt-8 mt-8 border-t border-white/5 flex items-center gap-5">
               <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                  <Activity size={18} className="text-white/20" />
               </div>
               <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Score improvement: <span className="text-neon-accent">+12%</span></p>
            </div>
          </motion.div>
        ))}

        {missingSkills.length === 0 && (
          <div className="col-span-full py-32 text-center space-y-12 card-surface border-neon-accent/20 bg-neon-accent/5 rounded-[4rem] shadow-[0_40px_100px_rgba(245,158,11,0.1)]">
            <div className="relative inline-block">
               <div className="absolute inset-0 bg-neon-accent/20 blur-[100px] rounded-full scale-[5]" />
               <Zap className="text-neon-accent relative z-10 drop-shadow-[0_0_20px_rgba(245,158,11,0.5)]" size={80} />
            </div>
            <div className="space-y-4">
               <h2 className="text-6xl font-black tracking-tight leading-none uppercase">You're all<br/><span className="text-neon-accent">set!</span></h2>
               <p className="text-white/40 max-w-md mx-auto font-medium">
                 You’ve learned all the critical skills. Let’s get your resume ready.
               </p>
            </div>
            <button 
              onClick={() => navigate("/resume")}
              className="btn-primary px-16 py-6 rounded-3xl text-sm font-bold tracking-[0.3em] shadow-2xl shadow-neon-accent/20"
            >
               Go to Resume Builder
            </button>
          </div>
        )}
      </div>

      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-12 right-12 left-12 md:left-auto md:right-16 md:w-[450px] z-50"
      >
        <button 
          onClick={() => {
            if (tier === "Silver") {
              navigate("/checkout");
            } else {
              navigate("/resume");
            }
          }}
          className="btn-primary w-full shadow-[0_20px_80px_rgba(245,158,11,0.3)] py-7 rounded-[2rem] group text-sm font-black tracking-widest flex items-center justify-center gap-6"
        >
          {tier === "Silver" ? "UPGRADE TO BUILD RESUME" : "TAILOR MY RESUME"}
          <ChevronRight className="group-hover:translate-x-3 transition-transform" size={24} />
        </button>
      </motion.div>
    </div>
  );
}
