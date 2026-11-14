import React from 'react';
import { 
  LayoutDashboard, 
  User, 
  Cpu, 
  Target, 
  Compass, 
  Milestone, 
  CheckSquare, 
  TrendingUp, 
  MessageSquare, 
  Terminal,
  Sparkles,
  ChevronRight
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: null },
  { id: 'profile', label: 'Learner Profile', icon: User, badge: null },
  { id: 'digital-twin', label: 'AI Digital Twin', icon: Cpu, badge: 'Live' },
  { id: 'skill-gaps', label: 'Skill Gap Analyzer', icon: Target, badge: null },
  { id: 'career-matching', label: 'Career Matching', icon: Compass, badge: null },
  { id: 'roadmap', label: 'Adaptive Roadmap', icon: Milestone, badge: null },
  { id: 'assessment-lab', label: 'AI Assessment Lab', icon: CheckSquare, badge: 'Quiz' },
  { id: 'analytics', label: 'Progress Analytics', icon: TrendingUp, badge: null },
  { id: 'mentor', label: 'AI Career Mentor', icon: MessageSquare, badge: null },
  { id: 'command-center', label: 'Agent Command Center', icon: Terminal, badge: '8 Agents' },
];

export default function Sidebar({ activeTab, setActiveTab, mobileMenuOpen, setMobileMenuOpen }) {
  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setMobileMenuOpen) setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileMenuOpen && (
        <div 
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar container */}
      <aside className={`
        fixed lg:sticky top-0 lg:top-[61px] left-0 h-screen lg:h-[calc(100vh-61px)] 
        w-64 bg-navy-900 border-r border-white/10 z-50 lg:z-20
        flex flex-col justify-between p-4 transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Navigation Links */}
        <div className="space-y-1 overflow-y-auto pr-1">
          <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Platform Modules
          </div>

          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`
                  w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold
                  transition-all duration-150 group text-left
                  ${isActive 
                    ? 'bg-gradient-to-r from-brand-blue/20 to-brand-violet/20 text-white border border-brand-violet/30 shadow-glow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-navy-800/60'}
                `}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <div className={`p-1.5 rounded-lg transition-colors ${isActive ? 'bg-brand-violet text-white' : 'text-slate-400 group-hover:text-slate-200'}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="truncate">{item.label}</span>
                </div>

                <div className="flex items-center space-x-1">
                  {item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                      item.badge === 'Live' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                      item.badge === '8 Agents' ? 'bg-brand-indigo/20 text-brand-indigo border border-brand-indigo/30' :
                      'bg-brand-cyan/20 text-cyan-300 border border-cyan-400/30'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-brand-violet" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Bottom Agent Architecture Card */}
        <div className="pt-4 border-t border-white/5">
          <div className="p-3 rounded-xl bg-gradient-to-b from-navy-800 to-navy-850 border border-white/10 text-xs">
            <div className="flex items-center space-x-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-brand-cyan" />
              <span className="font-bold text-slate-200">Autonomous Mesh</span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed mb-2.5">
              8 coordinated specialized agents synchronizing your learning trajectory.
            </p>
            <button
              onClick={() => handleNavClick('command-center')}
              className="w-full py-1.5 px-2.5 rounded-lg bg-brand-violet/20 hover:bg-brand-violet/30 text-brand-violet font-semibold text-[11px] border border-brand-violet/30 transition text-center"
            >
              Inspect Agent Logs
            </button>
          </div>
        </div>

      </aside>
    </>
  );
}
