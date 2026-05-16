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
      title: "Your Account",
      icon: User,
      items: [
        { label: "Full Name", value: user.identity.fullName },
        { label: "Email Address", value: user.identity.email },
        { label: "Phone Number", value: user.identity.phone },
        { label: "LinkedIn Connection", value: "Verified" }
      ]
    },
    {
      title: "Plan & Billing",
      icon: Crown,
      items: [
        { label: "Current Plan", value: tier, isAccent: true },
        { label: "Next Billing Date", value: "May 24, 2026" },
        { label: "Usage Credits", value: "442 / 500" }
      ],
      action: { label: "Manage Plan", onClick: () => navigate("/checkout") }
    },
    {
      title: "Security & AI",
      icon: Shield,
      items: [
        { label: "AI Update Frequency", value: "Real-time" },
        { label: "Data Safety", value: "Encrypted" },
        { label: "Privacy Status", value: "Active" }
      ]
    }
  ];

  return (
    <div className="p-8 lg:p-12 max-w-4xl mx-auto space-y-16">
      <header className="space-y-4">
        <h1 className="text-6xl font-black tracking-tight leading-none uppercase">Account<br/><span className="text-neon-accent">Settings</span></h1>
        <p className="text-white/40 font-medium italic">Manage your account, subscription, and privacy settings in one place.</p>
      </header>

      <div className="space-y-16 pb-24">
        {sections.map((section, idx) => (
          <section key={section.title} className="space-y-8">
            <div className="flex items-center gap-4 border-b border-white/10 pb-6">
              <div className="w-12 h-12 bg-neon-accent/10 rounded-2xl flex items-center justify-center border border-neon-accent/20">
                <section.icon size={24} className="text-neon-accent" />
              </div>
              <h3 className="text-sm font-black tracking-[0.4em] uppercase text-white/60">{section.title.replace(/_/g, ' ')}</h3>
            </div>

            <div className="card-surface bg-white/[0.02] border border-white/5 divide-y divide-white/5 rounded-[2rem] overflow-hidden shadow-2xl">
               {section.items.map(item => (
                 <div key={item.label} className="p-8 flex justify-between items-center group hover:bg-white/[0.03] transition-all">
                    <span className="text-[10px] font-bold uppercase text-white/20 group-hover:text-white/40 tracking-widest">{item.label}</span>
                    <span className={`text-sm font-bold tracking-tight uppercase ${item.isAccent ? 'text-neon-accent' : 'text-white'}`}>
                      {item.value}
                    </span>
                 </div>
               ))}
            </div>

            {section.action && (
              <button 
                onClick={section.action.onClick}
                className="btn-primary w-full py-6 rounded-2xl text-xs font-black tracking-widest uppercase shadow-2xl shadow-neon-accent/10"
              >
                {section.action.label}
              </button>
            )}
          </section>
        ))}

        <section className="pt-10 border-t border-white/10">
           <button 
            onClick={logout}
            className="w-full flex items-center justify-between p-8 card-surface border-burned-coral/20 bg-burned-coral/[0.03] hover:bg-burned-coral/[0.08] group transition-all duration-300 rounded-3xl shadow-xl"
           >
              <div className="flex items-center gap-6">
                 <div className="w-12 h-12 bg-burned-coral/10 rounded-2xl flex items-center justify-center border border-burned-coral/20 group-hover:scale-110 transition-transform">
                    <LogOut className="text-burned-coral" size={24} />
                 </div>
                 <span className="text-sm font-black uppercase tracking-widest text-burned-coral">Sign Out</span>
              </div>
              <ChevronRight className="text-burned-coral/20 group-hover:translate-x-2 transition-all" size={20} />
           </button>
        </section>
      </div>

      <footer className="text-center">
         <p className="text-[10px] font-bold text-white/10 uppercase tracking-[0.4em]">Internly AI v1.0.0</p>
      </footer>
    </div>
  );
}
