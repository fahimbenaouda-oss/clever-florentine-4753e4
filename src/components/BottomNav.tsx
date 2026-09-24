import React from 'react';
import { useApp, TabType } from '../context/AppContext';
import { Home, Dumbbell, Bot, Trophy, User, Play } from 'lucide-react';

export function BottomNav() {
  const { activeTab, setActiveTab, isWorkoutActive, startWorkout } = useApp();

  const navItems: { id: TabType; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'accueil', label: 'Accueil', icon: Home },
    { id: 'programme', label: 'Programme', icon: Dumbbell },
    { id: 'coach', label: 'Coach', icon: Bot },
    { id: 'classement', label: 'Classement', icon: Trophy },
    { id: 'profil', label: 'Profil', icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-[#07090f]/95 backdrop-blur-lg border-t border-cyan-500/20 safe-bottom">
      <div className="max-w-md mx-auto px-3 py-2 flex items-center justify-around">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition-all cursor-pointer relative ${
                isActive
                  ? 'text-cyan-400 font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 drop-shadow-[0_0_8px_#00F0FF]' : ''}`} />
                {isActive && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_6px_#00F0FF]" />
                )}
              </div>
              <span className="text-[10px] font-mono tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
