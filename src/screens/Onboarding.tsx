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
        hardSkills: skills?.hardSkills || [],
        softSkills: skills?.softSkills || [],
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
      <div className="fixed top-0 left-0 w-full h-[5px] bg-white/5 z-50">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progressMap[step]}%` }}
          className="h-full bg-neon-accent shadow-[0_0_15px_rgba(245,158,11,0.5)]"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          className="w-full max-w-2xl px-6"
        >
          {step === "identity" && (
            <div className="space-y-12">
               <div className="text-center space-y-4">
                 <div className="w-20 h-20 bg-neon-accent/10 border border-neon-accent/20 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-[0_10px_30px_rgba(245,158,11,0.1)]">
                    <User className="text-neon-accent" size={40} />
                 </div>
                 <h2 className="text-5xl font-black tracking-tight">Create Account</h2>
                 <p className="text-white/40 font-medium">Join thousand of students building their future</p>
               </div>

               <div className="space-y-6 max-w-md mx-auto">
                 <div className="flex flex-col gap-4">
                    <button onClick={() => setStep("intent")} className="w-full bg-white text-charcoal py-4.5 rounded-2xl font-bold tracking-wide flex items-center justify-center gap-3 hover:brightness-95 transition-all shadow-xl">
                       <img src="https://www.google.com/favicon.ico" className="w-4 h-4" alt="Google" />
                       Continue with Google
                    </button>
                    <button onClick={() => setStep("intent")} className="w-full bg-[#0077b5] text-white py-4.5 rounded-2xl font-bold tracking-wide flex items-center justify-center gap-3 hover:brightness-110 transition-all shadow-xl">
                       <Linkedin className="w-4 h-4" />
                       Continue with LinkedIn
                    </button>
                 </div>

                 <div className="flex items-center gap-4 py-6">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">OR USE EMAIL</span>
                    <div className="flex-1 h-px bg-white/5" />
                 </div>

                 <input 
                   placeholder="your@email.com"
                   className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 focus:border-neon-accent focus:bg-white/10 outline-none transition-all text-lg font-medium"
                   value={formData.name}
                   onChange={e => setFormData({...formData, name: e.target.value})}
                 />

                 <button 
                   disabled={!formData.name}
                   onClick={() => setStep("intent")}
                   className="btn-primary w-full py-5 rounded-2xl"
                 >
                   LET'S GO
                 </button>
               </div>
            </div>
          )}

          {step === "intent" && (
            <div className="space-y-12">
              <div className="space-y-4 text-center">
                 <h1 className="text-5xl font-black tracking-tight">What's your goal?</h1>
                 <p className="text-white/40 font-medium">We'll tailor your experience of your objective</p>
              </div>
              <div className="grid grid-cols-1 gap-5">
                {[
                  { id: "intern", label: "I need an internship", desc: "Starting my journey in the tech world." },
                  { id: "pivot", label: "I want to pivot career", desc: "Moving from another field into tech." },
                  { id: "pro", label: "I want to level up", desc: "Growing and advancing in my current role." }
                ].map(i => (
                  <button 
                    key={i.id}
                    onClick={() => { setFormData({ ...formData, intent: i.id }); setStep("stage"); }}
                    className="w-full card-surface text-left group hover:bg-neon-accent/5 hover:border-neon-accent/30 p-8 flex justify-between items-center transition-all duration-300"
                  >
                    <div>
                      <h3 className="text-2xl font-bold group-hover:text-neon-accent transition-colors">{i.label}</h3>
                      <p className="text-sm font-medium text-white/30 mt-2">{i.desc}</p>
                    </div>
                    <Target className="text-white/10 group-hover:text-neon-accent transition-all group-hover:scale-110" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "stage" && (
            <div className="space-y-12">
              <div className="space-y-4 text-center">
                 <h1 className="text-5xl font-black tracking-tight">Where are you now?</h1>
                 <p className="text-white/40 font-medium">This helps us find the most relevant opportunities</p>
              </div>
              <div className="grid grid-cols-1 gap-5">
                {[
                  { id: "academic", label: "Student", desc: "Currently in college or university." },
                  { id: "fresh", label: "Recent Graduate", desc: "New to the workforce (0-1 yrs experience)." },
                  { id: "core", label: "Professional", desc: "Currently working and looking for growth." }
                ].map(s => (
                  <button 
                    key={s.id}
                    onClick={() => { setFormData({ ...formData, stage: s.id }); setStep("role"); }}
                    className="w-full card-surface text-left group hover:bg-white/5 p-10 flex justify-between items-center transition-all duration-300"
                  >
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/20 group-hover:bg-white/10 group-hover:text-white transition-all">
                         <User size={32} />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold">{s.label}</h3>
                        <p className="text-sm font-medium text-white/30 mt-2">{s.desc}</p>
                      </div>
                    </div>
                    <ArrowRight className="text-white/20 group-hover:text-white transition-all group-hover:translate-x-2" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === "role" && (
            <div className="space-y-12 text-center">
               <div className="space-y-4 mb-16">
                  <h1 className="text-5xl font-black tracking-tight">Target Role</h1>
                  <p className="text-white/40 font-medium">Select your dream job title</p>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 {["Product Management", "Software Development", "UI/UX Design", "Marketing & Tech", "Sales & Business", "Data Engineering"].map(r => (
                   <button 
                     key={r}
                     onClick={() => { setFormData({ ...formData, role: r }); setStep("preferences"); }}
                     className="card-surface p-8 text-center bg-surface-matte/40 hover:bg-neon-accent/5 hover:border-neon-accent/40 transition-all font-bold text-sm tracking-widest"
                   >
                     {r}
                   </button>
                 ))}
               </div>
            </div>
          )}

          {step === "preferences" && (
            <div className="space-y-12">
               <div className="space-y-4 text-center">
                  <h1 className="text-5xl font-black tracking-tight">Preferences</h1>
                  <p className="text-white/40 font-medium">Tell us about your ideal work environment</p>
               </div>
               <div className="space-y-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Preferred Region</label>
                    <div className="grid grid-cols-2 gap-3">
                      {["India/Asia", "Global Remote", "United States", "Europe/UK"].map(reg => (
                        <button 
                          key={reg}
                          onClick={() => setFormData({ ...formData, region: reg })}
                          className={`p-5 rounded-2xl text-center border font-bold text-xs tracking-widest uppercase transition-all ${formData.region === reg ? 'bg-neon-accent text-charcoal border-neon-accent shadow-lg shadow-neon-accent/20' : 'border-white/5 bg-white/5 text-white/30 hover:border-white/20'}`}
                        >
                          {reg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Work Culture</label>
                    <div className="flex flex-wrap gap-2">
                       {["Fast Startup", "Big Tech", "Flexible", "High Growth", "Modern"].map(c => (
                         <button 
                          key={c}
                          onClick={() => setFormData({ ...formData, culture: c })}
                          className={`px-6 py-2.5 text-[11px] font-bold border rounded-full transition-all ${formData.culture === c ? 'bg-white text-charcoal border-white' : 'border-white/10 text-white/40 hover:text-white'}`}
                         >
                           {c}
                         </button>
                       ))}
                    </div>
                  </div>

                  <button 
                    disabled={!formData.region}
                    onClick={() => setStep("background")}
                    className="btn-primary w-full py-6 mt-8 rounded-2xl"
                  >
                    CONTINUE TO PROFILE
                  </button>
               </div>
            </div>
          )}

          {step === "background" && (
            <div className="space-y-12">
               <div className="space-y-4 text-center">
                  <h1 className="text-5xl font-black tracking-tight">Upload Resume</h1>
                  <p className="text-white/40 font-medium">We'll use this to build your initial skill map</p>
               </div>
               <div className="space-y-8">
                  <div className="p-20 border-2 border-dashed border-white/10 bg-white/5 rounded-3xl flex flex-col items-center justify-center text-center gap-6 group hover:bg-neon-accent/5 hover:border-neon-accent/30 transition-all cursor-pointer">
                     <Upload className="text-white/20 group-hover:text-neon-accent group-hover:scale-110 transition-all" size={56} />
                     <div className="space-y-1">
                        <span className="text-sm font-bold text-white/60">Upload PDF or DOCX</span>
                        <p className="text-[10px] font-medium text-white/20">Max file size 5MB</p>
                     </div>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5" /></div>
                    <div className="relative flex justify-center text-[10px] font-bold uppercase bg-charcoal px-6 text-white/20 tracking-widest">OR PASTE TEXT</div>
                  </div>

                  <textarea 
                    placeholder="Paste your resume or a short summary about yourself..."
                    className="w-full bg-white/5 border border-white/10 rounded-2xl h-40 p-6 text-lg focus:border-neon-accent focus:bg-white/10 outline-none transition-all leading-relaxed font-medium"
                    value={formData.background}
                    onChange={e => setFormData({...formData, background: e.target.value})}
                  />

                  <button 
                    disabled={!formData.background}
                    onClick={handleFinish}
                    className="btn-primary w-full py-6 mt-4 rounded-2xl shadow-xl"
                  >
                    BUILD MY ACCOUNT
                  </button>
               </div>
            </div>
          )}

          {step === "calculating" && (
            <motion.div 
              key="calc"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex flex-col items-center gap-12"
            >
              <div className="relative">
                <div className="absolute -inset-24 bg-neon-accent/10 rounded-full animate-pulse" />
                <div className="absolute -inset-16 border border-neon-accent/30 rounded-full animate-spin [animation-duration:8s]" />
                <div className="absolute -inset-8 border border-neon-accent/20 rounded-full animate-spin [animation-duration:5s]" />
                <Brain className="text-neon-accent relative z-10" size={140} />
              </div>
              <div className="text-center space-y-4">
                 <h2 className="text-3xl font-black tracking-tight text-neon-accent text-glow">Personalizing your experience</h2>
                 <div className="space-y-2">
                    <p className="text-sm font-medium text-white/40 animate-pulse">Analyzing your background...</p>
                    <p className="text-[10px] font-bold text-white/10 uppercase tracking-widest">Creating your skill matrix</p>
                 </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
