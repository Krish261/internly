import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { ShieldCheck, Share2, Eye, EyeOff, Award, Globe, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

export default function PublicProfile() {
  const { user } = useApp();
  const [visibility, setVisibility] = useState<Record<string, boolean>>({
    skills: true,
    experience: true,
    assessments: true
  });

  if (!user) return null;

  return (
    <div className="min-h-screen bg-charcoal p-8 lg:p-20">
      <div className="max-w-6xl mx-auto space-y-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10 border-b border-white/10 pb-16">
          <div className="space-y-6">
             <div className="inline-flex items-center gap-3 px-4 py-2 bg-neon-accent/10 border border-neon-accent/20 rounded-2xl">
                <ShieldCheck className="text-neon-accent" size={18} />
                <span className="text-[11px] font-bold text-neon-accent uppercase tracking-[0.2em]">Verified Profile</span>
             </div>
             <h1 className="text-7xl font-black tracking-tight leading-none uppercase">{user.identity.fullName}</h1>
             <p className="text-white/40 font-medium italic">Verified Professional Profile • Updated {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex gap-4">
             <button className="flex items-center gap-4 bg-white/5 border border-white/10 px-10 py-5 rounded-3xl text-sm font-bold uppercase tracking-widest text-white/80 hover:text-white hover:bg-white/10 transition-all shadow-xl">
                <Share2 size={20} />
                Share Profile
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-20">
            <section className="space-y-10">
              <div className="flex justify-between items-center border-b border-white/5 pb-6">
                <h2 className="text-sm font-black uppercase tracking-[0.4em] flex items-center gap-5 text-white/60">
                   <div className="w-3 h-3 bg-neon-accent rounded-full shadow-[0_0_15px_rgba(0,255,204,0.5)]" />
                   Verified Skills
                </h2>
                <button 
                  onClick={() => setVisibility(v => ({...v, skills: !v.skills}))}
                  className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 text-white/20 hover:text-white transition-all"
                >
                  {visibility.skills ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>

              {visibility.skills && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {(user.hardSkills || []).map(skill => (
                     <div key={skill} className="card-surface p-8 flex justify-between items-center group transition-all bg-white/[0.02] border border-white/5 rounded-[2rem] hover:border-neon-accent/30 shadow-lg">
                        <span className="text-sm font-bold uppercase text-white/60 tracking-widest group-hover:text-white">{skill}</span>
                        <div className="w-8 h-8 rounded-lg bg-neon-accent/10 flex items-center justify-center">
                          <Award className="text-neon-accent group-hover:scale-110 transition-transform" size={18} />
                        </div>
                     </div>
                   ))}
                </div>
              )}
            </section>

            <section className="space-y-10">
               <h2 className="text-sm font-black uppercase tracking-[0.4em] text-white/40 pb-6 border-b border-white/5">Connected Accounts</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "LinkedIn Profile", icon: <Globe size={20} />, status: "CONNECTED" },
                    { label: "GitHub Projects", icon: <LinkIcon size={20} />, status: "VERIFIED" }
                  ].map(sync => (
                    <div key={sync.label} className="card-surface p-8 flex justify-between items-center border border-white/5 bg-white/[0.01] rounded-[2rem] shadow-lg">
                       <div className="flex items-center gap-5">
                          <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-white/40">
                             {sync.icon}
                          </div>
                          <span className="text-xs font-bold uppercase tracking-widest text-white/60">{sync.label}</span>
                       </div>
                       <span className="text-[10px] font-black text-neon-accent tracking-widest bg-neon-accent/10 px-4 py-1.5 rounded-full border border-neon-accent/20">{sync.status}</span>
                    </div>
                  ))}
               </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
             <div className="card-surface p-10 bg-neon-accent/[0.03] border border-neon-accent/20 rounded-[3rem] space-y-10 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-neon-accent/5 blur-[80px] -mr-16 -mt-16" />
                <h3 className="text-sm font-black text-neon-accent tracking-[0.4em] uppercase">Quick Actions</h3>
                <p className="text-xs font-semibold text-white/40 leading-relaxed uppercase tracking-widest">This profile has been verified by Internly AI, ensuring the skill levels shown are accurate and ready for review.</p>
                <div className="space-y-4">
                  <button className="w-full btn-primary py-6 rounded-2xl text-[11px] font-black tracking-[0.2em] shadow-xl shadow-neon-accent/10">SEND MESSAGE</button>
                  <button className="w-full py-6 rounded-2xl border border-white/10 bg-white/5 text-[11px] font-black uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all shadow-xl">Get Resume</button>
                </div>
             </div>

             <div className="space-y-8 pl-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-white/10">Activity Feed</h3>
                <div className="space-y-6">
                   {[
                     { time: "09:21", event: "Profile Verified" },
                     { time: "10:04", event: "Ranked in Top 5%" },
                     { time: "11:30", event: "Profile Shared" }
                   ].map((log, i) => (
                     <div key={i} className="flex gap-4 items-center">
                        <span className="text-[9px] font-bold text-white/10 tracking-widest">{log.time}</span>
                        <div className="h-px flex-1 bg-white/[0.03]" />
                        <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">{log.event}</span>
                     </div>
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
