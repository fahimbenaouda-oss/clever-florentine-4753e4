import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Exercise } from '../data/exercises';
import {
  Zap,
  Play,
  RotateCcw,
  Clock,
  Shield,
  Layers,
  Info,
  Flame,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ShieldAlert,
  X,
} from 'lucide-react';

export function ProgramScreen() {
  const { currentProgram, startWorkout, setShowQuestionnaire, profile } = useApp();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const warmups = currentProgram.exercises.filter((e) => e.phase === 'echauffement');
  const mains = currentProgram.exercises.filter((e) => e.phase === 'entrainement');
  const cooldowns = currentProgram.exercises.filter((e) => e.phase === 'calme');

  return (
    <div className="space-y-5 pb-24 animate-fadeIn">
      {/* Program Hero Summary */}
      <div className="p-5 rounded-3xl bg-gradient-to-b from-[#131b2e] to-[#0c111e] border border-cyan-500/30 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase tracking-widest px-2.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            PROGRAMME ACTIF // IA GÉNERÉ
          </span>
          <button
            onClick={() => setShowQuestionnaire(true)}
            className="text-xs text-cyan-400 hover:underline font-mono flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Recalibrer</span>
          </button>
        </div>

        <div>
          <h1 className="text-2xl font-black font-heading text-white">
            {currentProgram.title}
          </h1>
          <p className="text-xs text-slate-300 mt-1 leading-relaxed">
            Généré d'après les paramètres de {profile.firstName} ({profile.fitnessLevel}, {profile.trainingLocation}, {currentProgram.equipment}).
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">Durée</div>
            <div className="font-bold text-white text-sm">{currentProgram.durationMinutes} min</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">Total exos</div>
            <div className="font-bold text-white text-sm">{currentProgram.exercises.length}</div>
          </div>
          <div className="p-2.5 rounded-xl bg-slate-900/80 border border-slate-800">
            <div className="text-[10px] text-slate-400">XP Prévus</div>
            <div className="font-bold text-cyan-400 text-sm">+{currentProgram.xpReward} XP</div>
          </div>
        </div>

        <button
          onClick={startWorkout}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:brightness-110 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
        >
          <Play className="w-4 h-4 fill-black" />
          <span>LANCER CETTE SÉANCE (+{currentProgram.xpReward} XP)</span>
        </button>
      </div>

      {/* PHASE 1: ÉCHAUFFEMENT */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_#F59E0B]" />
          <h2 className="text-sm font-bold font-heading text-amber-300 uppercase tracking-wider">
            Phase 1 : Échauffement ({warmups.length} exercices)
          </h2>
        </div>

        <div className="space-y-2">
          {warmups.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedExercise(item.exercise)}
              className="p-3.5 rounded-2xl bg-[#0e1322] border border-amber-500/20 hover:border-amber-400/50 transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-105 transition-transform">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-amber-300 transition-colors">
                    {item.exercise.name}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {item.durationSeconds ? `${item.durationSeconds}s d'effort` : `${item.sets} séries × ${item.reps}`} • Repos {item.restSeconds}s
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-cyan-400 font-bold">+{item.exercise.xpReward} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PHASE 2: ENTRAÎNEMENT */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_#00F0FF]" />
          <h2 className="text-sm font-bold font-heading text-cyan-300 uppercase tracking-wider">
            Phase 2 : Entraînement ({mains.length} exercices)
          </h2>
        </div>

        <div className="space-y-2">
          {mains.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedExercise(item.exercise)}
              className="p-3.5 rounded-2xl bg-[#0e1322] border border-cyan-500/20 hover:border-cyan-400/50 transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 group-hover:scale-105 transition-transform">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-cyan-300 transition-colors">
                    {item.exercise.name}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {item.sets} séries × {item.reps} • Repos {item.restSeconds}s
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-cyan-400 font-bold">+{item.exercise.xpReward} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PHASE 3: RETOUR AU CALME */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#A855F7]" />
          <h2 className="text-sm font-bold font-heading text-purple-300 uppercase tracking-wider">
            Phase 3 : Retour au calme ({cooldowns.length} exercices)
          </h2>
        </div>

        <div className="space-y-2">
          {cooldowns.map((item, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedExercise(item.exercise)}
              className="p-3.5 rounded-2xl bg-[#0e1322] border border-purple-500/20 hover:border-purple-400/50 transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-105 transition-transform">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-bold text-xs text-white group-hover:text-purple-300 transition-colors">
                    {item.exercise.name}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    {item.reps} • Respiration & étirement
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-mono text-cyan-400 font-bold">+{item.exercise.xpReward} XP</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* EXERCISE DETAIL MODAL */}
      {selectedExercise && (
        <div className="fixed inset-0 z-60 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#0d1220] border border-cyan-500/40 rounded-3xl p-6 text-white space-y-4 shadow-2xl animate-fadeIn">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                  {selectedExercise.muscleGroup}
                </span>
                <h3 className="font-bold font-heading text-lg text-white">
                  {selectedExercise.name}
                </h3>
              </div>
              <button
                onClick={() => setSelectedExercise(null)}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs leading-relaxed max-h-[60vh] overflow-y-auto pr-1">
              <div>
                <h4 className="font-bold text-cyan-300 font-mono uppercase text-[10px] mb-1">
                  Instructions détaillées
                </h4>
                <p className="text-slate-300">{selectedExercise.instructions}</p>
              </div>

              <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/30">
                <h4 className="font-bold text-rose-300 font-mono uppercase text-[10px] mb-1 flex items-center gap-1.5">
                  <ShieldAlert className="w-3.5 h-3.5" />
                  Erreurs à éviter
                </h4>
                <p className="text-rose-100/90">{selectedExercise.mistakesToAvoid}</p>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <h4 className="font-bold text-amber-300 font-mono uppercase text-[10px] mb-1">
                  Contre-indications
                </h4>
                <p className="text-amber-100/90">{selectedExercise.contraindications}</p>
              </div>
            </div>

            <button
              onClick={() => setSelectedExercise(null)}
              className="w-full py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs cursor-pointer"
            >
              Fermer la fiche
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
