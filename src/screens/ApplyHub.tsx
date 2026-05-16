import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import { 
  Briefcase, 
  ChevronRight, 
  ExternalLink, 
  Layout, 
  Terminal,
  Zap,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Loader2,
  Activity,
  Star,
  ShieldCheck
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface Job {
  id: string;
  company: string;
  role: string;
  score: number;
  status: "APPLY" | "APPLIED" | "INTERVIEWING";
  url: string;
}

const mockJobs: Job[] = [
  { id: "1", company: "TECHCORP", role: "SOFTWARE ENGINEER", score: 94, status: "APPLY", url: "https://example.com/job/1" },
  { id: "2", company: "AISTUDIOS", role: "AI PRODUCT MANAGER", score: 88, status: "APPLY", url: "https://example.com/job/2" },
  { id: "3", company: "NEXUS SYSTEMS", role: "FULLSTACK DEVELOPER", score: 82, status: "APPLIED", url: "https://example.com/job/3" },
  { id: "4", company: "CYBERDYNE", role: "RECRUITER ENGINE", score: 100, status: "INTERVIEWING", url: "https://example.com/job/4" },
];

export default function ApplyHub() {
  const { user, tier } = useApp();
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>(mockJobs);
  const [applying, setApplying] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const handleApply = (id: string) => {
    if (tier !== 'Gold') {
      navigate("/checkout");
      return;
    }
    setApplying(id);
    setTimeout(() => {
      setJobs(prev => prev.map(j => j.id === id ? { ...j, status: "APPLIED" } : j));
      setApplying(null);
    }, 2000);
  };

  const filteredJobs = jobs.filter(j => 
    j.role.toLowerCase().includes(search.toLowerCase()) || 
    j.company.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 lg:p-12 space-y-12 max-w-7xl mx-auto pb-32">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 bg-neon-accent rounded-full animate-ping"></div>
            <h3 className="text-xs font-black uppercase tracking-[0.4em] text-neon-accent">Deployment_Terminal // live</h3>
          </div>
          <h1 className="text-5xl heading-bold italic uppercase">APPLY_HUB<br/><span className="text-neon-accent">TERMINAL</span></h1>
          <p className="label-mono text-white/40 mt-4 italic">"Automated distribution of tailored identity artifacts."</p>
        </div>
        
        {/* Screen 13: Role Discovery Filters */}
        <div className="w-full md:w-96 space-y-4">
           <div className="relative">
              <Terminal className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={16} />
              <input 
                type="text" 
                placeholder="Search Active Roles..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-surface-matte/40 border border-white/5 rounded-xl py-4 pl-12 pr-4 font-mono text-[10px] uppercase tracking-widest focus:border-neon-accent outline-none transition-all placeholder:opacity-20"
              />
           </div>
           <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
              {["All", "Remote", "India", "Contract", "Full-time"].map(f => (
                <button key={f} className="whitespace-nowrap px-3 py-1 bg-white/5 border border-white/5 rounded-full text-[8px] font-mono uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">
                   {f}
                </button>
              ))}
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        {/* Main Feed: Screen 14 Job Pipeline */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
            <h3 className="label-mono text-neon-accent font-bold">Signal_Matched_Opportunities</h3>
            <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{filteredJobs.length} NODES DETECTED</span>
          </div>

          <AnimatePresence>
            {filteredJobs.map((job) => (
              <motion.div 
                key={job.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="card-surface p-8 flex flex-col xl:flex-row items-center justify-between gap-8 group border-white/5 hover:border-neon-accent/20 bg-surface-matte/40 relative overflow-hidden transition-all duration-500"
              >
                {job.status === 'INTERVIEWING' && (
                  <div className="absolute right-0 top-0 w-24 h-24 overflow-hidden pointer-events-none">
                     <div className="absolute top-4 -right-8 w-32 bg-neon-accent text-charcoal font-black text-[8px] uppercase tracking-widest text-center py-1 rotate-45 shadow-xl">PRIORITY</div>
                  </div>
                )}

                <div className="flex items-center gap-8 w-full">
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-3xl text-white/10 group-hover:text-neon-accent group-hover:border-neon-accent/30 transition-all duration-500 italic">
                    {job.company.charAt(0)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                       <span className="text-[10px] uppercase font-bold text-white/30 tracking-[0.3em]">{job.company}</span>
                       <div className="w-1 h-1 rounded-full bg-white/20" />
                       <span className="text-[10px] uppercase font-bold text-white/20 tracking-widest">San Francisco</span>
                    </div>
                    <p className="text-3xl font-black uppercase italic tracking-tighter group-hover:text-white transition-all duration-500 leading-none">{job.role}</p>
                    <div className="flex gap-4">
                       <span className="text-[9px] font-mono text-neon-accent/50 uppercase">Verified Skillset match</span>
                       <span className="text-[9px] font-mono text-white/10 uppercase italic">Ref: {job.id}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-12 w-full xl:w-auto justify-between xl:justify-end">
                  <div className="text-right flex flex-col items-end">
                     <div className="text-4xl font-black italic tracking-tighter text-neon-accent text-glow">{job.score}%</div>
                     <span className="text-[9px] uppercase font-mono tracking-widest text-white/20 uppercase font-bold">Vector_Match</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <a 
                      href={job.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white hover:text-black transition-all group/link"
                    >
                      <ArrowUpRight size={20} className="text-white/20 group-hover/link:text-charcoal" />
                    </a>
                    
                    {job.status === "APPLY" ? (
                      <button 
                        onClick={() => handleApply(job.id)}
                        disabled={!!applying}
                        className="btn-primary py-4 px-8 text-xs flex items-center gap-4 min-w-[200px] justify-center group/apply"
                      >
                        {applying === job.id ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} className="group-hover/apply:animate-pulse" />}
                        <span className="font-black uppercase tracking-[0.2em]">
                          {applying === job.id ? "DISTRIBUTING..." : (tier === 'Gold' ? "1-CLICK APPLY" : "UPGRADE TO APPLY")}
                        </span>
                      </button>
                    ) : (
                      <div className={`px-8 py-4 border rounded-xl text-xs font-black tracking-[0.2em] uppercase flex items-center gap-4 min-w-[200px] justify-center transition-all ${job.status === 'APPLIED' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-neon-accent/10 border-neon-accent/30 text-neon-accent opacity-80'}`}>
                        {job.status === "APPLIED" ? <CheckCircle2 size={16} /> : <Activity size={16} className="animate-pulse" />}
                        {job.status}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Sidebar Status: Screen 14 Spec */}
        <div className="space-y-12">
           <section className="space-y-6">
              <h3 className="label-mono text-neon-accent font-bold">PIPELINE_STATUS</h3>
              <div className="bg-surface-matte/40 border border-white/5 rounded-2xl overflow-hidden divide-y divide-white/5 shadow-2xl">
                <div className="p-8 flex justify-between items-center group hover:bg-white/[0.01] transition-colors">
                   <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono text-white/30 tracking-widest">Total Distributed</span>
                      <p className="text-3xl font-black italic tracking-tighter">12</p>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <ExternalLink size={16} className="text-white/20" />
                   </div>
                </div>
                <div className="p-8 flex justify-between items-center bg-neon-accent/5 group transition-colors">
                   <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono text-neon-accent tracking-widest font-bold">In Interview</span>
                      <p className="text-3xl font-black italic tracking-tighter text-neon-accent">03</p>
                   </div>
                   <div className="p-3 bg-neon-accent/10 rounded-full">
                      <Activity size={16} className="text-neon-accent animate-pulse" />
                   </div>
                </div>
                <div className="p-8 flex justify-between items-center opacity-30">
                   <div className="space-y-1">
                      <span className="text-[10px] uppercase font-mono text-white/30 tracking-widest">Global Offers</span>
                      <p className="text-3xl font-black italic tracking-tighter">00</p>
                   </div>
                   <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
                      <Star size={16} className="text-white/20" />
                   </div>
                </div>
              </div>
           </section>

           <section className="card-surface bg-white/[0.02] p-8 space-y-6">
              <h4 className="label-mono text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">System Intelligence</h4>
              <div className="space-y-4">
                 <div className="flex gap-3">
                    <ShieldCheck size={14} className="text-neon-accent shrink-0" />
                    <p className="text-[9px] font-mono text-white/40 uppercase leading-relaxed font-bold">ATS Formatting: <span className="text-neon-accent">PASSED</span></p>
                 </div>
                 <div className="flex gap-3">
                    <Zap size={14} className="text-neon-accent shrink-0" />
                    <p className="text-[9px] font-mono text-white/40 uppercase leading-relaxed font-bold">Artifact Tailoring: <span className="text-neon-accent">ACTIVE</span></p>
                 </div>
              </div>
              <div className="pt-4 border-t border-white/5">
                 <p className="text-[8px] font-mono text-white/20 uppercase italic tracking-widest">"Optimization cycle complete. Pipeline stable."</p>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}
