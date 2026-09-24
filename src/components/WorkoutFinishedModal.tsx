import React from 'react';
import { useApp } from '../context/AppContext';
import { Trophy, Zap, Clock, CheckCircle2, Flame, ArrowRight, Sparkles } from 'lucide-react';

export function WorkoutFinishedModal() {
  const {
    showWorkoutFinishedModal,
    closeFinishedModal,
    stats,
    currentProgram,
    workoutTimeElapsed,
  } = useApp();

  if (!showWorkoutFinishedModal) return null;

  const totalExercises = currentProgram?.exercises?.length || 8;
  const durationMins = Math.max(1, Math.round(workoutTimeElapsed / 60 || 28));
  const estimatedCalories = Math.round(durationMins * 7.5);

  const xpProgressPercent = Math.min(
    100,
    Math.round((stats.currentXp / stats.nextLevelXp) * 100)
  );

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#0c101d] border-2 border-emerald-500/50 rounded-3xl p-6 sm:p-8 text-white relative shadow-[0_0_60px_rgba(16,185,129,0.3)] text-center animate-fadeIn overflow-hidden">
        {/* Glow ambient backgrounds */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Victory Trophy Badge */}
        <div className="w-24 h-24 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-yellow-500/20 border-2 border-emerald-400/60 flex items-center justify-center glow-emerald mb-4">
          <Trophy className="w-12 h-12 text-emerald-400 drop-shadow-[0_0_12px_#10B981]" />
        </div>

        {/* Title */}
        <div className="space-y-1 mb-6">
          <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-widest">
            MISSION ACCOMPLIE // VICTOIRE
          </span>
          <h2 className="text-3xl font-black font-heading text-white tracking-wide">
            SÉANCE TERMINÉE !
          </h2>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-mono font-bold text-sm mt-1">
            <Zap className="w-4 h-4 fill-cyan-400 text-cyan-400" />
            <span>+{currentProgram?.xpReward || 300} XP GAGNÉS</span>
          </div>
        </div>

        {/* Workout Stats Grid */}
        <div className="grid grid-cols-3 gap-2.5 mb-6">
          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-center text-cyan-400 mb-1">
              <Clock className="w-4 h-4" />
            </div>
            <div className="text-lg font-mono font-bold text-white">{durationMins} min</div>
            <div className="text-[10px] text-slate-400">Durée réelle</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-center text-emerald-400 mb-1">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div className="text-lg font-mono font-bold text-white">
              {totalExercises}/{totalExercises}
            </div>
            <div className="text-[10px] text-slate-400">Exercices</div>
          </div>

          <div className="p-3 rounded-2xl bg-slate-900/80 border border-slate-800">
            <div className="flex items-center justify-center text-amber-400 mb-1">
              <Flame className="w-4 h-4" />
            </div>
            <div className="text-lg font-mono font-bold text-white">~{estimatedCalories}</div>
            <div className="text-[10px] text-slate-400">Calories est.</div>
          </div>
        </div>

        {/* Updated XP Progress */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-900 to-[#12192c] border border-cyan-500/30 mb-6 text-left">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-xs font-bold text-white font-heading">
              Niveau {stats.level} : {stats.levelTitle}
            </span>
            <span className="text-xs font-mono font-bold text-cyan-400">
              {stats.currentXp.toLocaleString()} / {stats.nextLevelXp.toLocaleString()} XP
            </span>
          </div>

          <div className="w-full h-3 rounded-full bg-slate-800 overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 rounded-full transition-all duration-700 shadow-[0_0_10px_#00F0FF]"
              style={{ width: `${xpProgressPercent}%` }}
            />
          </div>

          <div className="text-[11px] text-slate-400 mt-2 flex items-center justify-between">
            <span>Prochain palier dans {stats.nextLevelXp - stats.currentXp} XP</span>
            <span className="text-emerald-400 font-semibold">Série active : {stats.streakDays} jours 🔥</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={closeFinishedModal}
          className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 hover:brightness-110 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(16,185,129,0.5)] transition-all cursor-pointer"
        >
          <span>Continuer vers le Hub</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
