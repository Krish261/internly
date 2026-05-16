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
    <div className="min-h-screen bg-charcoal p-8 lg:p-12 space-y-16">
      <header className="flex justify-between items-end max-w-7xl mx-auto">
        <div className="space-y-4">
           <h1 className="text-6xl font-black tracking-tight leading-none uppercase">Opportunity<br/><span className="text-neon-accent">Feed</span></h1>
           <p className="text-white/40 font-medium max-w-md">Discovery top roles perfectly aligned with your expertise and career goals.</p>
        </div>
        <div className="flex gap-4">
           <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-accent transition-colors" size={20} />
              <input 
                placeholder="Search roles..."
                className="bg-white/[0.04] border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm font-medium focus:border-neon-accent focus:bg-white/[0.06] outline-none w-72 transition-all shadow-inner placeholder:text-white/10"
              />
           </div>
           <button className="bg-white/[0.04] p-4 rounded-2xl border border-white/10 hover:bg-white/[0.08] transition-all">
              <Filter size={20} className="text-white/40" />
           </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Market Stats Sidebar */}
        <div className="space-y-8">
           <div className="card-surface p-8 bg-white/[0.02] border-white/5 rounded-3xl space-y-8 shadow-xl">
              <h3 className="text-[10px] uppercase font-bold tracking-[0.3em] text-white/30">Market Insights</h3>
              <div className="space-y-6">
                 {[
                   { label: "Active Roles", val: "14,842", trend: "+12%" },
                   { label: "Salary Average", val: "$142k", trend: "+2.4%" },
                   { label: "Hot Skill", val: "React", trend: "HIGH DEMAND" }
                 ].map(stat => (
                   <div key={stat.label} className="flex justify-between items-end border-b border-white/5 pb-4 last:border-0 transition-all hover:translate-x-1">
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{stat.label}</span>
                      <div className="text-right">
                         <div className="text-xl font-black tracking-tight">{stat.val}</div>
                         <div className="text-[10px] font-bold text-neon-accent tracking-widest uppercase">{stat.trend}</div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="p-8 bg-neon-accent/5 border border-neon-accent/10 rounded-3xl space-y-4 shadow-lg shadow-neon-accent/5">
              <div className="flex items-center gap-3">
                 <Zap className="text-neon-accent" size={20} />
                 <h3 className="text-[10px] font-black tracking-[0.2em] text-neon-accent uppercase">Personal Match</h3>
              </div>
              <p className="text-sm font-medium text-white/50 leading-relaxed">Based on your recent assessment, <span className="text-white font-bold">Cyberdyne Systems</span> matches your skill profile perfectly.</p>
           </div>
        </div>

        {/* Job List */}
        <div className="lg:col-span-3 space-y-6">
           {loading ? (
             <div className="flex flex-col items-center justify-center py-48 gap-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-neon-accent/10 rounded-full blur-[40px] animate-pulse" />
                  <Loader2 className="animate-spin text-neon-accent relative z-10" size={56} />
                </div>
                <p className="text-xs font-bold uppercase tracking-[0.4em] text-white/20 animate-pulse">Syncing Feed...</p>
             </div>
           ) : (
             <div className="space-y-5">
               {jobs.map(job => (
                 <motion.div 
                   key={job.id}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   onClick={() => navigate("/deconstruct")}
                   className="card-surface p-8 bg-white/[0.03] border-white/10 hover:border-neon-accent/30 hover:bg-white/[0.05] rounded-[2rem] flex justify-between items-center group cursor-pointer transition-all duration-300 shadow-xl"
                 >
                   <div className="flex items-center gap-10">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:bg-neon-accent/10 group-hover:text-neon-accent transition-all group-hover:border-neon-accent/30">
                         <Briefcase size={32} />
                      </div>
                      <div className="space-y-3">
                         <div className="flex items-center gap-4">
                            <h3 className="text-2xl font-black tracking-tight group-hover:text-neon-accent transition-colors">{job.title}</h3>
                            <div className="px-3 py-1 bg-neon-accent/10 border border-neon-accent/20 text-[10px] font-black text-neon-accent rounded-full tracking-wider">
                               {job.match}% MATCH
                            </div>
                         </div>
                         <div className="flex gap-6 text-[11px] font-bold text-white/30 uppercase tracking-widest items-center">
                            <span className="flex items-center gap-2 transition-colors group-hover:text-white/50"><Globe size={14} /> {job.company}</span>
                            <span className="w-1 h-1 bg-white/10 rounded-full" />
                            <span className="transition-colors group-hover:text-white/50">{job.location}</span>
                            <span className="w-1 h-1 bg-white/10 rounded-full" />
                            <span className="text-neon-accent font-black">{job.salary}</span>
                         </div>
                      </div>
                   </div>
                   <div className="flex items-center gap-8">
                      <div className="text-right hidden md:block space-y-1">
                         <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest group-hover:text-white/30 transition-colors">Perfect Match</p>
                         <p className="text-xs font-black text-neon-accent uppercase tracking-widest drop-shadow-sm">Analyze Role</p>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-neon-accent group-hover:bg-neon-accent group-hover:text-charcoal transition-all shadow-lg group-hover:shadow-neon-accent/20">
                         <ChevronRight size={28} />
                      </div>
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
