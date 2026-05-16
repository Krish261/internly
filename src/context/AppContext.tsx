import React, { createContext, useContext, useState, useEffect } from "react";

export type Tier = "Bronze" | "Silver" | "Gold";

interface UserProfile {
  identity: {
    fullName: string;
    email: string;
    phone: string;
  };
  background: string;
  hardSkills: string[];
  softSkills: string[];
  assessments: Record<string, number>; // skill -> score
  jd?: string;
  mustHave?: string[];
  niceToHave?: string[];
  tailoredResume?: {
    tailoredBio: string;
    tailoredExperience: any[];
  };
}

interface AppContextType {
  user: UserProfile | null;
  tier: Tier;
  setUser: (user: UserProfile) => void;
  setTier: (tier: Tier) => void;
  logout: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUserState] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem("internly_user");
    return saved ? JSON.parse(saved) : null;
  });

  const [tier, setTierState] = useState<Tier>(() => {
    const saved = localStorage.getItem("internly_tier");
    return (saved as Tier) || "Bronze";
  });

  const setUser = (newUser: UserProfile) => {
    setUserState(newUser);
    localStorage.setItem("internly_user", JSON.stringify(newUser));
  };

  const setTier = (newTier: Tier) => {
    setTierState(newTier);
    localStorage.setItem("internly_tier", newTier);
  };

  const logout = () => {
    setUserState(null);
    setTierState("Bronze");
    localStorage.removeItem("internly_user");
    localStorage.removeItem("internly_tier");
  };

  return (
    <AppContext.Provider value={{ user, tier, setUser, setTier, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
