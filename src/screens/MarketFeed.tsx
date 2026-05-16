import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { Search, Filter, Zap, Globe, Briefcase, ChevronRight, Loader2, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function MarketFeed() {
  const { tier } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setJobs([
        { id: 1, title: "Senior Product Manager", company: "Cyberdyne Systems", location: "Remote", match: 94, salary: "$160k - $210k" },
        { id: 2, title: "Frontend Engineer (React)", company: "Stark Industries", location: "Neo-Tokyo", match: 88, salary: "$140k - $180k" },
        { id: 3, title: "Growth Marketing Lead", company: "Wayne Ent.", location: "Gotham", match: 82, salary: "$130k - $170k" },
        { id: 4, title: "UX Design Lead", company: "Umbrella Corp", location: "Raccoon City", match: 79, salary: "$150k - $190k" },
        { id: 5, title: "Backend Systems Architect", company: "Tyrell Corp", location: "Off-World", match: 91, salary: "$200k - $250k" },
      ]);
      setLoading(false);
    }, 1500);
  }, []);

  return (
    <div className="min-h-screen bg-charcoal p-8 lg:p-12 space-y-12">
      <header className="flex justify-between items-end max-w-7xl mx-auto">
        <div className="space-y-4">
           <h1 className="text-5xl font-black italic tracking-tighter uppercase">MARKET_SCRAPE</h1>
           <p className="label-mono opacity-40 italic">"Global job nodes synchronized in real-time..."</p>
        </div>
        <div className="flex gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-hover:text-neon-accent transition-colors" size={18} />
              <input 
                placeholder="Query Terminal..."
                className="bg-white/5 border border-white/5 rounded-xl py-4 pl-12 pr-6 text-[10px] font-mono focus:border-neon-accent outline-none w-64 transition-all"
              />
           </div>
           <button className="btn-secondary px-6">
              <Filter size={18} />
           </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Market Stats Sidebar */}
        <div className="space-y-8">
           <div className="card-surface p-8 bg-surface-matte/40 space-y-6">
              <h3 className="label-mono uppercase tracking-widest text-[10px] font-bold">Market_Dynamics</h3>
              <div className="space-y-4">
                 {[
                   { label: "Active Nodes", val: "14,842", trend: "+12%" },
                   { label: "Avg. Salary Index", val: "$142k", trend: "+2.4%" },
                   { label: "High-Demand Node", val: "ML_ENGINEER", trend: "CRITICAL" }
                 ].map(stat => (
                   <div key={stat.label} className="flex justify-between items-baseline border-b border-white/5 pb-2">
                      <span className="text-[9px] font-mono text-white/30 uppercase">{stat.label}</span>
                      <div className="text-right">
                         <div className="text-xs font-black italic">{stat.val}</div>
                         <div className="text-[8px] font-mono text-neon-accent">{stat.trend}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="card-surface p-8 border-neon-accent/20 bg-neon-accent/5">
              <h3 className="label-mono text-neon-accent font-bold mb-4">AI_SUGGESTION</h3>
              <p className="text-[10px] font-mono text-white/40 leading-relaxed italic">"Based on your 92% assessment score in React, Cyberdyne Systems is a priority deployment node."</p>
           </div>
        </div>

        {/* Job List */}
        <div className="lg:col-span-3 space-y-4">
           {loading ? (
             <div className="flex flex-col items-center justify-center py-40 gap-6">
                <Loader2 className="animate-spin text-neon-accent" size={48} />
                <p className="label-mono animate-pulse">Synchronizing Market Data...</p>
             </div>
           ) : (
             <div className="space-y-4">
               {jobs.map(job => (
                 <motion.div 
                   key={job.id}
                   initial={{ opacity: 0, y: 10 }}
                   animate={{ opacity: 1, y: 0 }}
                   onClick={() => navigate("/deconstruct")}
                   className="card-surface p-8 bg-surface-matte/40 flex justify-between items-center group cursor-pointer transition-all hover:bg-white/[0.02]"
                 >
                   <div className="flex items-center gap-8">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 group-hover:bg-neon-accent/10 group-hover:text-neon-accent transition-all group-hover:border-neon-accent/20">
                         <Briefcase size={28} />
                      </div>
                      <div className="space-y-2">
                         <div className="flex items-center gap-3">
                            <h3 className="text-2xl font-black italic tracking-tighter uppercase group-hover:text-neon-accent transition-colors">{job.title}</h3>
                            <div className="px-2 py-0.5 bg-neon-accent/10 border border-neon-accent/20 text-[8px] font-mono text-neon-accent rounded">
                               {job.match}% MATCH
                            </div>
                         </div>
                         <div className="flex gap-6 text-[10px] font-mono text-white/30 uppercase tracking-widest">
                            <span className="flex items-center gap-2"><Globe size={12} /> {job.company}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                            <span>•</span>
                            <span className="text-white/60">{job.salary}</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-6">
                      <div className="text-right hidden md:block">
                         <p className="text-[9px] font-mono text-white/20 uppercase">DECONSTRUCTION_READY</p>
                         <p className="text-[10px] font-mono text-neon-accent font-bold">1-TAP_PARSE</p>
                      </div>
                      <button className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:border-neon-accent group-hover:bg-neon-accent group-hover:text-charcoal transition-all">
                         <ChevronRight size={24} />
                      </button>
                   </div>
                 </motion.div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
