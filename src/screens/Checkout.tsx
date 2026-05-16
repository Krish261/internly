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
      name: "Bronze_Core",
      price: "299",
      description: "Fundamental skill verification and market identity.",
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
      name: "Silver_Tactical",
      price: "599",
      description: "Aggressive role targeting and skill gap coverage.",
      features: [
        "Unlimited Job Deconstruction",
        "Learning Matrix Generator",
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
      name: "Gold_Execution",
      price: "1899",
      description: "Full-scale application automation and expert tailoring.",
      features: [
        "ATS Tailoring Engine (10/mo)",
        "Automated Application Hub",
        "LinkedIn Outreach Scripts",
        "Interview Prep Terminal"
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
    <div className="p-8 lg:p-12 max-w-7xl mx-auto space-y-16">
      <header className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-5xl heading-bold">SELECT_DEPLOYMENT<br/><span className="text-neon-accent">PACKAGE</span></h1>
        <p className="label-mono text-white/40 leading-relaxed italic">"Scale your career trajectory with precise AI instrumentation."</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {plans.map((plan) => (
          <motion.div 
            key={plan.id}
            whileHover={{ y: -10 }}
            className={`card-surface relative flex flex-col p-8 ${plan.border} ${plan.accent}`}
          >
            {plan.isPopular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-white text-black text-[9px] font-black uppercase tracking-widest rounded">
                RECOMMENDED
              </div>
            )}

            <div className="mb-8">
              <h3 className={`text-2xl font-black heading-bold italic uppercase ${plan.color}`}>{plan.name}</h3>
              <p className="text-[10px] font-mono text-white/30 uppercase mt-1">{plan.description}</p>
            </div>

            <div className="mb-10">
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black italic">₹{plan.price}</span>
                <span className="text-[10px] font-mono opacity-40 uppercase">/ deployment</span>
              </div>
            </div>

            <div className="flex-1 space-y-4 mb-10">
              {plan.features.map(f => (
                <div key={f} className="flex items-center gap-3">
                  <Check size={16} className={plan.id === 'Gold' ? 'text-neon-accent' : 'text-white/20'} />
                  <span className="text-xs font-mono text-white/50 uppercase tracking-tight">{f}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleUpgrade(plan.id)}
              className={`w-full py-5 text-sm font-black uppercase tracking-[0.2em] transition-all
                ${plan.id === 'Gold' ? 'btn-primary shadow-2xl' : 
                  plan.id === 'Silver' ? 'bg-white text-black hover:bg-white/80' : 
                  'border border-white/10 hover:bg-white/5'}
              `}
            >
              {tier === plan.id ? "CURRENT_PACKAGE" : "INITIATE_UPGRADE"}
            </button>
          </motion.div>
        ))}
      </div>

      {/* Security Trust Bar */}
      <footer className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-white/5">
        <div className="flex items-center gap-4">
           <ShieldCheck className="text-neon-accent" size={32} />
           <div>
              <p className="label-mono text-xs">Payment_Secured</p>
              <p className="text-[10px] opacity-40 font-mono uppercase">256-bit AES Encryption</p>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <CreditCard className="text-neon-accent" size={32} />
           <div>
              <p className="label-mono text-xs">Dynamic_Pricing</p>
              <p className="text-[10px] opacity-40 font-mono uppercase">Transparent Fee Structure</p>
           </div>
        </div>
        <div className="flex items-center gap-4">
           <Star className="text-neon-accent" size={32} />
           <div>
              <p className="label-mono text-xs">Carrier_Optimized</p>
              <p className="text-[10px] opacity-40 font-mono uppercase">Verified Placement Engine</p>
           </div>
        </div>
      </footer>
    </div>
  );
}
