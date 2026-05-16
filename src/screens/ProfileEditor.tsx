import { motion } from "framer-motion";
import { useApp } from "../context/AppContext";
import { User, Shield, Info, Plus, X, Save, AlertCircle, CheckCircle2 } from "lucide-react";
import { useState } from "react";

export default function ProfileEditor() {
  const { user, setUser } = useApp();
  const [profile, setProfile] = useState(user);
  const [tempSkill, setTempSkill] = useState("");

  if (!profile) return null;

  const handleSave = () => {
    setUser(profile);
    // Show success state
  };

  const removeSkill = (type: "hard" | "soft", skill: string) => {
    if (type === "hard") {
      setProfile({ ...profile, hardSkills: profile.hardSkills.filter(s => s !== skill) });
    } else {
      setProfile({ ...profile, softSkills: profile.softSkills.filter(s => s !== skill) });
    }
  };

  const addSkill = (type: "hard" | "soft") => {
    if (!tempSkill) return;
    if (type === "hard") {
      setProfile({ ...profile, hardSkills: [...profile.hardSkills, tempSkill] });
    } else {
      setProfile({ ...profile, softSkills: [...profile.softSkills, tempSkill] });
    }
    setTempSkill("");
  };

  return (
    <div className="min-h-screen bg-charcoal p-8 lg:p-20 space-y-16 max-w-5xl mx-auto">
      <header className="flex justify-between items-end border-b border-white/10 pb-12">
        <div className="space-y-6">
           <h1 className="text-6xl font-black tracking-tight leading-none uppercase">Edit<br/><span className="text-neon-accent">Profile</span></h1>
           <p className="text-white/40 font-medium italic">Keep your professional profile and skill set up to date.</p>
        </div>
        <button 
          onClick={handleSave}
          className="btn-primary px-10 py-5 rounded-2xl flex items-center gap-4 shadow-2xl shadow-neon-accent/10 transition-all hover:scale-105 active:scale-95 font-bold tracking-widest text-xs uppercase"
        >
           <Save size={20} className="fill-current" />
           Save Changes
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Core Identity */}
        <section className="space-y-10">
           <h2 className="text-sm font-black uppercase tracking-[0.4em] flex items-center gap-5 text-white/60">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
                <User size={20} />
              </div> 
              Personal Info
           </h2>
           <div className="space-y-8">
              <div className="space-y-3">
                 <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Full Name</label>
                 <input 
                   className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 w-full text-sm font-medium focus:border-neon-accent focus:bg-white/[0.05] outline-none transition-all shadow-inner"
                   value={profile.identity.fullName}
                   onChange={e => setProfile({...profile, identity: {...profile.identity, fullName: e.target.value}})}
                 />
              </div>
              <div className="space-y-3">
                 <label className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Email Address</label>
                 <input 
                   className="bg-white/[0.03] border border-white/10 rounded-2xl p-5 w-full text-sm font-medium focus:border-neon-accent focus:bg-white/[0.05] outline-none transition-all shadow-inner"
                   value={profile.identity.email}
                   onChange={e => setProfile({...profile, identity: {...profile.identity, email: e.target.value}})}
                 />
              </div>
           </div>
        </section>

        {/* Status Warning */}
        <div className="p-10 bg-burned-coral/[0.03] border border-burned-coral/10 rounded-[2.5rem] space-y-6 shadow-xl h-fit">
           <div className="flex items-center gap-4 text-burned-coral">
              <AlertCircle size={28} />
              <h3 className="text-sm font-black tracking-widest uppercase">Verification Note</h3>
           </div>
           <p className="text-xs font-medium text-burned-coral/60 leading-relaxed uppercase tracking-widest">
              Manual changes will be noted as self-reported until verified through our skill assessment tools.
           </p>
        </div>

        {/* Skill Management */}
        <section className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-16">
           <div className="space-y-10">
              <h3 className="text-sm font-black text-neon-accent tracking-[0.4em] uppercase">Technical Skills</h3>
              <div className="flex flex-wrap gap-3">
                 {profile.hardSkills.map(skill => (
                   <div key={skill} className="flex items-center gap-3 px-5 py-3 bg-white/[0.03] border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest text-white/60 group transition-all hover:border-red-500/30 hover:bg-red-500/[0.02] shadow-sm">
                      {skill}
                      <button onClick={() => removeSkill("hard", skill)} className="text-white/10 group-hover:text-red-500 transition-colors"><X size={16} /></button>
                   </div>
                 ))}
                 <div className="flex items-center gap-4 bg-white/[0.02] border border-dashed border-white/20 rounded-2xl px-5 py-3 focus-within:border-neon-accent transition-all">
                    <input 
                      placeholder="Add New Skill..."
                      className="bg-transparent outline-none text-xs font-bold uppercase tracking-widest text-white/20 focus:text-white transition-all w-32 placeholder:text-white/10"
                      value={tempSkill}
                      onChange={e => setTempSkill(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && addSkill("hard")}
                    />
                    <button onClick={() => addSkill("hard")} className="text-neon-accent hover:scale-125 transition-transform"><Plus size={20} /></button>
                 </div>
              </div>
           </div>

           <div className="space-y-10">
              <h3 className="text-sm font-black text-white/20 tracking-[0.4em] uppercase">Behavioral Strengths</h3>
              <div className="flex flex-wrap gap-3">
                 {profile.softSkills.map(skill => (
                   <div key={skill} className="flex items-center gap-3 px-5 py-3 bg-white/[0.03] border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest text-white/60 group transition-all hover:border-red-500/30 hover:bg-red-500/[0.02] shadow-sm">
                      {skill}
                      <button onClick={() => removeSkill("soft", skill)} className="text-white/10 group-hover:text-red-500 transition-colors"><X size={16} /></button>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
