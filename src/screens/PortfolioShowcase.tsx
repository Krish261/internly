import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { ShieldCheck, Layers, CheckCircle2, ChevronRight, Search, Zap, ExternalLink, Paperclip } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PortfolioShowcase() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<number[]>([]);

  const projects = [
    { id: 1, title: "Neural Dashboard V2", score: 98, type: "Design Artifact", date: "48H AGO" },
    { id: 2, title: "Kernel Optimization", score: 92, type: "Code Implementation", date: "12D AGO" },
    { id: 3, title: "Growth Strategy 2024", score: 87, type: "Case Study", date: "1M AGO" },
    { id: 4, title: "UI Components Library", score: 95, type: "System Architecture", date: "1W AGO" }
  ];

  const toggleSelect = (id: number) => {
    setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="min-h-screen bg-charcoal p-8 lg:p-12 space-y-12 max-w-7xl mx-auto pb-40">
      <header className="flex justify-between items-end">
        <div className="space-y-4">
           <div className="flex items-center gap-2 text-neon-accent font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
              <ShieldCheck size={14} /> AI_POLISHED_VAULT // v4.2
           </div>
           <h1 className="text-5xl font-black italic tracking-tighter uppercase">SHOWCASE_VAULT</h1>
           <p className="label-mono text-white/40 italic">"Organizing verified collateral for application injection."</p>
        </div>
        <div className="hidden md:block">
           <div className="text-right">
              <p className="text-[10px] font-mono text-white/20 uppercase tracking-widest">Vault_Capacity</p>
              <div className="w-48 h-1 bg-white/5 rounded-full mt-2 overflow-hidden">
                 <div className="w-2/3 h-full bg-neon-accent" />
              </div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
         {projects.map(proj => (
           <motion.div 
             key={proj.id}
             onClick={() => toggleSelect(proj.id)}
             className={`card-surface p-8 cursor-pointer transition-all relative overflow-hidden group ${selected.includes(proj.id) ? 'border-neon-accent bg-neon-accent/5 ring-1 ring-neon-accent/30' : 'bg-surface-matte/40 border-white/5 hover:border-white/20'}`}
           >
              {selected.includes(proj.id) && (
                <div className="absolute top-4 right-4">
                   <div className="w-6 h-6 bg-neon-accent text-charcoal rounded-full flex items-center justify-center shadow-glow">
                      <CheckCircle2 size={16} />
                   </div>
                </div>
              )}

              <div className="space-y-8">
                 <div className="space-y-2">
                    <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{proj.type}</span>
                    <h3 className="text-2xl font-black italic tracking-tighter uppercase leading-none group-hover:text-neon-accent transition-colors">{proj.title}</h3>
                 </div>

                 <div className="space-y-1">
                    <p className="text-[9px] font-mono text-neon-accent font-bold tracking-widest">AI_POLISH_SCORE</p>
                    <p className="text-3xl font-black italic tracking-tighter">{proj.score}%</p>
                 </div>

                 <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                    <span className="text-[8px] font-mono text-white/10 uppercase font-black">{proj.date}</span>
                    <ExternalLink size={14} className="text-white/5 group-hover:text-white transition-all" />
                 </div>
              </div>
           </motion.div>
         ))}

         {/* Empty State / Add Node */}
         <div onClick={() => navigate("/portfolio")} className="card-surface p-8 border-2 border-dashed border-white/5 bg-transparent flex flex-col items-center justify-center text-center gap-6 opacity-40 hover:opacity-100 hover:border-neon-accent/30 transition-all cursor-pointer">
            <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
               <Zap size={24} />
            </div>
            <p className="label-mono uppercase tracking-[0.2em] font-bold text-[10px]">Inject New_Node</p>
         </div>
      </div>

      {/* Floating Action Menu for Selected Artifacts */}
      {selected.length > 0 && (
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl px-6 z-50"
        >
          <div className="bg-charcoal px-10 py-6 border border-neon-accent/40 shadow-[0_0_50px_rgba(0,255,204,0.2)] rounded-3xl flex justify-between items-center backdrop-blur-xl">
             <div className="space-y-1">
                <p className="text-[10px] font-mono font-black text-neon-accent uppercase tracking-widest">{selected.length} Artifacts Selected</p>
                <p className="text-[8px] font-mono text-white/40 uppercase">Ready for Deployment Injection</p>
             </div>
             <button onClick={() => navigate("/apply")} className="btn-primary px-10 py-4 text-[10px] flex items-center gap-4">
                <Paperclip size={16} /> ATTACH_TO_PIPELINE
             </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
