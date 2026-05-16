import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { 
  User, 
  Settings as SettingsIcon, 
  CreditCard, 
  Shield, 
  Bell, 
  Lock,
  ChevronRight,
  LogOut,
  ExternalLink,
  Crown
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SettingsScreen() {
  const { user, tier, logout } = useApp();
  const navigate = useNavigate();

  if (!user) return null;

  const sections = [
    {
      title: "Identity_Profile",
      icon: User,
      items: [
        { label: "Account Information", value: user.identity.fullName },
        { label: "Contact Email", value: user.identity.email },
        { label: "Phone Identifier", value: user.identity.phone },
        { label: "LinkedIn Endpoint", value: "Verified" }
      ]
    },
    {
      title: "Revenue_Tier",
      icon: Crown,
      items: [
        { label: "Current Subscription", value: tier, isAccent: true },
        { label: "Next Billing Cycle", value: "May 24, 2026" },
        { label: "System Credits", value: "442 / 500" }
      ],
      action: { label: "Manage Billing", onClick: () => navigate("/checkout") }
    },
    {
      title: "System_Protocols",
      icon: Shield,
      items: [
        { label: "AI Optimization Frequency", value: "Real-time" },
        { label: "Data Retention", value: "Encrypted" },
        { label: "Privacy Firewall", value: "Active" }
      ]
    }
  ];

  return (
    <div className="p-8 lg:p-12 max-w-4xl mx-auto space-y-12">
      <header className="space-y-2">
        <h1 className="text-4xl heading-bold">SYSTEM_SETTINGS</h1>
        <p className="label-mono italic">"Administrative interface for user protocols."</p>
      </header>

      <div className="space-y-12 pb-24">
        {sections.map((section, idx) => (
          <section key={section.title} className="space-y-6">
            <div className="flex items-center gap-3 border-b border-white/5 pb-4">
              <section.icon size={18} className="text-neon-accent" />
              <h3 className="label-mono font-bold uppercase tracking-widest">{section.title}</h3>
            </div>

            <div className="card-surface bg-surface-matte/40 divide-y divide-white/5">
               {section.items.map(item => (
                 <div key={item.label} className="p-6 flex justify-between items-center group hover:bg-white/[0.02] transition-colors">
                    <span className="text-[10px] font-mono uppercase text-white/40 group-hover:text-white/60 transition-colors uppercase tracking-widest">{item.label}</span>
                    <span className={`text-sm font-bold tracking-tight uppercase ${item.isAccent ? 'text-neon-accent italic' : 'text-white'}`}>
                      {item.value}
                    </span>
                 </div>
               ))}
            </div>

            {section.action && (
              <button 
                onClick={section.action.onClick}
                className="btn-primary w-full py-4 text-xs tracking-[0.2em] shadow-[0_0_20px_rgba(0,255,204,0.1)]"
              >
                {section.action.label}
              </button>
            )}
          </section>
        ))}

        <section className="pt-8 border-t border-white/5">
           <button 
            onClick={logout}
            className="w-full flex items-center justify-between p-6 card-surface border-burned-coral/20 bg-burned-coral/5 group hover:bg-burned-coral/10 transition-all"
           >
              <div className="flex items-center gap-4">
                 <LogOut className="text-burned-coral" size={20} />
                 <span className="text-sm font-black uppercase tracking-widest text-burned-coral">Terminate_Session</span>
              </div>
              <ChevronRight className="text-burned-coral/40" size={16} />
           </button>
        </section>
      </div>

      <footer className="text-center">
         <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.3em]">INTERNLY v4.2.0 • Build 99321</p>
      </footer>
    </div>
  );
}
