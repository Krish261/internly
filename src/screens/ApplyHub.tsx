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
  ShieldCheck,
  Search
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
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-neon-accent rounded-full animate-pulse shadow-[0_0_8px_rgba(245,158,11,0.5)]"></div>
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-neon-accent">Opportunity Updates</h3>
          </div>
          <h1 className="text-6xl font-black tracking-tight leading-[0.9]">Opportunity<br/><span className="text-neon-accent">Hub</span></h1>
          <p className="text-white/40 font-medium max-w-md">Browse and apply to roles that match your verified skill set perfectly.</p>
        </div>
        
        <div className="w-full md:w-96 space-y-4">
           <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text" 
                placeholder="Search by role or company..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4.5 pl-14 pr-5 font-medium text-sm focus:border-neon-accent focus:bg-white/10 outline-none transition-all placeholder:text-white/20"
              />
           </div>
           <div className="flex gap-2 overflow-x-auto pb-2 custom-scrollbar no-scrollbar">
              {["All Roles", "Remote", "India", "Contract", "Full-time"].map(f => (
                <button key={f} className="whitespace-nowrap px-5 py-2 bg-white/5 border border-white/5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/40 hover:text-white hover:bg-white/10 transition-all">
                   {f}
                </button>
              ))}
           </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-6">
            <h3 className="text-xs font-bold text-white/60 tracking-widest uppercase">Personalized Feed</h3>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{filteredJobs.length} matches found</span>
          </div>

          <AnimatePresence>
            {filteredJobs.map((job, idx) => (
              <motion.div 
                key={job.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="card-surface p-8 flex flex-col xl:flex-row items-center justify-between gap-8 group hover:bg-neon-accent/[0.03] hover:border-neon-accent/20 transition-all duration-500 relative overflow-hidden"
              >
                {job.status === 'INTERVIEWING' && (
                  <div className="absolute right-0 top-0 w-24 h-24 overflow-hidden pointer-events-none">
                     <div className="absolute top-4 -right-8 w-32 bg-neon-accent text-charcoal font-black text-[9px] uppercase tracking-widest text-center py-1.5 rotate-45 shadow-xl">PRIORITY</div>
                  </div>
                )}

                <div className="flex items-center gap-8 w-full">
                  <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center font-black text-4xl text-white/10 group-hover:bg-neon-accent/10 group-hover:text-neon-accent group-hover:border-neon-accent/30 transition-all duration-500">
                    {job.company.charAt(0)}
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                       <span className="text-[11px] uppercase font-bold text-neon-accent tracking-widest">{job.company}</span>
                       <div className="w-1 h-1 rounded-full bg-white/20" />
                       <span className="text-[11px] uppercase font-bold text-white/20 tracking-widest">San Francisco</span>
                    </div>
                    <p className="text-3xl font-black tracking-tight group-hover:text-white transition-all duration-500 leading-none">{job.role}</p>
                    <div className="flex gap-4">
                       <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest group-hover:text-white/60 transition-colors">Verified Skills Match</span>
                       <span className="text-[10px] font-bold text-white/10 uppercase tracking-widest">#{job.id}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-12 w-full xl:w-auto justify-between xl:justify-end">
                  <div className="text-right flex flex-col items-end">
                     <div className="text-4xl font-black tracking-tighter text-neon-accent text-glow">{job.score}%</div>
                     <span className="text-[10px] uppercase tracking-[0.2em] text-white/20 font-bold">MATCH SCORE</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <a 
                      href={job.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white hover:text-black transition-all group/link"
                    >
                      <ArrowUpRight size={22} className="text-white/40 group-hover/link:text-charcoal" />
                    </a>
                    
                    {job.status === "APPLY" ? (
                      <button 
                        onClick={() => handleApply(job.id)}
                        disabled={!!applying}
                        className="btn-primary py-4 px-10 rounded-2xl text-xs flex items-center gap-4 min-w-[220px] justify-center group/apply shadow-xl"
                      >
                        {applying === job.id ? <Loader2 className="animate-spin" size={16} /> : <Zap size={16} className="group-hover/apply:scale-125 transition-transform" />}
                        <span className="font-bold tracking-widest">
                          {applying === job.id ? "SUBMITTING..." : (tier === 'Gold' ? "INSTANT APPLY" : "UPGRADE TO APPLY")}
                        </span>
                      </button>
                    ) : (
                      <div className={`px-10 py-4 border rounded-2xl text-xs font-bold tracking-widest uppercase flex items-center gap-4 min-w-[220px] justify-center transition-all ${job.status === 'APPLIED' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-neon-accent/10 border-neon-accent/30 text-neon-accent opacity-80 shadow-lg shadow-neon-accent/10'}`}>
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

        <div className="space-y-12">
           <section className="space-y-6">
              <h3 className="text-xs font-bold text-white/40 tracking-[0.3em] uppercase">Your Progress</h3>
              <div className="bg-white/[0.03] border border-white/10 rounded-3xl overflow-hidden divide-y divide-white/5 shadow-2xl">
                <div className="p-8 flex justify-between items-center group hover:bg-white/[0.01] transition-colors cursor-pointer">
                   <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Total Sent</span>
                      <p className="text-4xl font-black tracking-tight">12</p>
                   </div>
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <ExternalLink size={20} className="text-white/30" />
                   </div>
                </div>
                <div className="p-8 flex justify-between items-center bg-neon-accent/[0.06] group transition-colors cursor-pointer">
                   <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-neon-accent tracking-widest">In Interview</span>
                      <p className="text-4xl font-black tracking-tight text-neon-accent text-glow">03</p>
                   </div>
                   <div className="p-4 bg-neon-accent/20 rounded-2xl group-hover:scale-110 transition-all">
                      <Activity size={20} className="text-neon-accent animate-pulse" />
                   </div>
                </div>
                <div className="p-8 flex justify-between items-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer">
                   <div className="space-y-1">
                      <span className="text-[10px] uppercase font-bold text-white/30 tracking-widest">Offers Received</span>
                      <p className="text-4xl font-black tracking-tight">00</p>
                   </div>
                   <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center">
                      <Star size={20} className="text-white/30" />
                   </div>
                </div>
              </div>
           </section>

           <section className="card-surface bg-white/[0.01] p-8 space-y-6 border-white/10 rounded-3xl">
              <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Smart Analysis</h4>
              <div className="space-y-5">
                 <div className="flex gap-4 items-center">
                    <div className="p-2 bg-neon-accent/10 rounded-lg">
                      <ShieldCheck size={16} className="text-neon-accent" />
                    </div>
                    <p className="text-[11px] font-bold text-white/60 uppercase tracking-wide">Recruiter Check: <span className="text-neon-accent">Passed</span></p>
                 </div>
                 <div className="flex gap-4 items-center">
                    <div className="p-2 bg-neon-accent/10 rounded-lg">
                      <Zap size={16} className="text-neon-accent" />
                    </div>
                    <p className="text-[11px] font-bold text-white/60 uppercase tracking-wide">Skill Matching: <span className="text-neon-accent">Active</span></p>
                 </div>
              </div>
              <div className="pt-6 border-t border-white/5">
                 <p className="text-[10px] font-medium text-white/20 italic leading-relaxed">"We have optimized your profile for these roles."</p>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}
