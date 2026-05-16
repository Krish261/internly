import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { Brain, Youtube, BookOpen, CheckCircle2, ChevronRight, Play, Cpu, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function UpskillNode() {
  const navigate = useNavigate();
  const [committed, setCommitted] = useState(false);

  return (
    <div className="min-h-screen bg-charcoal p-8 lg:p-20 space-y-16 max-w-6xl mx-auto">
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-neon-accent font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
           <Brain size={14} /> TARGETED_UPSKILLING_NODE
        </div>
        <h1 className="text-5xl font-black italic tracking-tighter uppercase">ACTION_NODE</h1>
        <p className="label-mono text-white/40 italic">"Closing capability gaps via micro-learning intervention."</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Interactive Problem/Solution */}
        <div className="space-y-12">
           <section className="space-y-6">
              <h3 className="label-mono text-white/20 font-bold tracking-widest text-[10px]">KNOWLEDGE_INTERVENTION // Logic Audit</h3>
              <div className="bg-black/40 border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5">
                 <div className="p-8 space-y-4">
                    <span className="text-[9px] font-mono text-burned-coral font-bold uppercase tracking-widest">Identified Inefficiency</span>
                    <pre className="font-mono text-xs text-white/40 bg-white/[0.02] p-6 rounded-xl overflow-x-auto italic">
                       {`const result = data.map(item => {
  return data.filter(d => d.id === item.parentId)
}); // O(n^2) complexity`}
                    </pre>
                 </div>
                 <div className="p-8 space-y-4 bg-neon-accent/5">
                    <span className="text-[9px] font-mono text-neon-accent font-bold uppercase tracking-widest">AI_OPTIMIZED_SOLUTION</span>
                    <pre className="font-mono text-xs text-white/90 p-6 rounded-xl overflow-x-auto font-black">
                       {`const dataMap = new Map(data.map(d => [d.id, d]));
const result = data.map(item => dataMap.get(item.parentId));
// O(n) linear complexity`}
                    </pre>
                 </div>
              </div>
              <button 
                onClick={() => setCommitted(true)}
                className={`w-full py-6 font-black uppercase tracking-[0.4em] text-xs transition-all flex items-center justify-center gap-4 ${committed ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'btn-primary'}`}
              >
                {committed ? <CheckCircle2 size={18} /> : <Cpu size={18} />}
                {committed ? "OPTIMIZATION_COMMITTED" : "ACCEPT_&_COMMIT_FIX"}
              </button>
           </section>
        </div>

        {/* Micro-learning Resources */}
        <div className="space-y-12">
           <section className="space-y-8">
              <h3 className="label-mono text-white/20 font-bold tracking-widest text-[10px]">MICRO_LEARNING_RESOURCES</h3>
              <div className="space-y-4">
                 <div className="card-surface p-10 bg-surface-matte/40 border-white/5 group hover:border-white/20 transition-all cursor-pointer relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-32 h-32 bg-red-500/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-red-500/10 transition-all" />
                    <div className="relative z-10 space-y-6">
                       <div className="w-12 h-12 bg-white/5 border border-white/5 flex items-center justify-center group-hover:bg-red-500/10 group-hover:text-red-500 transition-all">
                          <Youtube size={24} />
                       </div>
                       <div className="space-y-2">
                          <h4 className="text-2xl font-black italic tracking-tighter uppercase uppercase">Time Complexity Deep-Dive</h4>
                          <p className="text-xs font-mono text-white/30 uppercase tracking-widest">Starts at 04:22 • Duration: 3:15</p>
                       </div>
                       <button className="flex items-center gap-2 text-neon-accent font-black text-[10px] uppercase tracking-widest">
                          <Play size={12} fill="currentColor" /> LAUNCH_MODULE
                       </button>
                    </div>
                 </div>

                 <div className="card-surface p-10 bg-surface-matte/40 border-white/5 group hover:border-white/20 transition-all cursor-pointer">
                    <div className="flex justify-between items-center">
                       <div className="flex gap-6 items-center">
                          <div className="w-12 h-12 bg-white/5 border border-white/5 flex items-center justify-center group-hover:text-neon-accent transition-all">
                             <BookOpen size={24} />
                          </div>
                          <div className="space-y-1">
                             <h4 className="text-lg font-black uppercase italic italic">TC39 Efficiency Docs</h4>
                             <p className="text-[10px] font-mono text-white/20 uppercase">Technical Documentation Archive</p>
                          </div>
                       </div>
                       <ChevronRight className="text-white/10 group-hover:text-neon-accent group-hover:translate-x-2 transition-all" />
                    </div>
                 </div>
              </div>
           </section>

           <div className="p-8 border border-neon-accent/10 bg-neon-accent/5 rounded-2xl flex items-center justify-between">
              <div className="flex gap-4 items-center">
                 <div className="w-10 h-10 rounded-full bg-neon-accent/10 flex items-center justify-center">
                    <Zap className="text-neon-accent" size={18} />
                 </div>
                 <p className="text-[10px] font-mono text-white/40 uppercase font-bold italic tracking-widest">Validation Score Impact: <span className="text-neon-accent">+8.5%</span></p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
