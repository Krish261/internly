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
    <div className="min-h-screen bg-charcoal p-8 lg:p-12 space-y-16 max-w-7xl mx-auto pb-48">
      <header className="flex justify-between items-end border-b border-white/10 pb-12">
        <div className="space-y-6">
           <div className="flex items-center gap-3 text-neon-accent font-bold text-[10px] uppercase tracking-[0.4em]">
              <div className="w-8 h-8 rounded-lg bg-neon-accent/10 flex items-center justify-center border border-neon-accent/20">
                <ShieldCheck size={16} />
              </div>
              Verified Library
           </div>
           <h1 className="text-6xl font-black tracking-tight leading-none uppercase">Portfolio<br/><span className="text-neon-accent">Highlights</span></h1>
           <p className="text-white/40 font-medium italic">Choose the best projects to include in your next application.</p>
        </div>
        <div className="hidden md:block">
           <div className="text-right space-y-4">
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Library Capacity</p>
              <div className="w-56 h-3 bg-white/5 rounded-full overflow-hidden shadow-inner border border-white/5">
                 <div className="w-2/3 h-full bg-neon-accent shadow-[0_0_20px_rgba(0,255,204,0.3)]" />
              </div>
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
         {projects.map(proj => (
           <motion.div 
             key={proj.id}
             onClick={() => toggleSelect(proj.id)}
             whileHover={{ y: -8 }}
             className={`card-surface p-10 cursor-pointer transition-all duration-300 relative overflow-hidden group rounded-[2.5rem] shadow-xl ${selected.includes(proj.id) ? 'border-neon-accent bg-neon-accent/[0.03] ring-1 ring-neon-accent/30' : 'bg-white/[0.02] border-white/5 hover:border-white/20'}`}
           >
              {selected.includes(proj.id) && (
                <div className="absolute top-6 right-6">
                   <div className="w-10 h-10 bg-neon-accent text-charcoal rounded-2xl flex items-center justify-center shadow-xl shadow-neon-accent/20">
                      <CheckCircle2 size={24} strokeWidth={3} />
                   </div>
                </div>
              )}

              <div className="space-y-10">
                 <div className="space-y-4">
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">{proj.type}</span>
                    <h3 className="text-3xl font-black tracking-tight uppercase leading-none group-hover:text-neon-accent transition-colors">{proj.title}</h3>
                 </div>

                 <div className="space-y-3">
                    <p className="text-[10px] font-bold text-neon-accent uppercase tracking-widest">Presentation Quality</p>
                    <div className="flex items-baseline gap-2">
                       <p className="text-4xl font-black tracking-tighter">{proj.score}%</p>
                       <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full bg-neon-accent w-[${proj.score}%]`} />
                       </div>
                    </div>
                 </div>

                 <div className="pt-8 border-t border-white/5 flex justify-between items-center text-[10px] font-bold text-white/10 uppercase tracking-widest group-hover:text-white/20 transition-all">
                    <span>Added {proj.date}</span>
                    <ExternalLink size={18} className="group-hover:text-neon-accent transition-all" />
                 </div>
              </div>
           </motion.div>
         ))}

         {/* Empty State / Add Project */}
         <div onClick={() => navigate("/portfolio")} className="card-surface p-10 border-2 border-dashed border-white/10 bg-transparent flex flex-col items-center justify-center text-center gap-8 opacity-40 hover:opacity-100 hover:border-neon-accent/30 transition-all cursor-pointer rounded-[2.5rem] group">
            <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:bg-neon-accent/10 group-hover:border-neon-accent/30 transition-all">
               <Zap size={32} className="text-white/40 group-hover:text-neon-accent transition-all" />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.4em]">Add New Project</p>
         </div>
      </div>

      {/* Floating Action Menu for Selected Artifacts */}
      {selected.length > 0 && (
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 w-full max-w-3xl px-8 z-50"
        >
          <div className="bg-charcoal/80 p-10 border border-neon-accent/30 shadow-[0_50px_100px_rgba(0,0,0,0.6)] rounded-[3rem] flex items-center gap-12 backdrop-blur-2xl">
             <div className="flex-1 space-y-2">
                <p className="text-sm font-black text-neon-accent uppercase tracking-[0.2em]">{selected.length} Projects Selected</p>
                <p className="text-xs font-medium text-white/40">Ready to include in your next application</p>
             </div>
             <button onClick={() => navigate("/apply")} className="btn-primary px-12 py-6 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-4 shadow-xl shadow-neon-accent/20 transition-all hover:scale-105 active:scale-95">
                <Paperclip size={20} className="fill-current" /> Include in Application
             </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}
