import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { api } from "../services/api";
import { Search, Loader2, Target, CheckCircle, XCircle, ChevronRight, Zap, Brain } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function JobAnalysis() {
  const { user, setUser, tier, setTier } = useApp();
  const navigate = useNavigate();
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ mustHave: string[], niceToHave: string[] } | null>(null);

  const handleAnalyze = async () => {
    if (tier === "Bronze") {
      navigate("/checkout");
      return;
    }

    setLoading(true);
    try {
      const data = await api.analyzeJob(jd);
      setResult(data);
      if (user) {
        setUser({
          ...user,
          jd,
          mustHave: data.mustHave,
          niceToHave: data.niceToHave
        });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getMatchScore = () => {
    if (!result || !user) return 0;
    const allRequired = result.mustHave;
    const matches = allRequired.filter(skill => 
      user?.hardSkills?.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    );
    return Math.round((matches.length / allRequired.length) * 100);
  };

  const score = getMatchScore();

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden bg-charcoal">
      {/* Left Panel: Target Input (Screen 09) */}
      <div className="w-full lg:w-1/2 p-8 lg:p-12 border-r border-white/5 flex flex-col relative">
        <header className="mb-12">
          <div className="flex items-center gap-3 text-neon-accent mb-4">
            <Target size={20} />
            <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-neon-accent">Skill Match</span>
          </div>
          <h1 className="text-6xl font-black tracking-tight leading-[0.9]">Job<br/><span className="text-neon-accent">Analyzer</span></h1>
          <p className="text-white/40 mt-6 font-medium max-w-md">Paste a job description to see how your skills match up.</p>
        </header>

        <div className="flex-1 flex flex-col gap-8">
          <div className="flex-1 flex flex-col space-y-4">
            <div className="flex justify-between items-end">
               <label className="text-xs font-bold uppercase tracking-widest text-white/30">Paste Job Description</label>
               <span className="text-[10px] font-bold text-white/10 uppercase tracking-widest">Waiting for input</span>
            </div>
            <textarea 
              value={jd}
              onChange={e => setJd(e.target.value)}
              className="flex-1 bg-white/[0.03] border border-white/10 p-8 text-lg font-medium resize-none focus:border-neon-accent focus:bg-white/[0.05] outline-none transition-all rounded-3xl shadow-inner placeholder:text-white/10 text-white/90 leading-relaxed"
              placeholder="Paste the job description from LinkedIn, Indeed, or any company website here..."
            />
          </div>
          
          <div className="space-y-4">
            <div className="p-5 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className={`w-2.5 h-2.5 rounded-full ${tier !== 'Bronze' ? 'bg-neon-accent animate-pulse' : 'bg-white/10'}`} />
                  <span className="text-xs font-bold text-white/40 uppercase tracking-widest">{tier !== 'Bronze' ? 'Premium Analysis Active' : 'Basic Mode'}</span>
               </div>
               {tier === 'Bronze' && <Link to="/checkout" className="text-xs text-neon-accent font-bold uppercase hover:underline tracking-widest">UPGRADE</Link>}
            </div>

            <button 
              disabled={!jd || loading}
              onClick={handleAnalyze}
              className="btn-primary w-full py-6 rounded-2xl flex items-center justify-center gap-4 text-sm font-bold tracking-widest shadow-xl shadow-neon-accent/10"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
              <span>
                {tier === "Bronze" ? "UPGRADE TO ANALYZE" : (loading ? "ANALYZING..." : "START ANALYSIS")}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel: Extraction Matrix (Screen 10) */}
      <div className="w-full lg:w-1/2 bg-black/20 p-8 lg:p-12 overflow-y-auto custom-scrollbar">
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div 
              key="empty"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-10"
            >
              <div className="relative">
                 <div className="absolute inset-0 bg-neon-accent/5 rounded-full scale-[2.5] blur-[80px]" />
                 <Search className="text-white/5 relative z-10" size={140} />
              </div>
              <div className="space-y-4 max-w-xs">
                 <p className="text-white/40 font-bold text-sm uppercase tracking-widest">
                   No Analysis Yet
                 </p>
                 <p className="text-xs font-medium text-white/10 leading-relaxed">Fill in the job details on the left to see your personalized skill match analysis.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="result"
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="space-y-16 pb-20"
            >
              <div className="flex items-end justify-between border-b border-white/5 pb-12">
                <div className="space-y-4">
                  <h3 className="text-xs font-bold text-neon-accent uppercase tracking-widest">Results</h3>
                  <div className="space-y-1">
                    <p className="text-6xl font-black tracking-tight leading-none"><span className={score > 70 ? 'text-neon-accent' : 'text-burned-coral'}>{score}%</span></p>
                    <p className="text-xs font-bold text-white/20 uppercase tracking-[0.3em]">Skill Match Score</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                   <div className="flex gap-1.5">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`w-4 h-1.5 rounded-full ${i <= (score/20) ? 'bg-neon-accent' : 'bg-white/5'}`} />
                      ))}
                   </div>
                   <span className="text-[10px] font-bold text-white/10 uppercase tracking-widest">Match Strength</span>
                </div>
              </div>

              <div className="space-y-16">
                <section className="space-y-8">
                  <div className="flex items-center gap-5">
                     <div className="w-14 h-14 bg-neon-accent/10 border border-neon-accent/20 rounded-2xl flex items-center justify-center shadow-lg shadow-neon-accent/5">
                        <CheckCircle className="text-neon-accent" size={28} />
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/40">Requirements</h4>
                        <p className="text-2xl font-black tracking-tight">Required Skills</p>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {result.mustHave.map(skill => {
                      const isMatch = user?.hardSkills?.some(s => s.toLowerCase().includes(skill.toLowerCase()));
                      return (
                        <div key={skill} className="card-surface bg-white/[0.03] hover:bg-white/[0.05] group border-white/10 p-6 flex items-center justify-between relative overflow-hidden transition-all duration-300 rounded-2xl">
                          {isMatch && <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-neon-accent" />}
                          <span className={`text-lg font-bold tracking-tight ${isMatch ? 'text-white' : 'text-white/30'}`}>{skill}</span>
                          {isMatch ? (
                            <div className="flex items-center gap-3">
                               <span className="text-neon-accent text-[11px] font-bold tracking-widest">MATCHED</span>
                               <CheckCircle size={20} className="text-neon-accent" />
                            </div>
                          ) : (
                            <button 
                              onClick={() => navigate("/learning")}
                              className="flex items-center gap-3 group/btn hover:scale-105 transition-transform"
                            >
                               <span className="text-burned-coral text-[11px] font-bold tracking-widest group-hover/btn:text-white transition-colors">LEARN SKILL</span>
                               <ChevronRight size={20} className="text-burned-coral/60 group-hover/btn:text-white" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="space-y-8">
                  <div className="flex items-center gap-5">
                     <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                        <Zap className="text-white/20" size={28} />
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-[10px] uppercase font-bold tracking-widest text-white/40">Extras</h4>
                        <p className="text-2xl font-black tracking-tight">Nice to Have</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {result.niceToHave.map(skill => (
                      <div key={skill} className="card-surface bg-white/[0.01] p-6 border-white/5 hover:bg-white/[0.03] transition-all rounded-xl">
                        <span className="text-sm font-bold text-white/30 tracking-wide group-hover:text-white/60">{skill}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="pt-12 border-t border-white/5">
                <button 
                  onClick={() => navigate("/learning")}
                  className="w-full bg-white text-charcoal hover:scale-[1.02] py-6 rounded-2xl font-black uppercase tracking-widest text-xs shadow-2xl transition-all flex items-center justify-center gap-4"
                >
                  <Brain size={24} />
                  CREATE LEARNING PLAN
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
