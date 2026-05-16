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
      <div className="max-w-5xl mx-auto space-y-16">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4">
             <div className="inline-flex items-center gap-2 px-3 py-1 bg-neon-accent/10 border border-neon-accent/20 rounded-full">
                <ShieldCheck className="text-neon-accent" size={14} />
                <span className="text-[10px] font-mono text-neon-accent font-bold uppercase tracking-widest">Verified_Profile_v1.0</span>
             </div>
             <h1 className="text-6xl font-black italic tracking-tighter uppercase">{user.identity.fullName}</h1>
             <p className="label-mono opacity-40">Career Deployment Matrix // Node_Verified: {new Date().toLocaleDateString()}</p>
          </div>
          <div className="flex gap-4">
             <button className="btn-secondary flex items-center gap-3 px-6 py-4">
                <Share2 size={18} />
                SHARE_IDENTITY
             </button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <section className="space-y-8">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-black italic uppercase tracking-widest flex items-center gap-4">
                   <div className="w-2 h-2 bg-neon-accent rounded-full animate-pulse" />
                   Verified_Capabilities
                </h2>
                <button 
                  onClick={() => setVisibility(v => ({...v, skills: !v.skills}))}
                  className="text-white/20 hover:text-white transition-colors"
                >
                  {visibility.skills ? <Eye size={16} /> : <EyeOff size={16} />}
                </button>
              </div>

              {visibility.skills && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                   {(user.hardSkills || []).map(skill => (
                     <div key={skill} className="card-surface p-6 flex justify-between items-center group hover:border-white/10 transition-all bg-surface-matte/40">
                        <span className="font-mono text-xs uppercase text-white/60 tracking-widest">{skill}</span>
                        <Award className="text-neon-accent opacity-0 group-hover:opacity-100 transition-all" size={16} />
                     </div>
                   ))}
                </div>
              )}
            </section>

            <section className="space-y-8">
               <h2 className="text-xl font-black italic uppercase tracking-widest">External_Integrations</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { label: "LinkedIn_Neural_Sync", icon: <Globe size={18} />, status: "CONNECTED" },
                    { label: "GitHub_Repo_Audit", icon: <LinkIcon size={18} />, status: "VERIFIED" }
                  ].map(sync => (
                    <div key={sync.label} className="card-surface p-6 flex justify-between items-center border border-white/5 bg-black/20">
                       <div className="flex items-center gap-4">
                          <div className="text-white/20">{sync.icon}</div>
                          <span className="text-[10px] font-mono uppercase tracking-widest">{sync.label}</span>
                       </div>
                       <span className="text-[10px] font-mono text-neon-accent font-bold tracking-widest">{sync.status}</span>
                    </div>
                  ))}
               </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-12">
             <div className="card-surface p-8 bg-neon-accent/5 border border-neon-accent/20 space-y-6">
                <h3 className="label-mono text-neon-accent font-bold">RECRUITER_ACTION</h3>
                <p className="text-[11px] font-mono text-white/40 leading-relaxed uppercase">Direct deployment of this candidate bypasses stage-1 screening thanks to verified skill matrices.</p>
                <button className="w-full btn-primary py-4 text-[10px]">REQUEST_INTERVIEW</button>
                <button className="w-full py-4 border border-white/5 text-[10px] font-mono uppercase tracking-widest hover:bg-white hover:text-charcoal transition-all">Download_Verified_PDF</button>
             </div>

             <div className="space-y-4">
                <h3 className="label-mono opacity-20">SYSTEM_LOG</h3>
                <div className="font-mono text-[9px] text-white/10 space-y-1">
                   <p>[09:21:44] PROFILE_PUBLISHED</p>
                   <p>[09:22:12] SKILL_RADAR_UPDATED</p>
                   <p>[10:04:55] 3_RECRUITER_VIEWS_LOGGED</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
