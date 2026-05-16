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
           <div className="flex items-center gap-2 text-neon-accent font-mono text-[9px] font-bold uppercase tracking-widest">
              <Zap size={10} /> Neural_Critique_Engine // v4.2
           </div>
           <h1 className="text-3xl font-black italic tracking-tighter uppercase">AI_CRITIQUE_CANVAS</h1>
        </div>
        <div className="flex gap-4">
           <button onClick={() => navigate("/portfolio")} className="px-6 py-3 border border-white/5 text-[10px] font-mono uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all">BACK_TO_HUB</button>
           <button className="btn-primary px-8 py-3 text-xs">REFRESH_SCAN</button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Side: Preview Canvas */}
        <div className="flex-1 relative bg-black/40 overflow-hidden cursor-crosshair group">
           <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-opacity">
              <div className="w-full max-w-4xl aspect-video bg-charcoal border border-white/10 rounded-xl relative shadow-2xl overflow-hidden">
                 {/* Mock Content */}
                 <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=2000')] bg-cover opacity-20" />
                 
                 {/* Interactive Pins */}
                 {pins.map(pin => (
                   <motion.button 
                     key={pin.id}
                     initial={{ scale: 0 }}
                     animate={{ scale: 1 }}
                     style={{ left: pin.x, top: pin.y }}
                     onClick={() => setActivePin(pin.id)}
                     className={`absolute -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shadow-glow ${activePin === pin.id ? 'bg-neon-accent border-neon-accent scale-150' : 'bg-neon-accent/10 border-neon-accent hover:bg-neon-accent/30'}`}
                   >
                     <div className="w-1.5 h-1.5 rounded-full bg-neon-accent" />
                   </motion.button>
                 ))}
              </div>
           </div>
           
           <div className="absolute bottom-10 left-10 flex gap-4">
              <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/5 text-[9px] font-mono uppercase tracking-widest flex items-center gap-2">
                 <MousePointer2 size={12} className="text-neon-accent" /> Toggle Interactive Pins [ON]
              </div>
              <div className="px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/5 text-[9px] font-mono uppercase tracking-widest flex items-center gap-2">
                 <Maximize2 size={12} className="text-neon-accent" /> Focus View
              </div>
           </div>
        </div>

        {/* Right Side: Feedback Feed */}
        <div className="w-[450px] border-l border-white/5 bg-surface-matte/40 overflow-y-auto p-12 custom-scrollbar space-y-12">
           <div className="space-y-4">
              <h3 className="label-mono text-white/30 font-bold tracking-widest text-[10px]">SYSTEM_TEARDOWN</h3>
              <div className="flex gap-4">
                 <div className="flex-1 p-4 bg-burned-coral/5 border border-burned-coral/20 rounded-xl">
                    <p className="text-2xl font-black italic text-burned-coral">03</p>
                    <p className="text-[8px] font-mono uppercase opacity-40">Critical_Errors</p>
                 </div>
                 <div className="flex-1 p-4 bg-neon-accent/5 border border-neon-accent/20 rounded-xl">
                    <p className="text-2xl font-black italic text-neon-accent">92</p>
                    <p className="text-[8px] font-mono uppercase opacity-40">Optimizations</p>
                 </div>
              </div>
           </div>

           <div className="space-y-4">
              {pins.map(pin => (
                <div 
                  key={pin.id}
                  className={`card-surface p-8 space-y-6 transition-all border-white/5 ${activePin === pin.id ? 'border-neon-accent bg-neon-accent/5 ring-1 ring-neon-accent/20' : 'bg-black/20 hover:border-white/10'}`}
                >
                   <div className="flex justify-between items-center">
                      <span className={`text-[10px] font-mono font-black uppercase tracking-widest ${pin.severity === 'Critical' ? 'text-burned-coral' : 'text-neon-accent'}`}>
                         [{pin.severity.toUpperCase()}]
                      </span>
                      <MessageSquare size={14} className="text-white/10" />
                   </div>
                   <p className="text-sm font-bold leading-relaxed text-white/80 italic">"{pin.feedback}"</p>
                   
                   <button 
                    onClick={() => navigate("/upskill")}
                    className="w-full py-4 border border-neon-accent/20 text-neon-accent text-[9px] font-mono uppercase font-bold tracking-widest hover:bg-neon-accent hover:text-charcoal transition-all flex items-center justify-center gap-2"
                   >
                      LEARN_HOW_TO_FIX <ChevronRight size={14} />
                   </button>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
