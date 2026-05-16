import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useApp } from "../context/AppContext";
import { api } from "../services/api";
import { 
  Brain, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Timer, 
  Activity,
  BarChart,
  ShieldCheck,
  ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
}

export default function AssessmentHub() {
  const { user, setUser } = useApp();
  const navigate = useNavigate();
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(180); // 3-minute limit

  useEffect(() => {
    let timer: any;
    if (selectedSkill && !completed && !loading) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            finishAssessment(answers);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [selectedSkill, completed, loading, answers]);

  const startAssessment = async (skill: string) => {
    setLoading(true);
    setSelectedSkill(skill);
    setTimeLeft(180);
    try {
      const data = await api.generateAssessment(skill);
      setQuestions(data);
      setCurrentIdx(0);
      setAnswers([]);
      setCompleted(false);
    } catch (err) {
      console.error(err);
      setSelectedSkill(null);
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (idx: number) => {
    const newAnswers = [...answers, idx];
    setAnswers(newAnswers);
    if (newAnswers.length === questions.length) {
      finishAssessment(newAnswers);
    } else {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const finishAssessment = (finalAnswers: number[]) => {
    let score = 0;
    questions.forEach((q, i) => {
      if (q.correctIndex === finalAnswers[i]) score++;
    });
    
    if (user && selectedSkill) {
      setUser({
        ...user,
        assessments: {
          ...user.assessments,
          [selectedSkill]: (score / questions.length) * 100
        }
      });
    }
    setCompleted(true);
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!user) return null;

  return (
    <div className="flex items-center justify-center p-6 bg-charcoal h-full overflow-hidden">
      <AnimatePresence mode="wait">
        {!selectedSkill ? (
          <motion.div 
            key="selection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-4xl px-6"
          >
            <div className="mb-12 flex justify-between items-end">
              <div>
                <Brain className="text-neon-accent mb-4" size={48} />
                <h2 className="text-5xl heading-bold mb-2 uppercase italic tracking-tighter">VALIDATION_VAULT</h2>
                <p className="label-mono italic">"Execute cryptographic proof of proficiency."</p>
              </div>
              <div className="text-right label-mono hidden md:block">
                 <span className="text-white/20">Authorized_User</span><br/>
                 <span className="text-neon-accent font-bold uppercase">{user.identity.fullName.split(' ')[0]}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.hardSkills.map(skill => (
                <button 
                  key={skill}
                  onClick={() => startAssessment(skill)}
                  className="card-surface text-left group hover:border-white/20 bg-surface-matte/40 flex justify-between items-center p-8 transition-all hover:scale-[1.02]"
                >
                  <div className="space-y-1">
                    <h4 className="label-mono mb-2 text-neon-accent flex items-center gap-2">
                       <Activity size={12} /> VERIFY_NODE
                    </h4>
                    <span className="text-2xl font-black uppercase italic tracking-tighter group-hover:text-white transition-colors">{skill}</span>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    {user.assessments[skill] ? (
                      <span className="text-neon-accent font-mono text-xs font-bold">{user.assessments[skill].toFixed(0)}% VALIDATED</span>
                    ) : (
                      <span className="text-white/10 font-mono text-[10px] tracking-widest group-hover:text-white/30 transition-colors uppercase font-bold italic">Un-Parsed</span>
                    )}
                    <ChevronRight className="text-white/10 group-hover:text-neon-accent transition-all translate-x-2" />
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        ) : loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-8"
          >
            <div className="relative">
              <div className="absolute -inset-12 bg-neon-accent/10 rounded-full animate-ping" />
              <div className="absolute -inset-8 border border-neon-accent/30 rounded-full animate-spin [animation-duration:3s]" />
              <Loader2 className="animate-spin text-neon-accent relative z-10" size={80} />
            </div>
            <div className="text-center space-y-2">
               <p className="font-mono text-neon-accent text-glow animate-pulse tracking-[0.5em] font-black text-xs uppercase italic transition-all">Parsing Neural Pathways...</p>
               <p className="text-[10px] font-mono text-white/20 uppercase">Benchmarking User Logic vs Global Tech Standard</p>
            </div>
          </motion.div>
        ) : !completed ? (
          <motion.div 
            key="question"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="w-full max-w-2xl px-6 relative"
          >
            {/* Screen 05: Pulsing Record Clock */}
            <div className="absolute -top-24 right-6 flex items-center gap-3">
               <div className="text-right">
                  <p className="text-[8px] font-mono text-white/40 uppercase tracking-widest uppercase">Encryption_Timer</p>
                  <p className={`text-xl font-black italic tracking-tighter ${timeLeft < 30 ? 'text-burned-coral animate-pulse' : 'text-neon-accent'}`}>
                    {formatTime(timeLeft)}
                  </p>
               </div>
               <div className="p-3 bg-neon-accent/10 rounded-full">
                  <Timer className={timeLeft < 30 ? 'text-burned-coral' : 'text-neon-accent'} size={24} />
               </div>
            </div>

            <header className="mb-12">
               <h3 className="label-mono text-neon-accent mb-2 uppercase tracking-widest">{selectedSkill}_PROTOCOL VALIDATION</h3>
               <div className="flex items-center gap-4">
                  <div className="h-1 flex-1 bg-white/5 rounded-full overflow-hidden">
                     <motion.div 
                        className="h-full bg-neon-accent glow-neon"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                     />
                  </div>
                  <span className="label-mono text-[10px] text-white/30">{currentIdx + 1}/{questions.length}</span>
               </div>
            </header>

            <h3 className="text-3xl font-black mb-12 leading-[1.1] tracking-tight text-white italic">
              {questions[currentIdx].question}
            </h3>

            <div className="grid grid-cols-1 gap-4">
              {questions[currentIdx].options.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full card-surface text-left bg-surface-matte/40 hover:border-neon-accent/50 group p-6 flex items-start gap-5 transition-all active:scale-[0.98]"
                >
                  <div className="w-10 h-10 border border-white/10 flex items-center justify-center font-black text-xl italic text-white/20 group-hover:text-neon-accent group-hover:border-neon-accent/40 bg-white/5 transition-all">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="flex-1 pt-1 opacity-60 group-hover:opacity-100 transition-opacity uppercase font-bold tracking-tight text-base leading-snug">
                    {opt}
                  </span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="completed"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-4xl px-6 py-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
               {/* Screen 06: Radial Progress Counter */}
               <div className="flex flex-col items-center">
                  <div className="relative w-64 h-64 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="128" cy="128" r="120" fill="transparent" stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
                      <motion.circle 
                        cx="128" cy="128" r="120" 
                        fill="transparent" 
                        stroke="currentColor" 
                        strokeWidth="8" 
                        className="text-neon-accent"
                        initial={{ strokeDasharray: "754", strokeDashoffset: "754" }}
                        animate={{ strokeDashoffset: 754 - (754 * (user.assessments[selectedSkill!] / 100)) }}
                        transition={{ duration: 2, ease: "easeOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                       <span className="text-8xl font-black italic tracking-tighter text-glow text-neon-accent">
                          {user.assessments[selectedSkill!]?.toFixed(0)}
                          <span className="text-3xl text-neon-accent/40">%</span>
                       </span>
                       <span className="label-mono uppercase tracking-[0.2em] font-bold text-white/30">Verified Accuracy</span>
                    </div>
                  </div>
               </div>

               {/* Analytics Grid */}
               <div className="space-y-8">
                  <div className="space-y-2">
                    <h2 className="text-4xl heading-bold italic uppercase"><span className="text-neon-accent">VALIDATION</span><br/>SUCCESSFUL</h2>
                    <p className="label-mono text-white/40 italic">Result Matrix Segmented by Global Standards</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="card-surface bg-neon-accent/5 border-neon-accent/20 p-6 space-y-2">
                        <BarChart className="text-neon-accent" size={20} />
                        <h4 className="text-[10px] font-mono text-white/40 uppercase">Market_Position</h4>
                        <p className="text-xl font-black uppercase italic">Top 8%</p>
                     </div>
                     <div className="card-surface p-6 space-y-2">
                        <ShieldCheck className="text-emerald-400" size={20} />
                        <h4 className="text-[10px] font-mono text-white/40 uppercase">Verification</h4>
                        <p className="text-xl font-black uppercase italic">PROVED</p>
                     </div>
                     <div className="card-surface p-6 space-y-2">
                        <Timer className="text-orange-400" size={20} />
                        <h4 className="text-[10px] font-mono text-white/40 uppercase">Time Optimization</h4>
                        <p className="text-xl font-black uppercase italic">FAST</p>
                     </div>
                     <div className="card-surface p-6 space-y-2">
                        <Brain className="text-white/30" size={20} />
                        <h4 className="text-[10px] font-mono text-white/40 uppercase">Logic_Pattern</h4>
                        <p className="text-xl font-black uppercase italic">LINEAR</p>
                     </div>
                  </div>

                  <button 
                    onClick={() => navigate("/dashboard")}
                    className="btn-primary w-full py-5 text-sm tracking-[0.3em]"
                  >
                    RETURN_TO_COMMAND_CENTER
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
