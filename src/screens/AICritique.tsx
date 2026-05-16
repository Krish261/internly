import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { Eye, ShieldCheck, AlertTriangle, Zap, MessageSquare, ChevronRight, Maximize2, MousePointer2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AICritique() {
  const { user } = useApp();
  const navigate = useNavigate();
  const [activePin, setActivePin] = useState<number | null>(null);

  const pins = [
    { id: 1, x: "30%", y: "40%", severity: "Critical", feedback: "Logic failure detected in loop structure. Runtime complexity exceeds O(n) threshold.", fix: "Optimize Array handling" },
    { id: 2, x: "65%", y: "25%", severity: "Optimization", feedback: "Accessibility violation. Color contrast ratio below WCAG AA standard.", fix: "Update Color Palete" },
    { id: 3, x: "45%", y: "70%", severity: "Polish", feedback: "Inconsistent padding vectors. Component rhythm disrupted.", fix: "Standardize Spacing" }
  ];

  return (
    <div className="h-screen bg-charcoal flex flex-col overflow-hidden">
      <header className="p-8 border-b border-white/5 flex justify-between items-center bg-charcoal/80 backdrop-blur-md">
        <div className="space-y-1">
           <div className="flex items-center gap-2 text-neon-accent font-bold text-[10px] uppercase tracking-[0.3em]">
              <Zap size={14} /> AI Review Engine
           </div>
           <h1 className="text-4xl font-black tracking-tight leading-none uppercase">Portfolio Critique</h1>
        </div>
        <div className="flex gap-4">
           <button onClick={() => navigate("/portfolio")} className="px-6 py-3 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all">Back to Hub</button>
           <button className="btn-primary px-10 py-3 rounded-xl text-xs shadow-lg shadow-neon-accent/10">Refresh Scan</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Preview Canvas */}
        <div className="flex-1 relative bg-black/40 overflow-hidden cursor-crosshair group">
           <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity duration-700">
              <div className="w-full max-w-4xl aspect-video bg-white/[0.02] border border-white/10 rounded-3xl relative shadow-[0_30px_100px_rgba(0,0,0,0.5)] overflow-hidden">
                 {/* Mock Content */}
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-10" />
                 
                 {/* Interactive Pins */}
                 {pins.map(pin => (
                   <motion.button 
                     key={pin.id}
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     style={{ left: pin.x, top: pin.y }}
                     onClick={() => setActivePin(pin.id)}
                     className={`absolute -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all ${activePin === pin.id ? 'bg-neon-accent border-neon-accent scale-125 shadow-[0_0_30px_rgba(245,158,11,0.5)]' : 'bg-neon-accent/20 border-neon-accent hover:bg-neon-accent/40 shadow-xl'}`}
                   >
                     <div className="w-2 h-2 rounded-full bg-neon-accent shadow-[0_0_10px_rgba(245,158,11,1)]" />
                   </motion.button>
                 ))}
              </div>
           </div>
           
           <div className="absolute bottom-10 left-10 flex gap-4">
              <div className="px-6 py-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3">
                 <MousePointer2 size={14} className="text-neon-accent" /> Interactive Pins ON
              </div>
              <div className="px-6 py-3 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-widest flex items-center gap-3">
                 <Maximize2 size={14} className="text-neon-accent" /> Fullscreen Mode
              </div>
           </div>
        </div>

        {/* Right Side: Feedback Feed */}
        <div className="w-[450px] border-l border-white/5 bg-white/[0.01] overflow-y-auto p-12 custom-scrollbar space-y-12">
           <div className="space-y-6">
              <h3 className="text-xs font-bold text-white/30 tracking-[0.4em] uppercase">Scan Summary</h3>
              <div className="flex gap-4">
                 <div className="flex-1 p-6 bg-burned-coral/5 border border-burned-coral/20 rounded-2xl">
                    <p className="text-3xl font-black text-burned-coral">03</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1">Issues</p>
                 </div>
                 <div className="flex-1 p-6 bg-neon-accent/5 border border-neon-accent/20 rounded-2xl">
                    <p className="text-3xl font-black text-neon-accent">92</p>
                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 mt-1">Wins</p>
                 </div>
              </div>
           </div>

           <div className="space-y-6">
              {pins.map(pin => (
                <div 
                  key={pin.id}
                  className={`card-surface p-8 space-y-6 transition-all duration-300 rounded-3xl ${activePin === pin.id ? 'bg-neon-accent/[0.08] border-neon-accent/40 shadow-2xl scale-[1.02]' : 'bg-white/[0.02] border-white/10 hover:bg-white/[0.04]'}`}
                >
                   <div className="flex justify-between items-center">
                      <div className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest ${pin.severity === 'Critical' ? 'bg-burned-coral/10 text-burned-coral border border-burned-coral/20' : 'bg-neon-accent/10 text-neon-accent border border-neon-accent/20'}`}>
                         {pin.severity}
                      </div>
                      <MessageSquare size={16} className="text-white/20" />
                   </div>
                   <p className="text-lg font-bold leading-snug text-white/80">{pin.feedback}</p>
                   
                   <button 
                    onClick={() => navigate("/upskill")}
                    className="w-full py-4.5 rounded-2xl bg-white/5 border border-white/10 text-white/60 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-neon-accent hover:text-charcoal hover:border-neon-accent transition-all flex items-center justify-center gap-3"
                   >
                      How to improve <ChevronRight size={16} />
                   </button>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
