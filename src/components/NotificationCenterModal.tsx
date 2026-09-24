import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Bell, Zap, Flame, MessageSquare, Check, Sparkles, Heart } from 'lucide-react';

export function NotificationCenterModal() {
  const {
    showNotificationCenter,
    setShowNotificationCenter,
    notifications,
    markAllNotificationsRead,
  } = useApp();

  if (!showNotificationCenter) return null;

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-md bg-[#0e1322] border border-cyan-500/40 rounded-3xl p-5 sm:p-6 text-white relative shadow-[0_0_50px_rgba(0,240,255,0.2)]">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold font-heading text-base text-white">Centre de Notifications</h3>
              <p className="text-[10px] text-slate-400 font-mono">Encouragements & Statuts RPG</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markAllNotificationsRead}
              className="text-[11px] text-cyan-400 hover:underline font-semibold cursor-pointer"
            >
              Tout marquer lu
            </button>
            <button
              onClick={() => setShowNotificationCenter(false)}
              className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border transition-all ${
                item.read
                  ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                  : 'bg-cyan-950/30 border-cyan-500/40 text-white shadow-[0_0_15px_rgba(0,240,255,0.1)]'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-slate-800 mt-0.5 text-cyan-400 shrink-0">
                  {item.type === 'streak' ? (
                    <Flame className="w-4 h-4 text-amber-400" />
                  ) : item.type === 'coach' ? (
                    <Heart className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Zap className="w-4 h-4 text-cyan-400" />
                  )}
                </div>

                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-white">{item.title}</span>
                    <span className="text-[10px] font-mono text-slate-400">{item.timeAgo}</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{item.message}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Calming, Non-aggressive reminder card */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/30 text-xs text-purple-200 flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
            <p className="text-[11px] leading-snug">
              Nos notifications respectent ton rythme. Zéro culpabilisation : chaque seconde bougée est une victoire.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
