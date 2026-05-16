import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { Brain, MessageSquare, ShieldCheck, Zap, HelpCircle, ChevronRight, Play } from "lucide-react";
import { useState } from "react";

export default function InterviewPrep() {
  const { user } = useApp();
  const [activeQuestion, setActiveQuestion] = useState(0);

  const questions = [
    { q: "Walk me through a high-stakes deployment failure and how you remediated the system.", type: "TECHNICAL_ARCHITECTURE" },
    { q: "How do you align cross-functional nodes when product objectives shift mid-cycle?", type: "STRATEGIC_ALIGNMENT" },
    { q: "Describe your process for auditing keyword density without sacrificing document readability.", type: "EXECUTION" },
    { q: "What is your philosophy on 'Zero-Typing' in a manual-heavy industry?", type: "INNOVATION" },
    { q: "How do you verify your skill matrix against market benchmarks?", type: "IDENTITY_VERIFICATION" }
  ];

  return (
    <div className="min-h-screen bg-charcoal p-8 lg:p-20 space-y-16">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 max-w-6xl mx-auto">
        <div className="space-y-4">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-accent/10 border border-neon-accent/20 rounded-full font-mono text-neon-accent text-[10px] font-bold uppercase tracking-widest">
              <Zap size={12} /> Predicted_By_Gemini_v1.2
           </div>
           <h1 className="text-6xl font-black italic tracking-tighter uppercase">INTERVIEW_SIMULATOR</h1>
           <p className="label-mono opacity-40">Analyzing Target_JD: "Senior Product Manager @ Cyberdyne Systems"</p>
        </div>
        <button className="btn-primary px-8 py-4 flex items-center gap-3 shadow-glow">
           <Play size={18} />
           START_MOCK_SESSION
        </button>
      </header>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Question List */}
        <div className="lg:col-span-2 space-y-4">
           {questions.map((item, i) => (
             <motion.div 
               key={i}
               onClick={() => setActiveQuestion(i)}
               className={`card-surface p-8 cursor-pointer transition-all border ${activeQuestion === i ? 'border-neon-accent bg-neon-accent/5' : 'bg-surface-matte/40 border-white/5 hover:border-white/20'}`}
             >
                <div className="flex justify-between items-start mb-4">
                   <span className="text-[10px] font-mono text-neon-accent font-bold tracking-widest">{item.type}</span>
                   <span className="text-white/20">#{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className={`text-xl font-black italic tracking-tight leading-relaxed transition-all ${activeQuestion === i ? 'text-white' : 'text-white/40'}`}>
                   "{item.q}"
                </p>
             </motion.div>
           ))}
        </div>

        {/* AI Simulator Guidance */}
        <div className="space-y-8">
           <div className="card-surface p-8 bg-black/40 border border-white/5 space-y-6">
              <div className="flex items-center gap-4">
                 <Brain className="text-neon-accent" size={24} />
                 <h3 className="label-mono font-bold tracking-widest">GEMINI_GUIDANCE</h3>
              </div>
              <div className="space-y-4">
                 <p className="text-xs font-mono text-white/40 leading-relaxed uppercase">
                    Cyberdyne values <span className="text-neon-accent">remediation speed</span> and <span className="text-neon-accent">systemic thinking</span>.
                 </p>
                 <div className="p-4 bg-white/5 rounded-xl space-y-4 border border-white/5">
                    <h4 className="text-[10px] font-mono text-white/60 uppercase font-bold">Suggested Talking Points:</h4>
                    <ul className="space-y-2">
                       {["Reference project node Delta-7", "Mention 12% increase in deployment velocity", "Audit of functional silos"].map(point => (
                         <li key={point} className="flex items-center gap-3 text-[11px] font-mono text-white/30">
                            <div className="w-1.5 h-1.5 bg-neon-accent rounded-full" />
                            {point}
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>

           <div className="p-8 border border-white/5 rounded-2xl bg-surface-matte/40 flex justify-between items-center group cursor-pointer hover:border-white/20 transition-all">
              <div className="space-y-1">
                 <p className="text-[10px] font-mono text-white/40">GENERATE_MORE</p>
                 <p className="text-xs font-black italic text-neon-accent uppercase">Recursive Query_Node</p>
              </div>
              <ChevronRight className="text-white/20 group-hover:text-neon-accent group-hover:translate-x-1 transition-all" />
           </div>
        </div>
      </div>
    </div>
  );
}
