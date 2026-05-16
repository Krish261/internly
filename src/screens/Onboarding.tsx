import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, ArrowRight, User, Target, Brain, Search, Linkedin } from "lucide-react";
import { useApp } from "../context/AppContext";
import { api } from "../services/api";

type Step = "identity" | "intent" | "stage" | "role" | "preferences" | "background" | "calculating";

export default function Onboarding() {
  const navigate = useNavigate();
  const { setUser } = useApp();
  const [step, setStep] = useState<Step>("identity");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    intent: "",
    stage: "",
    role: "",
    region: "",
    culture: "",
    background: ""
  });

  const handleFinish = async () => {
    setLoading(true);
    setStep("calculating");
    try {
      const skills = await api.analyzeProfile(formData.background);
      setUser({
        identity: {
          fullName: formData.name || "Test User",
          email: "user@example.com",
          phone: "+91 99XXXXXX21"
        },
        background: formData.background,
        hardSkills: skills.hardSkills,
        softSkills: skills.softSkills,
        assessments: {}
      });
      setTimeout(() => navigate("/dashboard"), 3000);
    } catch (err) {
      console.error(err);
      setStep("background");
    } finally {
      setLoading(false);
    }
  };

  const progressMap: Record<Step, number> = {
    identity: 0,
    intent: 15,
    stage: 30,
    role: 45,
    preferences: 60,
    background: 80,
    calculating: 100
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-20 overflow-hidden bg-charcoal bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neon-accent/5 via-charcoal to-charcoal">
      <div className="fixed top-0 left-0 w-full h-[2px] bg-white/5 z-50">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progressMap[step]}%` }}
          className="h-full bg-neon-accent shadow-[0_0_15px_rgba(0,255,204,0.5)]"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ x: 30, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -30, opacity: 0 }}
          className="w-full max-w-2xl px-6"
        >
          {step === "identity" && (
            <div className="space-y-12">
               <div className="text-center space-y-4">
                 <div className="w-16 h-16 bg-neon-accent/10 border border-neon-accent/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <User className="text-neon-accent" size={32} />
                 </div>
                 <h2 className="text-5xl heading-bold italic uppercase tracking-tighter">IDENTITY_AUTH</h2>
                 <p className="label-mono opacity-50 uppercase tracking-widest">Secure identity verification terminal</p>
               </div>

               <div className="space-y-4 max-w-md mx-auto">
                 <div className="flex flex-col gap-3">
                   <button onClick={() => setStep("intent")} className="w-full bg-white text-charcoal py-4 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:brightness-90 transition-all">
                      <img src="https://www.google.com/favicon.ico" className="w-3 h-3" alt="Google" />
                      AUTHENTICATE_GOOGLE
                   </button>
                   <button onClick={() => setStep("intent")} className="w-full bg-[#0077b5] text-white py-4 font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:brightness-110 transition-all">
                      <Linkedin className="w-4 h-4" />
                      AUTHENTICATE_LINKEDIN
                   </button>
                 </div>

                 <div className="flex items-center gap-4 py-4">
                   <div className="flex-1 h-px bg-white/5" />
                   <span className="text-[10px] font-mono text-white/20">OR SESSION_OVERRIDE</span>
                   <div className="flex-1 h-px bg-white/5" />
                 </div>

                 <input 
                   placeholder="Enter Access Key (Email)"
                   className="terminal-input w-full p-4 mb-4"
                   value={formData.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                 />

                 <button 
                   disabled={!formData.name}
                   onClick={() => setStep("intent")}
                   className="btn-primary w-full"
                 >
                   VERIFY_IDENTITY
                 </button>
               </div>
            </div>
          )}

          {step === "intent" && (
            <div className="space-y-12">
              <div className="space-y-4">
                 <h1 className="text-5xl heading-bold italic uppercase tracking-tighter">INTENT_DISCOVERY</h1>
                 <p className="label-mono text-white/40">Select primary mission objective.</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: "intern", label: "I need an internship", desc: "First-time entry into technical ecosystem." },
                  { id: "pivot", label: "I want to pivot career", desc: "Lateral shift across functional nodes." },
                  { id: "pro", label: "I want to level up", desc: "Scaling authority in current track." }
                ].map(i => (
                  <button 
                    key={i.id}
                    onClick={() => { setFormData({ ...formData, intent: i.id }); setStep("stage"); }}
                    className="w-full card-surface text-left group hover:border-neon-accent/40 bg-surface-matte/40 p-8 flex justify-between items-center transition-all"
                  >
                    <div>
                      <h3 className="text-2xl font-black italic tracking-tighter group-hover:text-neon-accent transition-colors uppercase">{i.label}</h3>
                      <p className="text-[11px] font-mono text-white/30 uppercase mt-1 italic">{i.desc}</p>
                    </div>
                    <Target className="text-white/10 group-hover:text-neon-accent transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "stage" && (
            <div className="space-y-12">
              <div className="space-y-4">
                 <h1 className="text-5xl heading-bold italic uppercase tracking-tighter">INGESTION</h1>
                 <p className="label-mono text-white/40">Verify current node status.</p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                {[
                  { id: "academic", label: "ACADEMIC_NODE", desc: "Currently enrolled in higher ed." },
                  { id: "fresh", label: "FRESH_DEPLOYMENT", desc: "Recent graduate, 0-1 years exp." },
                  { id: "core", label: "CORE_PROFESSIONAL", desc: "Established industry technician." }
                ].map(s => (
                  <button 
                    key={s.id}
                    onClick={() => { setFormData({ ...formData, stage: s.id }); setStep("role"); }}
                    className="w-full card-surface text-left group hover:border-white/20 bg-surface-matte/40 p-10 flex justify-between items-center transition-all"
                  >
                    <div className="flex items-center gap-8">
                      <div className="w-14 h-14 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 group-hover:text-white transition-colors">
                         <User size={28} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-black italic tracking-tighter uppercase">{s.label}</h3>
                        <p className="text-[11px] font-mono text-white/30 uppercase mt-1 italic">{s.desc}</p>
                      </div>
                    </div>
                    <ArrowRight className="text-white/20 group-hover:text-white transition-all translate-x-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "role" && (
            <div className="space-y-12 text-center">
               <div className="space-y-4 mb-16">
                  <h1 className="text-5xl heading-bold italic uppercase tracking-tighter">TARGET_VECTOR</h1>
                  <p className="label-mono text-white/40 italic">Pinpointing primary career designation.</p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 {["Product Management", "Software Development", "UI/UX Design", "Marketing & Analytics", "Sales & Business", "Data Engineering"].map(r => (
                   <button 
                     key={r}
                     onClick={() => { setFormData({ ...formData, role: r }); setStep("preferences"); }}
                     className="card-surface p-8 text-center bg-surface-matte/40 hover:border-neon-accent/50 transition-all font-black text-xs uppercase tracking-[0.2em] italic"
                   >
                     {r}
                   </button>
                 ))}
               </div>
            </div>
          )}

          {step === "preferences" && (
            <div className="space-y-12">
               <div className="space-y-4">
                  <h1 className="text-5xl heading-bold italic uppercase tracking-tighter">REGION_FLOW</h1>
                  <p className="label-mono text-white/40 italic">Mapping deployment preferences & geographic bias.</p>
               </div>
               <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-mono text-white/20 uppercase tracking-widest font-bold">Preferred Region</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["India/Asia", "Global Remote", "United States", "Europe/UK"].map(reg => (
                        <button 
                          key={reg}
                          onClick={() => setFormData({ ...formData, region: reg })}
                          className={`p-5 text-center border font-black text-[10px] tracking-widest uppercase transition-all ${formData.region === reg ? 'bg-neon-accent text-charcoal border-neon-accent shadow-glow' : 'border-white/5 bg-white/5 text-white/30 hover:border-white/20'}`}
                        >
                          {reg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-mono text-white/20 uppercase tracking-widest font-bold">Culture Optimization</label>
                    <div className="flex flex-wrap gap-2">
                       {["Fast-Paced Startup", "Fortune 500", "Work-Life Balance", "High Growth", "Product-First"].map(c => (
                         <button 
                          key={c}
                          onClick={() => setFormData({ ...formData, culture: c })}
                          className={`px-4 py-2 text-[9px] font-mono border rounded-full transition-all ${formData.culture === c ? 'bg-white text-charcoal border-white font-black' : 'border-white/10 text-white/30 hover:text-white'}`}
                         >
                           {c}
                         </button>
                       ))}
                    </div>
                  </div>

                  <button 
                    disabled={!formData.region}
                    onClick={() => setStep("background")}
                    className="btn-primary w-full py-6 mt-8"
                  >
                    CONTINUE_TO_INGESTION
                  </button>
               </div>
            </div>
          )}

          {step === "background" && (
            <div className="space-y-12">
               <div className="space-y-4">
                  <h1 className="text-5xl heading-bold italic uppercase tracking-tighter">DATA_INGESTION</h1>
                  <p className="label-mono text-white/40 italic">Establishing baseline matrix through existing artifacts.</p>
               </div>
               <div className="space-y-8">
                  <div className="p-20 border-2 border-dashed border-white/5 bg-white/[0.02] rounded-3xl flex flex-col items-center justify-center text-center gap-6 group hover:bg-white/[0.04] hover:border-neon-accent/30 transition-all cursor-pointer">
                     <Upload className="text-white/10 group-hover:text-neon-accent transition-colors" size={48} />
                     <div className="space-y-1">
                        <span className="text-xs font-black uppercase tracking-widest opacity-40">Drop Resume Artifact</span>
                        <p className="text-[9px] font-mono text-white/20">Supports PDF, DOCX, TXT</p>
                     </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                    <div className="relative flex justify-center text-[8px] font-mono uppercase bg-charcoal px-4 text-white/20 tracking-[0.5em]">OR SYSTEM_INPUT</div>
                  </div>

                  <textarea 
                    placeholder="Paste raw profile data or career summary for neural extraction..."
                    className="terminal-input w-full h-40 font-serif normal-case p-6 text-base italic leading-relaxed"
                    value={formData.background}
                    onChange={e => setFormData({...formData, background: e.target.value})}
                  />

                  <button 
                    disabled={!formData.background}
                    onClick={handleFinish}
                    className="btn-primary w-full py-6 mt-4 shadow-[0_0_50px_rgba(0,255,204,0.1)]"
                  >
                    EXECUTE_ANALYSIS
                  </button>
               </div>
            </div>
          )}

          {step === "calculating" && (
            <motion.div 
              key="calc"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center gap-12"
            >
              <div className="relative">
                <div className="absolute -inset-24 bg-neon-accent/5 rounded-full animate-pulse" />
                <div className="absolute -inset-16 border border-neon-accent/20 rounded-full animate-spin [animation-duration:5s]" />
                <div className="absolute -inset-8 border border-neon-accent/10 rounded-full animate-spin [animation-duration:3s]" />
                <Brain className="text-neon-accent relative z-10" size={120} />
              </div>
              <div className="text-center space-y-4">
                 <h2 className="text-2xl font-black italic tracking-[0.2em] text-neon-accent text-glow uppercase">PROFILE_CALCULATION</h2>
                 <div className="space-y-1">
                    <p className="label-mono text-white/40 uppercase tracking-[0.3em] font-bold text-[10px] animate-pulse italic">MAPPING_PEER_BENCHMARKS...</p>
                    <p className="text-[9px] font-mono text-white/10 uppercase italic">STRUCTURING_BASELINE_SKILL_MATRIX</p>
                 </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
