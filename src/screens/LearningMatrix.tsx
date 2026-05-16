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
    !user.hardSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
  );

  const toggleComplete = (skill: string) => {
    setCompleted(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <div className="flex items-center gap-2 text-neon-accent mb-4">
            <BookOpen size={16} />
            <span className="label-mono italic font-bold tracking-widest uppercase">BRIDGE_THE_GAP_TERMINAL</span>
          </div>
          <h1 className="text-5xl heading-bold italic uppercase">LEARNING<br/><span className="text-neon-accent">MATRIX</span></h1>
          <p className="label-mono text-white/40 mt-4 italic">"Curated intelligence nodes for capability alignment."</p>
        </div>

        <div className="w-full md:w-64 space-y-3">
           <div className="flex justify-between items-end">
              <span className="label-mono text-[10px] text-white/40">Progression_Flow</span>
              <span className="text-neon-accent font-black text-xs italic">{Math.round((completed.length / missingSkills.length) * 100 || 0)}%</span>
           </div>
           <div className="h-1 bg-white/5 overflow-hidden rounded-full">
              <motion.div 
                className="h-full bg-neon-accent shadow-[0_0_15px_rgba(0,255,204,0.5)]"
                initial={{ width: 0 }}
                animate={{ width: `${(completed.length / missingSkills.length) * 100}%` }}
              />
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-32">
        {missingSkills.map((skill, i) => (
          <motion.div 
            key={skill}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className={`card-surface bg-surface-matte/40 group border-white/5 hover:border-white/10 ${completed.includes(skill) ? 'opacity-40 grayscale pointer-events-none' : ''} transition-all duration-500 rounded-2xl p-8 flex flex-col justify-between min-h-[350px] relative overflow-hidden`}
          >
            {completed.includes(skill) && (
              <div className="absolute inset-0 bg-neon-accent/5 flex items-center justify-center z-10">
                 <CheckSquare className="text-neon-accent" size={48} />
              </div>
            )}
            
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <h4 className="label-mono text-[9px] text-white/30 uppercase tracking-[0.3em]">Node_0{i+1}</h4>
                  <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white/90">{skill}</h3>
                </div>
                <button 
                  onClick={() => toggleComplete(skill)}
                  className="text-white/10 hover:text-neon-accent transition-all bg-white/5 p-3 rounded-xl border border-white/5 hover:border-neon-accent/30"
                >
                  <Square size={20} />
                </button>
              </div>

              <div className="space-y-3">
                 <span className="label-mono text-[8px] text-white/20 uppercase tracking-widest">Resource Matrix</span>
                 <a href="#" className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 hover:border-neon-accent/30 transition-all font-mono text-[10px] group/item rounded-xl">
                    <div className="flex items-center gap-4">
                       <Youtube size={16} className="text-red-500" />
                       <span className="font-bold tracking-tight uppercase group-hover/item:text-white transition-colors">Intro to {skill} Masterclass</span>
                    </div>
                    <ExternalLink size={12} className="text-white/10 group-hover/item:text-neon-accent transition-all" />
                 </a>
                 <a href="#" className="flex items-center justify-between p-4 bg-white/[0.03] border border-white/5 hover:border-neon-accent/30 transition-all font-mono text-[10px] group/item rounded-xl">
                    <div className="flex items-center gap-4">
                       <BookOpen size={16} className="text-neon-accent" />
                       <span className="font-bold tracking-tight uppercase group-hover/item:text-white transition-colors">Documentation Guide</span>
                    </div>
                    <ExternalLink size={12} className="text-white/10 group-hover/item:text-neon-accent transition-all" />
                 </a>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-4">
               <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center">
                  <Activity size={14} className="text-white/20" />
               </div>
               <p className="text-[9px] font-mono text-white/20 uppercase italic">Estimated Validation Impact: +12%</p>
            </div>
          </motion.div>
        ))}

        {missingSkills.length === 0 && (
          <div className="col-span-full py-32 text-center space-y-10 card-surface border-neon-accent/20 bg-neon-accent/5">
            <div className="relative inline-block">
               <div className="absolute inset-0 bg-neon-accent/20 blur-3xl rounded-full scale-[3]" />
               <Zap className="text-neon-accent relative z-10" size={64} />
            </div>
            <div className="space-y-4">
               <h2 className="text-4xl font-black uppercase italic tracking-tighter">PROTOCOLS ALIGNED</h2>
               <p className="text-white/40 max-w-md mx-auto label-mono">
                 You possess 100% of the critical capabilities required for deployment. Resume optimization authorized.
               </p>
            </div>
            <button 
              onClick={() => navigate("/resume")}
              className="btn-primary px-12 py-5 text-sm tracking-[0.4em]"
            >
               LAUNCH_RESUME_BUILDER
            </button>
          </div>
        )}
      </div>

      <motion.div 
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-10 right-10 left-10 md:left-auto md:right-12 md:w-96 z-50"
      >
        <button 
          onClick={() => {
            if (tier === "Silver") {
              navigate("/checkout");
            } else {
              navigate("/resume");
            }
          }}
          className="btn-primary w-full shadow-[0_0_50px_rgba(0,255,204,0.3)] py-6 group text-sm tracking-[0.3em] flex items-center justify-center gap-4"
        >
          {tier === "Silver" ? "UPGRADE TO BUILD RESUME" : "EXECUTE RESUME TAILORING"}
          <ChevronRight className="group-hover:translate-x-2 transition-transform" size={20} />
        </button>
      </motion.div>
    </div>
  );
}
