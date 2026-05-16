import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { 
  Zap, 
  Check, 
  Shield, 
  Star, 
  ArrowRight,
  ShieldCheck,
  CreditCard,
  Target,
  Brain,
  Linkedin
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { tier, setTier } = useApp();
  const navigate = useNavigate();

  const plans = [
    {
      id: "Bronze",
      name: "Standard",
      price: "299",
      description: "Basic skill verification and public profile.",
      features: [
        "AI-Driven Skill Identification",
        "Market Readiness Score",
        "Public Portfolio Page",
        "Mobile App Access"
      ],
      color: "text-orange-400",
      accent: "bg-orange-400/10",
      border: "border-orange-400/20"
    },
    {
      id: "Silver",
      name: "Professional",
      price: "599",
      description: "Target roles and close your skill gaps.",
      features: [
        "Unlimited Job Analysis",
        "Learning Plan Generator",
        "Competitive Benchmarking",
        "Skill Gap Alerts"
      ],
      color: "text-platinum",
      accent: "bg-white/5",
      border: "border-white/10",
      isPopular: true
    },
    {
      id: "Gold",
      name: "Premium",
      price: "1899",
      description: "Full application automation and AI tailoring.",
      features: [
        "ATS Resume Optimizer (10/mo)",
        "Application Automation",
        "LinkedIn Outreach Scripts",
        "Interview Simulator"
      ],
      color: "text-neon-accent",
      accent: "bg-neon-accent/5",
      border: "border-neon-accent/30 shadow-[0_0_50px_rgba(0,255,204,0.1)]"
    }
  ];

  const handleUpgrade = (id: string) => {
    setTier(id as any);
    navigate("/dashboard");
  };

  return (
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-20">
      <header className="text-center space-y-6 max-w-3xl mx-auto">
        <h1 className="text-6xl font-black tracking-tight leading-none uppercase">Elevate Your<br/><span className="text-neon-accent">Career</span></h1>
        <p className="text-lg text-white/40 font-medium max-w-xl mx-auto">Unlock the tools you need to land your dream job with AI-powered insights and automation.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {plans.map((plan) => (
          <motion.div 
            key={plan.id}
            whileHover={{ y: -12 }}
            className={`card-surface relative flex flex-col p-12 transition-all duration-300 rounded-[3rem] ${plan.border} ${plan.accent} shadow-2xl relative overflow-hidden`}
          >
            {plan.isPopular && (
              <div className="absolute top-0 left-1/2 -translate-x-1/2 px-6 py-2 bg-neon-accent text-charcoal text-[10px] font-black uppercase tracking-widest rounded-b-2xl shadow-lg">
                Most Popular
              </div>
            )}

            <div className="mb-10 space-y-3">
              <h3 className={`text-3xl font-black tracking-tight leading-none uppercase ${plan.color}`}>{plan.name}</h3>
              <p className="text-[11px] font-bold text-white/30 uppercase tracking-widest">{plan.description}</p>
            </div>

            <div className="mb-12">
              <div className="flex items-baseline gap-3">
                <span className="text-5xl font-black tracking-tighter">₹{plan.price}</span>
                <span className="text-xs font-bold opacity-20 uppercase tracking-widest">/ Total</span>
              </div>
            </div>

            <div className="flex-1 space-y-5 mb-12">
              {plan.features.map(f => (
                <div key={f} className="flex items-start gap-4">
                  <div className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${plan.id === 'Gold' ? 'bg-neon-accent/10 text-neon-accent' : 'bg-white/5 text-white/20'}`}>
                    <Check size={12} strokeWidth={4} />
                  </div>
                  <span className="text-[13px] font-medium text-white/60 leading-snug">{f}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleUpgrade(plan.id)}
              className={`w-full py-6 rounded-[2rem] text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 shadow-xl
                ${plan.id === 'Gold' ? 'btn-primary shadow-neon-accent/20' : 
                  plan.id === 'Silver' ? 'bg-white text-charcoal hover:bg-white/90 shadow-white/5' : 
                  'bg-white/[0.04] border border-white/5 hover:bg-white/[0.08] text-white/60'}
              `}
            >
              {tier === plan.id ? "ACTIVE" : "Select Plan"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Security Trust Bar */}
      <footer className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-16 border-t border-white/10">
        <div className="flex items-center gap-6">
           <div className="w-14 h-14 bg-neon-accent/10 rounded-2xl flex items-center justify-center border border-neon-accent/20">
              <ShieldCheck className="text-neon-accent" size={28} />
           </div>
           <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/80">Secure & Private</p>
              <p className="text-[10px] font-bold opacity-30 uppercase tracking-tight">256-bit AES Encryption</p>
           </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="w-14 h-14 bg-neon-accent/10 rounded-2xl flex items-center justify-center border border-neon-accent/20">
              <CreditCard className="text-neon-accent" size={28} />
           </div>
           <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/80">Simple Pricing</p>
              <p className="text-[10px] font-bold opacity-30 uppercase tracking-tight">Transparent Fee Structure</p>
           </div>
        </div>
        <div className="flex items-center gap-6">
           <div className="w-14 h-14 bg-neon-accent/10 rounded-2xl flex items-center justify-center border border-neon-accent/20">
              <Zap className="text-neon-accent" size={28} />
           </div>
           <div>
              <p className="text-sm font-bold uppercase tracking-widest text-white/80">AI Enhanced</p>
              <p className="text-[10px] font-bold opacity-30 uppercase tracking-tight">Real-time market insights</p>
           </div>
        </div>
      </footer>
    </div>
  );
}
