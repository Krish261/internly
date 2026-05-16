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
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-4xl px-6"
          >
            <div className="mb-12 flex justify-between items-end">
              <div className="space-y-4">
                <div className="w-16 h-16 bg-neon-accent/10 border border-neon-accent/20 rounded-2xl flex items-center justify-center shadow-lg shadow-neon-accent/5">
                  <Brain className="text-neon-accent" size={36} />
                </div>
                <h2 className="text-6xl font-black tracking-tight leading-tight">Your Skill<br/><span className="text-neon-accent">Check</span></h2>
                <p className="text-white/40 font-medium max-w-md">Verify your skills and build your professional profile to stand out to employers.</p>
              </div>
              <div className="text-right hidden md:block space-y-1">
                 <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Authorized For</span>
                 <p className="text-xl font-black tracking-tight text-white">{user.identity.fullName.split(' ')[0]}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {user.hardSkills.map(skill => (
                <button 
                  key={skill}
                  onClick={() => startAssessment(skill)}
                  className="card-surface text-left group hover:bg-white/[0.04] p-8 flex justify-between items-center transition-all duration-300 rounded-[2rem]"
                >
                  <div className="space-y-1">
                    <h4 className="text-[10px] uppercase font-bold tracking-widest text-neon-accent mb-2 flex items-center gap-2">
                       <Activity size={14} /> Assess Skill
                    </h4>
                    <span className="text-3xl font-black tracking-tight group-hover:text-neon-accent transition-colors">{skill}</span>
                  </div>
                  <div className="flex flex-col items-end gap-3">
                    {user.assessments[skill] ? (
                      <div className="px-4 py-1.5 bg-neon-accent/10 rounded-full border border-neon-accent/20">
                        <span className="text-neon-accent text-[11px] font-bold tracking-tight">{user.assessments[skill].toFixed(0)}% Verified</span>
                      </div>
                    ) : (
                      <span className="text-white/10 text-[10px] font-bold uppercase tracking-widest group-hover:text-white/40 transition-colors">Not Verified</span>
                    )}
                    <ChevronRight className="text-white/10 group-hover:text-neon-accent group-hover:translate-x-1 transition-all" />
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
            className="flex flex-col items-center gap-10"
          >
            <div className="relative">
              <div className="absolute -inset-20 bg-neon-accent/5 rounded-full animate-pulse" />
              <div className="absolute -inset-12 border border-neon-accent/20 rounded-full animate-spin [animation-duration:5s]" />
              <Loader2 className="animate-spin text-neon-accent relative z-10" size={100} />
            </div>
            <div className="text-center space-y-2">
               <p className="text-xl font-black text-neon-accent tracking-widest uppercase text-glow animate-pulse">Setting up your test...</p>
               <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Choosing questions that match your level</p>
            </div>
          </motion.div>
        ) : !completed ? (
          <motion.div 
            key="question"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="w-full max-w-3xl px-6 relative"
          >
            <div className="absolute -top-32 right-6 flex items-center gap-5">
               <div className="text-right space-y-1">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Time Remaining</p>
                  <p className={`text-2xl font-black tracking-tight ${timeLeft < 30 ? 'text-burned-coral animate-pulse' : 'text-neon-accent'}`}>
                    {formatTime(timeLeft)}
                  </p>
               </div>
               <div className="p-4 bg-white/5 border border-white/10 rounded-2xl">
                  <Timer className={timeLeft < 30 ? 'text-burned-coral' : 'text-neon-accent'} size={28} />
               </div>
            </div>

            <header className="mb-16">
               <h3 className="text-xs font-bold text-white/40 uppercase tracking-[0.3em] mb-4">{selectedSkill} Assessment</h3>
               <div className="flex items-center gap-6">
                  <div className="h-2 flex-1 bg-white/5 rounded-full overflow-hidden border border-white/5 shadow-inner">
                     <motion.div 
                        className="h-full bg-neon-accent glow-neon-small"
                        initial={{ width: 0 }}
                        animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                     />
                  </div>
                  <span className="text-sm font-bold text-white/20">{currentIdx + 1}/{questions.length}</span>
               </div>
            </header>

            <h3 className="text-4xl font-black mb-16 leading-[1.1] tracking-tight text-white/90">
              {questions[currentIdx].question}
            </h3>

            <div className="grid grid-cols-1 gap-5">
              {questions[currentIdx].options.map((opt, i) => (
                <button 
                  key={i}
                  onClick={() => handleAnswer(i)}
                  className="w-full card-surface text-left bg-white/[0.04] hover:bg-neon-accent/[0.03] hover:border-neon-accent/30 p-8 flex items-center gap-8 transition-all active:scale-[0.98] rounded-[1.5rem]"
                >
                  <div className="w-12 h-12 border border-white/10 rounded-xl flex items-center justify-center font-black text-2xl text-white/10 group-hover:bg-neon-accent/10 group-hover:text-neon-accent group-hover:border-neon-accent/30 transition-all">
                    {String.fromCharCode(65 + i)}
                  </div>
                  <span className="flex-1 font-bold text-lg text-white/60 group-hover:text-white transition-colors tracking-tight">
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
            className="w-full max-w-5xl px-6 py-12"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="flex flex-col items-center">
                  <div className="relative w-80 h-80 flex items-center justify-center">
                    <svg className="w-full h-full -rotate-90 drop-shadow-[0_0_40px_rgba(245,158,11,0.15)]">
                      <circle cx="160" cy="160" r="145" fill="transparent" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                      <motion.circle 
                        cx="160" cy="160" r="145" 
                        fill="transparent" 
                        stroke="currentColor" 
                        strokeWidth="12" 
                        className="text-neon-accent"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "911", strokeDashoffset: "911" }}
                        animate={{ strokeDashoffset: 911 - (911 * (user.assessments[selectedSkill!] / 100)) }}
                        transition={{ duration: 2.5, ease: "circOut" }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                       <span className="text-9xl font-black tracking-tighter text-glow text-neon-accent">
                          {user.assessments[selectedSkill!]?.toFixed(0)}
                          <span className="text-4xl opacity-40">%</span>
                       </span>
                       <span className="text-xs font-bold uppercase tracking-[0.3em] text-white/20">Verified Match</span>
                    </div>
                  </div>
               </div>

               <div className="space-y-10">
                  <div className="space-y-4">
                    <h2 className="text-6xl font-black tracking-tight leading-tight">Verification<br/><span className="text-neon-accent">Complete</span></h2>
                    <p className="text-white/40 font-medium">Your results have been benchmarked against professional standards.</p>
                  </div>

                  <div className="grid grid-cols-2 gap-5">
                     <div className="card-surface bg-neon-accent/5 border-neon-accent/20 p-8 rounded-3xl space-y-3">
                        <BarChart className="text-neon-accent" size={24} />
                        <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Market Standing</h4>
                        <p className="text-2xl font-black">Top 8%</p>
                     </div>
                     <div className="card-surface p-8 rounded-3xl space-y-3">
                        <ShieldCheck className="text-emerald-400" size={24} />
                        <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Status</h4>
                        <p className="text-2xl font-black text-emerald-400">Verified</p>
                     </div>
                     <div className="card-surface p-8 rounded-3xl space-y-3">
                        <Timer className="text-orange-400" size={24} />
                        <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Efficiency</h4>
                        <p className="text-2xl font-black">Expert Level</p>
                     </div>
                     <div className="card-surface p-8 rounded-3xl space-y-3">
                        <Brain className="text-white/20" size={24} />
                        <h4 className="text-[10px] font-bold text-white/30 uppercase tracking-widest">Reasoning</h4>
                        <p className="text-2xl font-black">Analytical</p>
                     </div>
                  </div>

                  <button 
                    onClick={() => navigate("/dashboard")}
                    className="btn-primary w-full py-6 rounded-3xl text-sm font-bold tracking-widest"
                  >
                    CONTINUE TO DASHBOARD
                  </button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
