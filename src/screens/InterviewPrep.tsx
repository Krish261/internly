import { motion, AnimatePresence } from "framer-motion";
import { useApp } from "../context/AppContext";
import { Brain, MessageSquare, ShieldCheck, Zap, HelpCircle, ChevronRight, Play, X, Send, Loader2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { api } from "../services/api";

export default function InterviewPrep() {
  const { user } = useApp();
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [currentInput, setCurrentInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages]);

  const questions = [
    { q: "Walk me through a difficult project and how you handled it.", type: "TECHNICAL" },
    { q: "How do you handle changes to a project mid-way through?", type: "STRATEGY" },
    { q: "Describe your process for making sure a resume is easy to read.", type: "EXECUTION" },
    { q: "What is your philosophy on modern automation?", type: "INNOVATION" },
    { q: "How do you make sure your skills are up to date?", type: "SKILL CHECK" }
  ];

  const startMockSession = async () => {
    setIsChatOpen(true);
    if (chatMessages.length === 0) {
      setIsTyping(true);
      try {
        const res = await api.interviewChat([{ role: 'user', content: 'Hello' }], user, "Senior Product Manager");
        setChatMessages([{ role: 'ai', content: res.response }]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsTyping(false);
      }
    }
  };

  const handleSendMessage = async () => {
    if (!currentInput.trim() || isTyping) return;
    const newMessages = [...chatMessages, { role: 'user', content: currentInput } as const];
    setChatMessages(newMessages);
    setCurrentInput("");
    setIsTyping(true);
    try {
      const res = await api.interviewChat(newMessages, user, "Senior Product Manager");
      setChatMessages([...newMessages, { role: 'ai', content: res.response }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-charcoal p-8 lg:p-20 space-y-16 max-w-7xl mx-auto">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
        <div className="space-y-6">
           <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-neon-accent/10 border border-neon-accent/20 rounded-full text-neon-accent text-[11px] font-bold uppercase tracking-widest">
              <Zap size={14} /> AI Predicted Questions
           </div>
           <h1 className="text-6xl font-black tracking-tight leading-none uppercase">Interview<br/><span className="text-neon-accent">Prep</span></h1>
           <p className="text-white/40 font-medium max-w-md">Analyzing Job Description: <span className="text-white">Senior Product Manager @ Cyberdyne Systems</span></p>
        </div>
        <button 
          onClick={startMockSession}
          className="btn-primary px-12 py-6 rounded-[2rem] flex items-center gap-4 shadow-2xl shadow-neon-accent/20 transition-all hover:scale-[1.02] text-sm font-bold tracking-widest"
        >
           <Play size={24} />
           Start Mock Session
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Question List */}
        <div className="lg:col-span-2 space-y-5">
           {questions.map((item, i) => (
             <motion.div 
               key={i}
               onClick={() => setActiveQuestion(i)}
               className={`card-surface p-10 cursor-pointer transition-all duration-300 rounded-[2.5rem] border-white/5 shadow-xl ${activeQuestion === i ? 'bg-neon-accent/[0.08] border-neon-accent/40 shadow-neon-accent/5 scale-[1.02]' : 'bg-white/[0.02] hover:bg-white/[0.04] hover:border-white/10'}`}
             >
                <div className="flex justify-between items-start mb-6">
                   <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] font-bold text-white/40 uppercase tracking-widest group-hover:text-neon-accent transition-colors">
                      {item.type.replace(/_/g, ' ')}
                   </div>
                   <span className="text-white/10 font-black text-xl">#{String(i + 1).padStart(2, '0')}</span>
                </div>
                <p className={`text-2xl font-black tracking-tight leading-snug transition-all ${activeQuestion === i ? 'text-white' : 'text-white/30'}`}>
                   "{item.q}"
                </p>
             </motion.div>
           ))}
        </div>

        {/* AI Simulator Guidance */}
        <div className="space-y-8">
           <div className="card-surface p-10 bg-white/[0.01] border border-white/10 rounded-[2.5rem] space-y-10 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <Brain size={120} />
              </div>
              <div className="flex items-center gap-4 relative z-10">
                 <div className="w-12 h-12 bg-neon-accent/10 border border-neon-accent/20 rounded-2xl flex items-center justify-center">
                    <Brain className="text-neon-accent" size={28} />
                 </div>
                 <h3 className="text-sm font-bold tracking-[0.2em] uppercase text-white/60">Interview Coach</h3>
              </div>
              <div className="space-y-8 relative z-10">
                 <p className="text-sm font-medium text-white/40 leading-relaxed uppercase tracking-widest">
                    This company values <span className="text-neon-accent font-bold">critical thinking</span> and <span className="text-neon-accent font-bold">scale</span>.
                 </p>
                 <div className="p-8 bg-white/[0.03] rounded-3xl space-y-6 border border-white/5 shadow-inner">
                    <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Suggested Talking Points:</h4>
                    <ul className="space-y-4">
                       {["Focus on system-wide impacts", "Highlight quantified efficiency wins", "Showcase collaborative leadership"].map(point => (
                         <li key={point} className="flex items-start gap-4 text-xs font-medium text-white/30 leading-snug">
                            <div className="w-1.5 h-1.5 bg-neon-accent rounded-full mt-1.5 shrink-0" />
                            {point}
                         </li>
                       ))}
                    </ul>
                 </div>
              </div>
           </div>

           <div className="p-10 border border-white/10 rounded-[2rem] bg-white/[0.01] flex justify-between items-center group cursor-pointer hover:bg-white/[0.03] transition-all duration-300">
              <div className="space-y-2">
                 <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Need more practice?</p>
                 <p className="text-sm font-black text-neon-accent uppercase tracking-widest transition-transform group-hover:translate-x-1">Get More Questions</p>
              </div>
              <ChevronRight className="text-white/10 group-hover:text-neon-accent group-hover:translate-x-3 transition-all" size={24} />
           </div>
        </div>
      </div>
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-charcoal/90 backdrop-blur-xl z-50 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-4xl h-[80vh] bg-surface-matte border border-white/10 rounded-[3rem] overflow-hidden flex flex-col shadow-2xl"
            >
              <header className="p-8 border-b border-white/5 flex justify-between items-center bg-white/[0.02]">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-neon-accent/10 border border-neon-accent/20 rounded-2xl flex items-center justify-center">
                    <Brain className="text-neon-accent" size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black uppercase tracking-tight">Mock Interview Session</h3>
                    <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest leading-none">Interviewer: Internly AI</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:bg-burned-coral/20 hover:text-burned-coral transition-all"
                >
                  <X size={24} />
                </button>
              </header>

              <div className="flex-1 overflow-y-auto p-10 space-y-8 custom-scrollbar">
                {chatMessages.map((msg, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: msg.role === 'ai' ? -20 : 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className={`flex ${msg.role === 'ai' ? 'justify-start' : 'justify-end'}`}
                  >
                    <div className={`max-w-[80%] p-8 rounded-[2rem] text-sm font-medium leading-relaxed shadow-lg ${msg.role === 'ai' ? 'bg-white/[0.03] border border-white/5 rounded-tl-none text-white/80' : 'bg-neon-accent text-charcoal rounded-tr-none font-bold'}`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white/[0.03] border border-white/5 p-6 rounded-[2rem] rounded-tl-none">
                      <Loader2 className="animate-spin text-neon-accent" size={20} />
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <footer className="p-8 bg-white/[0.02] border-t border-white/5">
                <div className="flex gap-4">
                  <input 
                    type="text"
                    value={currentInput}
                    onChange={(e) => setCurrentInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your response..."
                    className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-neon-accent transition-all text-sm"
                  />
                  <button 
                    onClick={handleSendMessage}
                    disabled={isTyping}
                    className="w-16 h-16 bg-neon-accent text-charcoal rounded-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg shadow-neon-accent/20 disabled:opacity-50"
                  >
                    <Send size={24} />
                  </button>
                </div>
              </footer>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
