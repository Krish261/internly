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
      setProjects([...projects, { id: Date.now(), title: "Extracted Project Node", source: "Detecting...", type: "Auto", status: "SYNCED" }]);
      setSyncing(false);
      setUrl("");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-charcoal p-8 lg:p-12 space-y-16 max-w-7xl mx-auto pb-32">
      <header className="space-y-4">
        <div className="flex items-center gap-2 text-neon-accent font-mono text-[10px] font-bold uppercase tracking-[0.3em]">
           <Layers size={14} /> ACTIVE_PORTFOLIO_FLOW
        </div>
        <h1 className="text-6xl font-black italic tracking-tighter uppercase">COLLATERAL_HUB</h1>
        <p className="label-mono text-white/40 italic">"Unified ingestion of verified professional artifacts."</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Ingestion Panel */}
        <div className="lg:col-span-1 space-y-12">
           <section className="space-y-6">
              <h3 className="label-mono text-white/30 font-bold tracking-widest text-[10px]">INTEGRATION_MATRIX</h3>
              <div className="grid grid-cols-2 gap-4">
                 {[
                   { icon: <Figma size={20} />, label: "Figma" },
                   { icon: <Github size={20} />, label: "GitHub" },
                   { icon: <Globe size={20} />, label: "Behance" },
                   { icon: <Layers size={20} />, label: "Notion" }
                 ].map(i => (
                   <button key={i.label} className="card-surface p-6 flex flex-col items-center gap-4 bg-surface-matte/40 hover:bg-white/[0.05] border-white/5 transition-all group">
                      <div className="text-white/20 group-hover:text-neon-accent transition-colors">{i.icon}</div>
                      <span className="text-[10px] font-mono uppercase tracking-widest opacity-40">{i.label}</span>
                   </button>
                 ))}
              </div>
           </section>

           <section className="space-y-6">
              <h3 className="label-mono text-white/30 font-bold tracking-widest text-[10px]">SMART_LINK_PARSE</h3>
              <div className="relative">
                 <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                 <input 
                   placeholder="Paste any public link..."
                   className="terminal-input w-full p-4 pl-12"
                   value={url}
                   onChange={e => setUrl(e.target.value)}
                   onKeyPress={e => e.key === 'Enter' && handleSync()}
                 />
              </div>
              <button 
                onClick={handleSync}
                disabled={!url || syncing}
                className="btn-primary w-full py-5 flex items-center justify-center gap-4"
              >
                {syncing ? <RefreshCw className="animate-spin" size={18} /> : <Plus size={18} />}
                {syncing ? "PARSING..." : "SYNC_COLLATERAL"}
              </button>
           </section>
        </div>

        {/* Sync Feed */}
        <div className="lg:col-span-2 space-y-8">
           <h3 className="label-mono text-neon-accent font-bold tracking-widest text-[10px]">SYNC_FEED // Active Nodes</h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {projects.map(proj => (
                <div key={proj.id} className="card-surface p-8 bg-surface-matte/40 border-white/5 group hover:border-white/20 transition-all flex flex-col justify-between min-h-[220px]">
                   <div className="flex justify-between items-start">
                      <div className="space-y-1">
                         <span className="text-[9px] font-mono text-white/20 uppercase tracking-widest">{proj.source} • {proj.type}</span>
                         <h4 className="text-2xl font-black italic tracking-tighter uppercase group-hover:text-neon-accent transition-colors">{proj.title}</h4>
                      </div>
                      <div className={`px-2 py-1 rounded text-[8px] font-mono font-black ${proj.status === 'SYNCED' ? 'bg-neon-accent/10 text-neon-accent' : 'bg-burned-coral/10 text-burned-coral animate-pulse'}`}>
                         {proj.status}
                      </div>
                   </div>
                   
                   <div className="flex justify-between items-center pt-8 border-t border-white/5">
                      <div className="flex gap-4">
                         <button onClick={() => navigate("/critique")} className="text-[9px] font-mono text-neon-accent uppercase font-bold hover:underline">RUN_AI_CRITIQUE</button>
                      </div>
                      <div className="flex items-center gap-2">
                         <span className="text-[8px] font-mono text-white/10">LAST_POLL: 6H AGO</span>
                         <RefreshCw size={10} className="text-white/10" />
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
