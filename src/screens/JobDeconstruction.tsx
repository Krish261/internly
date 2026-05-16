import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useApp } from "../context/AppContext";
import { api } from "../services/api";
import { Search, Loader2, Target, CheckCircle, XCircle, ChevronRight, Zap, Brain } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

export default function JobDeconstruction() {
  const { user, setUser, tier, setTier } = useApp();
  const navigate = useNavigate();
  const [jd, setJd] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{ mustHave: string[], niceToHave: string[] } | null>(null);

  const handleDeconstruct = async () => {
    if (tier === "Bronze") {
      navigate("/checkout");
      return;
    }

    setLoading(true);
    try {
      const data = await api.deconstructJob(jd);
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
      user.hardSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()))
    );
    return Math.round((matches.length / allRequired.length) * 100);
  };

  const score = getMatchScore();

  return (
    <div className="flex flex-col lg:flex-row h-full overflow-hidden bg-charcoal">
      {/* Left Panel: Target Input (Screen 09) */}
      <div className="w-full lg:w-1/2 p-8 lg:p-12 border-r border-white/5 flex flex-col relative">
        <header className="mb-12">
          <div className="flex items-center gap-2 text-neon-accent mb-4">
            <Target size={16} />
            <span className="font-mono text-[10px] uppercase italic tracking-[0.3em] font-bold">TARGET_ACQUISITION_TERMINAL</span>
          </div>
          <h1 className="text-5xl heading-bold italic uppercase">ROLE_DECONSTRUCTOR</h1>
          <p className="label-mono text-white/40 mt-4 leading-relaxed italic">"Analyzing market-side requirements for deployment alignment."</p>
        </header>

        <div className="flex-1 flex flex-col gap-8">
          <div className="flex-1 flex flex-col space-y-4">
            <div className="flex justify-between items-end">
               <label className="label-mono uppercase tracking-widest text-[10px] text-white/60">Raw_Signal_Input</label>
               <span className="text-[9px] font-mono text-white/20 uppercase">Awaiting JD Matrix</span>
            </div>
            <textarea 
              value={jd}
              onChange={e => setJd(e.target.value)}
              className="flex-1 bg-surface-matte/40 border border-white/5 p-8 font-mono text-xs resize-none focus:border-neon-accent outline-none transition-all rounded-2xl shadow-inner placeholder:text-white/10 text-white/80 leading-relaxed"
              placeholder="Paste the LinkedIn job description, company website text, or target role details here to begin deconstruction..."
            />
          </div>
          
          <div className="space-y-4">
            <div className="p-4 bg-white/[0.02] border border-white/5 rounded-xl flex items-center justify-between">
               <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${tier !== 'Bronze' ? 'bg-neon-accent' : 'bg-white/10'}`} />
                  <span className="text-[10px] font-mono uppercase tracking-widest">{tier !== 'Bronze' ? 'Silver Protocols Active' : 'Restricted Access Mode'}</span>
               </div>
               {tier === 'Bronze' && <Link to="/checkout" className="text-[10px] text-neon-accent font-bold uppercase hover:underline">UPGRADE</Link>}
            </div>

            <button 
              disabled={!jd || loading}
              onClick={handleDeconstruct}
              className="btn-primary w-full py-6 flex items-center justify-center gap-4 text-sm tracking-[0.4em]"
            >
              {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
              <span>
                {tier === "Bronze" ? "UPGRADE TO DECONSTRUCT" : (loading ? "DECONSTRUCTING..." : "EXECUTE_ANALYSIS")}
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
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-8"
            >
              <div className="relative">
                 <div className="absolute inset-0 bg-neon-accent/5 rounded-full scale-[2] blur-3xl" />
                 <Search className="text-white/5 relative z-10" size={120} />
              </div>
              <div className="space-y-2">
                 <p className="text-white/20 font-mono text-[10px] uppercase tracking-[0.4em] max-w-xs leading-loose italic font-bold">
                   Awaiting System Signal
                 </p>
                 <p className="text-[9px] font-mono text-white/10 uppercase tracking-widest">Connect JD terminal to populate extraction matrix</p>
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
                <div>
                  <h3 className="label-mono text-neon-accent font-bold mb-2">Extraction_Results</h3>
                  <p className="text-4xl font-black uppercase italic tracking-tighter">Identity_Match: <span className={score > 70 ? 'text-neon-accent' : 'text-burned-coral'}>{score}%</span></p>
                </div>
                <div className="flex flex-col items-end gap-1">
                   <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className={`w-3 h-1 ${i <= (score/20) ? 'bg-neon-accent' : 'bg-white/10'}`} />
                      ))}
                   </div>
                   <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Match Strength</span>
                </div>
              </div>

              <div className="space-y-12">
                <section className="space-y-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-neon-accent/10 border border-neon-accent/30 flex items-center justify-center">
                        <CheckCircle className="text-neon-accent" size={24} />
                     </div>
                     <div>
                        <h4 className="text-[10px] uppercase font-mono tracking-[0.4em] text-white/40">Critical Nodes</h4>
                        <p className="text-xl font-black uppercase italic italic tracking-tight">Requirement Logic</p>
                     </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4">
                    {result.mustHave.map(skill => {
                      const isMatch = user?.hardSkills.some(s => s.toLowerCase().includes(skill.toLowerCase()));
                      return (
                        <div key={skill} className="card-surface bg-surface-matte/40 group border-white/5 hover:border-white/10 p-6 flex items-center justify-between relative overflow-hidden">
                          {isMatch && <div className="absolute left-0 top-0 bottom-0 w-1 bg-neon-accent" />}
                          <span className={`uppercase text-sm font-black tracking-tight ${isMatch ? 'text-platinum' : 'text-white/30'}`}>{skill}</span>
                          {isMatch ? (
                            <div className="flex items-center gap-3">
                               <span className="text-neon-accent font-mono text-[9px] uppercase font-bold tracking-widest">VALIDATED</span>
                               <CheckCircle size={16} className="text-neon-accent" />
                            </div>
                          ) : (
                            <button 
                              onClick={() => navigate("/learning")}
                              className="flex items-center gap-3 group/btn"
                            >
                               <span className="text-burned-coral font-mono text-[9px] uppercase font-bold tracking-widest opacity-60 group-hover/btn:opacity-100 transition-opacity">BRIDGE_GAP</span>
                               <ChevronRight size={16} className="text-burned-coral/40 group-hover/btn:text-burned-coral" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </section>

                <section className="space-y-8">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white/5 border border-white/10 flex items-center justify-center">
                        <Zap className="text-white/40" size={24} />
                     </div>
                     <div>
                        <h4 className="text-[10px] uppercase font-mono tracking-[0.4em] text-white/40">Bonus Vectors</h4>
                        <p className="text-xl font-black uppercase italic italic tracking-tight">Preferred Capabilities</p>
                     </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {result.niceToHave.map(skill => (
                      <div key={skill} className="card-surface bg-white/[0.02] p-5 border-white/5 hover:bg-white/[0.04] transition-colors">
                        <span className="uppercase text-[10px] font-black font-mono text-white/30 tracking-tight">{skill}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </div>

              <div className="pt-12 border-t border-white/5">
                <button 
                  onClick={() => navigate("/learning")}
                  className="w-full bg-white text-charcoal hover:bg-white/90 py-6 font-black uppercase tracking-[0.4em] text-xs shadow-[0_0_50px_rgba(255,255,255,0.1)] transition-all flex items-center justify-center gap-4"
                >
                  <Brain size={20} />
                  GENERATE_LEARNING_MATRIX
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
