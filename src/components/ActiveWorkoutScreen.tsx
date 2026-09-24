import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  CheckCircle,
  SkipForward,
  HelpCircle,
  Zap,
  Flame,
  ShieldAlert,
  ChevronRight,
  Info,
  Volume2,
  VolumeX,
} from 'lucide-react';

export function ActiveWorkoutScreen() {
  const {
    isWorkoutActive,
    currentProgram,
    activeExerciseIndex,
    finishExercise,
    skipExercise,
    exitWorkout,
    workoutTimeElapsed,
  } = useApp();

  const [currentSet, setCurrentSet] = useState(1);
  const [timerSeconds, setTimerSeconds] = useState(45);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  const currentItem = currentProgram?.exercises?.[activeExerciseIndex];
  const currentExercise = currentItem?.exercise;
  const totalExercises = currentProgram?.exercises?.length || 1;

  // Reset exercise-specific local timer when active exercise changes
  useEffect(() => {
    if (currentItem?.durationSeconds && currentItem.durationSeconds > 0) {
      setTimerSeconds(currentItem.durationSeconds);
      setIsTimerRunning(true);
    } else {
      setTimerSeconds(currentItem?.restSeconds || 30);
      setIsTimerRunning(false);
    }
    setCurrentSet(1);
  }, [activeExerciseIndex, currentItem]);

  // Countdown timer effect
  useEffect(() => {
    let interval: any;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  if (!isWorkoutActive || !currentExercise) return null;

  const totalSets = currentItem?.sets || 3;
  const progressPercent = Math.round(((activeExerciseIndex + 1) / totalExercises) * 100);

  const formatTime = (totalSec: number) => {
    const mins = Math.floor(totalSec / 60);
    const secs = totalSec % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#06080e] flex flex-col text-white overflow-y-auto">
      {/* Top HUD Bar */}
      <div className="p-4 border-b border-slate-800 bg-[#0a0e19]/90 backdrop-blur sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={exitWorkout}
            className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
            title="Quitter la séance"
          >
            <X className="w-5 h-5" />
          </button>
          <div>
            <div className="text-[11px] font-mono text-cyan-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
              SÉANCE ACTIVE // {currentProgram.title}
            </div>
            <div className="text-xs text-slate-400 font-mono">
              Chrono total : <span className="text-white font-bold">{formatTime(workoutTimeElapsed)}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 rounded-xl bg-slate-800/80 text-slate-300 hover:text-white transition-colors"
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-cyan-400" /> : <VolumeX className="w-4 h-4 text-slate-500" />}
          </button>
          <div className="px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/40 text-cyan-300 font-mono text-xs font-bold">
            +50 XP / exo
          </div>
        </div>
      </div>

      {/* Progress Bar Header */}
      <div className="px-4 py-2 bg-slate-900/60 border-b border-slate-800/60">
        <div className="flex justify-between items-center text-xs mb-1.5 font-mono">
          <span className="text-slate-300 font-semibold">
            Exercice {activeExerciseIndex + 1} / {totalExercises}
          </span>
          <span className="text-cyan-400 font-bold">{progressPercent}% complété</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 rounded-full transition-all duration-500 shadow-[0_0_10px_#00F0FF]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Exercise Arena */}
      <div className="flex-1 flex flex-col max-w-md mx-auto w-full p-4 sm:p-6 justify-between space-y-6">
        {/* Phase Pill */}
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full border ${
              currentItem.phase === 'echauffement'
                ? 'bg-amber-500/15 border-amber-500/30 text-amber-300'
                : currentItem.phase === 'calme'
                ? 'bg-purple-500/15 border-purple-500/30 text-purple-300'
                : 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300'
            }`}
          >
            {currentItem.phase === 'echauffement'
              ? '⚡ Échauffement'
              : currentItem.phase === 'calme'
              ? '🧘 Retour au calme'
              : '🔥 Entraînement'}
          </span>

          <button
            onClick={() => setShowTipsModal(true)}
            className="flex items-center gap-1.5 text-xs text-cyan-400 hover:text-cyan-300 font-semibold py-1 px-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40 cursor-pointer"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Voir les conseils</span>
          </button>
        </div>

        {/* Exercise Visual Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-[#121829] to-[#0a0e1a] border-2 border-cyan-500/30 p-6 text-center shadow-[0_0_40px_rgba(0,240,255,0.15)] flex flex-col items-center">
          {/* Muscle Tag */}
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Cible : <span className="text-cyan-300 font-semibold">{currentExercise.muscleGroup}</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-heading text-white tracking-wide uppercase mb-3">
            {currentExercise.name}
          </h2>

          {/* Holographic Icon / Target Graphic */}
          <div className="w-28 h-28 my-3 rounded-full bg-cyan-500/10 border-2 border-cyan-400/50 flex items-center justify-center glow-cyan relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent animate-pulse" />
            <Flame className="w-12 h-12 text-cyan-400 fill-cyan-400/20 group-hover:scale-110 transition-transform" />
          </div>

          {/* Sets & Reps Target */}
          <div className="mt-2 inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-white font-mono font-bold text-sm">
            <span className="text-cyan-400">{currentItem.sets} séries</span>
            <span className="text-slate-500">×</span>
            <span className="text-emerald-400">{currentItem.reps}</span>
          </div>

          {/* Set Tracker Dots */}
          <div className="flex items-center gap-2 mt-4">
            {Array.from({ length: totalSets }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSet(idx + 1)}
                className={`px-3 py-1 rounded-lg text-xs font-mono font-bold border transition-all cursor-pointer ${
                  currentSet === idx + 1
                    ? 'bg-cyan-500 text-black border-cyan-400 shadow-[0_0_10px_#00F0FF]'
                    : idx + 1 < currentSet
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
              >
                Série {idx + 1}
              </button>
            ))}
          </div>

          {/* Quick Instructions Snippet */}
          <p className="text-xs text-slate-300 leading-relaxed mt-4 max-w-sm px-2">
            {currentExercise.instructions}
          </p>
        </div>

        {/* Chrono / Timer Station */}
        <div className="p-4 rounded-2xl bg-[#0e1424] border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-lg text-cyan-400">
              {timerSeconds}s
            </div>
            <div>
              <div className="text-xs font-bold text-white">Chronomètre de tempo</div>
              <div className="text-[11px] text-slate-400">
                {isTimerRunning ? 'Temps en cours...' : 'En pause / repos'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="p-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold transition-all cursor-pointer"
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-black" />}
            </button>
            <button
              onClick={() => {
                setTimerSeconds(currentItem.durationSeconds || currentItem.restSeconds || 30);
                setIsTimerRunning(false);
              }}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Action Controls */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => {
              if (currentSet < totalSets) {
                setCurrentSet((s) => s + 1);
                setTimerSeconds(currentItem.restSeconds || 30);
                setIsTimerRunning(true);
              } else {
                finishExercise();
              }
            }}
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:brightness-110 text-black font-black text-base flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,240,255,0.45)] transition-all cursor-pointer"
          >
            <CheckCircle className="w-5 h-5 fill-black text-emerald-400" />
            <span>
              {currentSet < totalSets
                ? `Valider Série ${currentSet} (+20 XP)`
                : `Exercice terminé (+50 XP)`}
            </span>
          </button>

          <button
            onClick={skipExercise}
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <SkipForward className="w-3.5 h-3.5" />
            <span>Passer à l’exercice suivant</span>
          </button>
        </div>
      </div>

      {/* Tips & Safety Modal */}
      {showTipsModal && (
        <div className="fixed inset-0 z-60 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0e1322] border border-cyan-500/40 rounded-3xl p-6 text-white space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold font-heading text-lg text-white flex items-center gap-2">
                <Info className="w-5 h-5 text-cyan-400" />
                Conseils & Sécurité : {currentExercise.name}
              </h3>
              <button
                onClick={() => setShowTipsModal(false)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed">
              <div>
                <h4 className="font-bold text-cyan-300 font-mono uppercase text-[11px] mb-1">
                  Exécution optimale
                </h4>
                <p className="text-slate-300">{currentExercise.instructions}</p>
              </div>

              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <h4 className="font-bold text-rose-300 font-mono uppercase text-[11px] mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Erreurs fréquentes à éviter
                </h4>
                <p className="text-rose-100/90">{currentExercise.mistakesToAvoid}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <h4 className="font-bold text-amber-300 font-mono uppercase text-[11px] mb-1">
                  Contre-indications
                </h4>
                <p className="text-amber-100/90">{currentExercise.contraindications}</p>
              </div>
            </div>

            <button
              onClick={() => setShowTipsModal(false)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs cursor-pointer"
            >
              C'est compris, je continue !
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
