import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { AppProvider, useApp } from "./context/AppContext";
import Landing from "./screens/Landing";
import Onboarding from "./screens/Onboarding";
import AssessmentHub from "./screens/AssessmentHub";
import Dashboard from "./screens/Dashboard";
import JobAnalysis from "./screens/JobAnalysis";
import LearningMatrix from "./screens/LearningMatrix";
import ResumeBuilder from "./screens/ResumeBuilder";
import ApplyHub from "./screens/ApplyHub";
import Checkout from "./screens/Checkout";
import SettingsScreen from "./screens/SettingsScreen";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { 
  Zap, 
  LayoutDashboard, 
  Target, 
  FileText, 
  Briefcase, 
  Settings, 
  LogOut,
  Brain,
  Linkedin,
  Layers
} from "lucide-react";

import PublicProfile from "./screens/PublicProfile";
import MarketFeed from "./screens/MarketFeed";
import CoverLetter from "./screens/CoverLetter";
import InterviewPrep from "./screens/InterviewPrep";
import ProfileEditor from "./screens/ProfileEditor";
import PortfolioHub from "./screens/PortfolioHub";
import AICritique from "./screens/AICritique";
import UpskillNode from "./screens/UpskillNode";
import PortfolioShowcase from "./screens/PortfolioShowcase";

function Shell({ children }: { children: React.ReactNode }) {
  const { user, logout } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const isAuthPage = location.pathname === "/" || location.pathname === "/onboarding";

  if (isAuthPage) return <>{children}</>;

  const menuItems = [
    { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Briefcase, label: "Market", path: "/market" },
    { icon: Target, label: "Analyze", path: "/analyze" },
    { icon: Layers, label: "Portfolio", path: "/portfolio" },
    { icon: FileText, label: "Resume", path: "/resume" },
    { icon: Brain, label: "Interview", path: "/interview" },
    { icon: Settings, label: "Settings", path: "/settings" }
  ];

  return (
    <div className="flex min-h-screen bg-charcoal text-platinum">
      {/* Sidebar Navigation (Screen 07 Spec) */}
      <motion.aside 
        initial={false}
        animate={{ width: isExpanded ? 240 : 80 }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="fixed left-0 top-0 h-full bg-surface-matte border-r border-white/5 z-40 flex flex-col items-center py-8"
      >
        <div className="mb-12">
          <Zap className="text-neon-accent" size={32} />
        </div>

        <nav className="flex-1 w-full space-y-4 px-4 overflow-hidden">
          {menuItems.map(item => (
            <button 
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 p-3 rounded-lg transition-all group ${location.pathname === item.path ? 'bg-neon-accent text-charcoal shadow-[0_0_15px_rgba(0,255,204,0.3)]' : 'hover:bg-white/5 text-white/40 hover:text-white'}`}
            >
              <item.icon size={20} className="shrink-0" />
              <AnimatePresence>
                {isExpanded && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="font-mono text-[10px] uppercase font-bold tracking-widest whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
        </nav>

        <div className="mt-auto px-4 w-full">
           <button 
            onClick={logout}
            className={`w-full flex items-center gap-4 p-3 rounded-lg text-burned-coral hover:bg-burned-coral/10 transition-all ${!isExpanded && 'justify-center'}`}
           >
              <LogOut size={20} />
              {isExpanded && <span className="font-mono text-[10px] uppercase font-bold tracking-widest">Logout</span>}
           </button>
        </div>
      </motion.aside>

      <main className="flex-1 ml-[80px] min-h-screen overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

function ProtectedRoute({ children, minTier = "Bronze" }: { children: React.ReactNode, minTier?: string }) {
  const { user, tier } = useApp();
  
  if (!user) return <Navigate to="/" />;
  
  const tiers = ["Bronze", "Silver", "Gold"];
  if (tiers.indexOf(tier) < tiers.indexOf(minTier)) {
    return <Navigate to="/dashboard" />;
  }
  
  return <>{children}</>;
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <Shell>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Landing />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/assess" element={<ProtectedRoute><AssessmentHub /></ProtectedRoute>} />
          <Route path="/learning" element={<ProtectedRoute minTier="Silver"><LearningMatrix /></ProtectedRoute>} />
          <Route path="/analyze" element={<ProtectedRoute minTier="Silver"><JobAnalysis /></ProtectedRoute>} />
          <Route path="/market" element={<ProtectedRoute minTier="Silver"><MarketFeed /></ProtectedRoute>} />
          <Route path="/portfolio" element={<ProtectedRoute minTier="Silver"><PortfolioHub /></ProtectedRoute>} />
          <Route path="/critique" element={<ProtectedRoute minTier="Silver"><AICritique /></ProtectedRoute>} />
          <Route path="/upskill" element={<ProtectedRoute minTier="Silver"><UpskillNode /></ProtectedRoute>} />
          <Route path="/vault" element={<ProtectedRoute minTier="Gold"><PortfolioShowcase /></ProtectedRoute>} />
          <Route path="/resume" element={<ProtectedRoute minTier="Gold"><ResumeBuilder /></ProtectedRoute>} />
          <Route path="/apply" element={<ProtectedRoute minTier="Gold"><ApplyHub /></ProtectedRoute>} />
          <Route path="/cover-letter" element={<ProtectedRoute minTier="Gold"><CoverLetter /></ProtectedRoute>} />
          <Route path="/interview" element={<ProtectedRoute minTier="Gold"><InterviewPrep /></ProtectedRoute>} />
          <Route path="/profile/showcase" element={<ProtectedRoute><PublicProfile /></ProtectedRoute>} />
          <Route path="/profile/edit" element={<ProtectedRoute><ProfileEditor /></ProtectedRoute>} />
          <Route path="/checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsScreen /></ProtectedRoute>} />
        </Routes>
      </AnimatePresence>
    </Shell>
  );
}

export default function App() {
  return (
    <AppProvider>
      <div className="min-h-screen bg-charcoal text-platinum font-sans selection:bg-neon-accent selection:text-charcoal">
        <Router>
          <AnimatedRoutes />
        </Router>
      </div>
    </AppProvider>
  );
}
