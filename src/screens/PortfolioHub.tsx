import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { Figma, Github, Globe, Link as LinkIcon, Plus, ExternalLink, Zap, RefreshCw, Layers } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PortfolioHub() {
  const { tier } = useApp();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [syncing, setSyncing] = useState(false);
  const [projects, setProjects] = useState([
    { id: 1, title: "Neural Dashboard V2", source: "Figma", type: "Design", status: "SYNCED" },
    { id: 2, title: "Kernel Optimization", source: "GitHub", type: "Code", status: "STALE" }
  ]);

  const handleSync = () => {
    if (!url) return;
    setSyncing(true);
    setTimeout(() => {
      setProjects([...projects, { id: Date.now(), title: "Found Project", source: "Detecting...", type: "Auto", status: "SYNCED" }]);
      setSyncing(false);
      setUrl("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-charcoal p-8 lg:p-12 space-y-16 max-w-7xl mx-auto pb-32">
      <header className="space-y-6">
        <div className="flex items-center gap-3 text-neon-accent font-bold text-[11px] uppercase tracking-[0.3em]">
           <Layers size={18} /> Portfolio Manager
        </div>
        <h1 className="text-6xl font-black tracking-tight leading-tight uppercase">Project<br/><span className="text-neon-accent">Showcase</span></h1>
        <p className="text-white/40 font-medium max-w-md">Connect your professional platforms and showcase your best work in one beautiful place.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Ingestion Panel */}
        <div className="lg:col-span-1 space-y-12">
           <section className="space-y-8">
              <h3 className="text-xs font-bold text-white/20 tracking-[0.4em] uppercase">Connect Services</h3>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { icon: <Figma size={24} />, label: "Figma" },
                   { icon: <Github size={24} />, label: "GitHub" },
                   { icon: <Globe size={24} />, label: "Behance" },
                   { icon: <Layers size={24} />, label: "Notion" }
                 ].map(i => (
                   <button key={i.label} className="card-surface p-8 flex flex-col items-center gap-5 bg-white/[0.02] border-white/5 hover:bg-white/[0.05] hover:border-neon-accent/30 transition-all group rounded-3xl">
                      <div className="text-white/20 group-hover:text-neon-accent transition-all group-hover:scale-110">{i.icon}</div>
                      <span className="text-[10px] font-bold uppercase tracking-widest opacity-40 group-hover:opacity-100">{i.label}</span>
                   </button>
                 ))}
              </div>
           </section>

           <section className="space-y-8">
              <h3 className="text-xs font-bold text-white/20 tracking-[0.4em] uppercase">Add Projects via Link</h3>
              <div className="relative group">
                 <LinkIcon className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-neon-accent transition-colors" size={20} />
                 <input 
                   placeholder="Paste any public link..."
                   className="bg-white/[0.04] border border-white/10 rounded-2xl py-5 pl-14 pr-6 text-sm font-medium focus:border-neon-accent focus:bg-white/[0.06] outline-none w-full transition-all shadow-inner placeholder:text-white/10"
                   value={url}
                   onChange={e => setUrl(e.target.value)}
                   onKeyPress={e => e.key === 'Enter' && handleSync()}
                 />
              </div>
              <button 
                onClick={handleSync}
                disabled={!url || syncing}
                className="btn-primary w-full py-6 rounded-2xl flex items-center justify-center gap-4 shadow-xl shadow-neon-accent/10"
              >
                {syncing ? <RefreshCw className="animate-spin" size={20} /> : <Plus size={20} />}
                {syncing ? "Parsing..." : "Add to Portfolio"}
              </button>
           </section>
        </div>

        {/* Sync Feed */}
        <div className="lg:col-span-2 space-y-10">
           <h3 className="text-xs font-bold text-neon-accent tracking-[0.4em] uppercase">Project Library</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map(proj => (
                <div key={proj.id} className="card-surface p-10 bg-white/[0.02] border-white/10 group hover:border-white/20 transition-all flex flex-col justify-between min-h-[280px] rounded-[2.5rem] shadow-xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 p-8">
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest border ${proj.status === 'SYNCED' ? 'bg-neon-accent/5 text-neon-accent border-neon-accent/20' : 'bg-burned-coral/5 text-burned-coral border-burned-coral/20 animate-pulse'}`}>
                         {proj.status}
                      </div>
                   </div>

                   <div className="space-y-3 pt-4">
                      <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none">{proj.source} • {proj.type}</span>
                      <h4 className="text-3xl font-black tracking-tight leading-tight group-hover:text-neon-accent transition-colors">{proj.title}</h4>
                   </div>
                   
                   <div className="flex flex-col gap-6 pt-10 border-t border-white/5">
                      <button 
                        onClick={() => navigate("/critique")} 
                        className="w-full py-4 rounded-xl bg-neon-accent/5 border border-neon-accent/10 text-neon-accent text-[11px] font-bold uppercase tracking-widest hover:bg-neon-accent hover:text-charcoal transition-all flex items-center justify-center gap-3 group/btn"
                      >
                         <Zap size={14} className="group-hover/btn:fill-current" /> Get AI Feedback
                      </button>
                      
                      <div className="flex items-center justify-between opacity-20">
                         <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest">Last Synced: 6h ago</span>
                            <RefreshCw size={12} />
                         </div>
                         <ExternalLink size={14} />
                      </div>
                   </div>
                </div>
              ))}

              <button className="card-surface p-10 bg-white/[0.01] border-dashed border-white/10 hover:border-white/30 hover:bg-white/[0.03] transition-all flex flex-col items-center justify-center gap-4 min-h-[280px] rounded-[2.5rem] text-white/20 hover:text-white/40 group">
                 <div className="w-16 h-16 rounded-full border-2 border-current flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Plus size={32} />
                 </div>
                 <span className="text-xs font-bold uppercase tracking-widest">Add New Section</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}
