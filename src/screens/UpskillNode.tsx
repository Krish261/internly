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
      <header className="space-y-6">
        <div className="flex items-center gap-3 text-neon-accent font-bold text-[11px] uppercase tracking-[0.3em]">
           <Brain size={18} /> Targeted Learning
        </div>
        <h1 className="text-6xl font-black tracking-tight leading-tight uppercase">Action<br/><span className="text-neon-accent">Plan</span></h1>
        <p className="text-white/40 font-medium max-w-md">Learn key concepts through focused skill building and real-world improvements.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Interactive Problem/Solution */}
        <div className="space-y-12">
           <section className="space-y-8">
              <h3 className="text-xs font-bold text-white/20 tracking-[0.4em] uppercase">Code Improvement</h3>
              <div className="bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden divide-y divide-white/5 shadow-2xl">
                 <div className="p-10 space-y-6">
                    <span className="text-[10px] font-bold text-burned-coral uppercase tracking-widest bg-burned-coral/10 px-3 py-1 rounded-full border border-burned-coral/20">Old Way</span>
                    <pre className="font-mono text-sm text-white/40 bg-white/[0.01] p-8 rounded-2xl overflow-x-auto leading-relaxed border border-white/5">
                       {`const result = data.map(item => {
  return data.filter(d => d.id === item.parentId)
}); // Very slow`}
                    </pre>
                 </div>
                 <div className="p-10 space-y-6 bg-neon-accent/[0.03]">
                    <span className="text-[10px] font-bold text-neon-accent uppercase tracking-widest bg-neon-accent/10 px-3 py-1 rounded-full border border-neon-accent/20">Better Way</span>
                    <pre className="font-mono text-sm text-white/90 bg-white/[0.05] p-8 rounded-2xl overflow-x-auto font-bold leading-relaxed border border-neon-accent/10 shadow-lg">
                       {`const dataMap = new Map(data.map(d => [d.id, d]));
const result = data.map(item => dataMap.get(item.parentId));
// Much faster`}
                    </pre>
                 </div>
              </div>
              <button 
                onClick={() => setCommitted(true)}
                className={`w-full py-6 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 flex items-center justify-center gap-4 shadow-xl ${committed ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'btn-primary'}`}
              >
                {committed ? <CheckCircle2 size={24} /> : <Cpu size={24} />}
                {committed ? "APPLIED" : "APPLY IMPROVEMENT"}
              </button>
           </section>
        </div>

        {/* Learning Resources */}
        <div className="space-y-12">
           <section className="space-y-10">
              <h3 className="text-xs font-bold text-white/20 tracking-[0.4em] uppercase">Learning Resources</h3>
              <div className="space-y-5">
                 <div className="card-surface p-12 bg-white/[0.02] border-white/10 group hover:border-neon-accent/30 hover:bg-white/[0.05] transition-all duration-300 cursor-pointer relative overflow-hidden rounded-[2.5rem] shadow-xl">
                    <div className="absolute right-0 top-0 w-48 h-48 bg-neon-accent/5 -mr-24 -mt-24 rounded-full blur-[80px] group-hover:bg-neon-accent/10 transition-all" />
                    <div className="relative z-10 space-y-8">
                       <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:bg-neon-accent/10 group-hover:text-neon-accent transition-all">
                          <Youtube size={32} />
                       </div>
                       <div className="space-y-3">
                          <h4 className="text-3xl font-black tracking-tight leading-tight">Time Complexity Deep-Dive</h4>
                          <p className="text-xs font-bold text-white/20 uppercase tracking-widest">3:15 Module • Starts at 04:22</p>
                       </div>
                       <button className="flex items-center gap-3 text-neon-accent font-black text-xs uppercase tracking-[0.2em] group-hover:translate-x-2 transition-transform">
                          <Play size={16} fill="currentColor" /> Open Lesson
                       </button>
                    </div>
                 </div>

                 <div className="card-surface p-10 bg-white/[0.01] border-white/5 hover:border-white/20 group transition-all duration-300 cursor-pointer rounded-3xl shadow-lg">
                    <div className="flex justify-between items-center">
                       <div className="flex gap-8 items-center">
                          <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center group-hover:text-neon-accent transition-all">
                             <BookOpen size={28} />
                          </div>
                          <div className="space-y-1">
                             <h4 className="text-xl font-black tracking-tight">Efficiency Guide</h4>
                             <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Documentation</p>
                          </div>
                       </div>
                       <ChevronRight className="text-white/10 group-hover:text-neon-accent group-hover:translate-x-2 transition-all" size={24} />
                    </div>
                 </div>
              </div>
           </section>

           <div className="p-8 border border-neon-accent/10 bg-neon-accent/5 rounded-[2rem] flex items-center justify-between shadow-lg shadow-neon-accent/5">
              <div className="flex gap-6 items-center">
                 <div className="w-12 h-12 rounded-2xl bg-neon-accent/10 flex items-center justify-center shadow-neon-accent/10 shadow-inner">
                    <Zap className="text-neon-accent" size={24} />
                 </div>
                 <p className="text-xs font-bold text-white/40 uppercase tracking-[0.2em]">Score Increase: <span className="text-neon-accent text-lg ml-2">+8.5%</span></p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
