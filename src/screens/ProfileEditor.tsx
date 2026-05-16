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
    <div className="min-h-screen bg-charcoal p-8 lg:p-20 space-y-16">
      <header className="flex justify-between items-end max-w-5xl mx-auto border-b border-white/5 pb-12">
        <div className="space-y-4">
           <h1 className="text-5xl font-black italic tracking-tighter uppercase">PROFILE_EDITOR</h1>
           <p className="label-mono opacity-40 italic">"Manual override of verified career nodes..."</p>
        </div>
        <button 
          onClick={handleSave}
          className="btn-primary px-8 py-4 flex items-center gap-3 shadow-glow"
        >
           <Save size={18} />
           PERSIST_CHANGES
        </button>
      </header>

      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Core Identity */}
        <section className="space-y-8">
           <h2 className="text-xl font-black italic tracking-widest uppercase flex items-center gap-4">
              <User className="text-white/20" /> Identity_Core
           </h2>
           <div className="space-y-6">
              <div className="space-y-2">
                 <label className="label-mono opacity-40">FULL_NAME</label>
                 <input 
                   className="terminal-input w-full"
                   value={profile.identity.fullName}
                   onChange={e => setProfile({...profile, identity: {...profile.identity, fullName: e.target.value}})}
                 />
              </div>
              <div className="space-y-2">
                 <label className="label-mono opacity-40">COMM_NODE (EMAIL)</label>
                 <input 
                   className="terminal-input w-full"
                   value={profile.identity.email}
                   onChange={e => setProfile({...profile, identity: {...profile.identity, email: e.target.value}})}
                 />
              </div>
           </div>
        </section>

        {/* Status Warning */}
        <div className="p-8 bg-amber-500/5 border border-amber-500/20 rounded-2xl space-y-4">
           <div className="flex items-center gap-3 text-amber-500">
              <AlertCircle size={20} />
              <h3 className="label-mono font-bold tracking-widest">VERIFICATION_NOTICE</h3>
           </div>
           <p className="text-[10px] font-mono text-amber-500/60 uppercase leading-relaxed font-bold">
              MANUAL MODIFICATIONS WILL BE MARKED AS "SELF-REPORTED" IN THE PUBLIC SHOWCASE UNLESS VERIFIED THROUGH RECURSIVE ASSESSMENT NODES.
           </p>
        </div>

        {/* Skill Management */}
        <section className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-16">
           <div className="space-y-8">
              <h3 className="label-mono text-neon-accent font-bold tracking-widest uppercase">Technology_Stack</h3>
              <div className="flex flex-wrap gap-2">
                 {profile.hardSkills.map(skill => (
                   <div key={skill} className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded font-mono text-[10px] uppercase group transition-all hover:border-red-500/50">
                      {skill}
                      <button onClick={() => removeSkill("hard", skill)} className="text-white/20 group-hover:text-red-500"><X size={12} /></button>
                   </div>
                 ))}
                 <div className="flex items-center gap-2">
                    <input 
                      placeholder="Add Node..."
                      className="bg-transparent border-b border-white/10 outline-none text-[10px] font-mono py-1 w-24 focus:border-neon-accent transition-all"
                      value={tempSkill}
                      onChange={e => setTempSkill(e.target.value)}
                      onKeyPress={e => e.key === 'Enter' && addSkill("hard")}
                    />
                    <button onClick={() => addSkill("hard")} className="text-neon-accent"><Plus size={14} /></button>
                 </div>
              </div>
           </div>

           <div className="space-y-8">
              <h3 className="label-mono text-white/20 font-bold tracking-widest uppercase">Behavioral_Vectors</h3>
              <div className="flex flex-wrap gap-2">
                 {profile.softSkills.map(skill => (
                   <div key={skill} className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded font-mono text-[10px] uppercase group transition-all hover:border-red-500/50">
                      {skill}
                      <button onClick={() => removeSkill("soft", skill)} className="text-white/20 group-hover:text-red-500"><X size={12} /></button>
                   </div>
                 ))}
              </div>
           </div>
        </section>
      </div>
    </div>
  );
}
