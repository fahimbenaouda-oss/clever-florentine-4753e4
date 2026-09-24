import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Zap, Flame, Award, Shield, ArrowRight, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';

export function OnboardingModal() {
  const {
    showOnboarding,
    setShowOnboarding,
    onboardingStep,
    setOnboardingStep,
    setShowQuestionnaire,
    resetToLucasDemo,
  } = useApp();

  if (!showOnboarding) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="w-full max-w-md bg-[#0d121f] border border-cyan-500/30 rounded-3xl p-6 sm:p-8 text-white relative shadow-[0_0_50px_rgba(0,240,255,0.25)] overflow-hidden">
        {/* Glow behind modal */}
        <div className="absolute -top-20 -right-20 w-44 h-44 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-44 h-44 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-mono text-cyan-400 uppercase tracking-widest font-bold">
              LEVEL UP // PROTOCOLE
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  onboardingStep === step
                    ? 'w-7 bg-cyan-400 shadow-[0_0_8px_#00F0FF]'
                    : onboardingStep > step
                    ? 'w-3 bg-emerald-400'
                    : 'w-3 bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        {/* SCREEN 1 */}
        {onboardingStep === 1 && (
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-cyan-500/20 via-blue-500/20 to-purple-500/20 border border-cyan-400/40 flex items-center justify-center glow-cyan">
              <Zap className="w-10 h-10 text-cyan-400 animate-pulse" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300">
                L'ENTRAÎNEMENT DEVIENT UN JEU
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight font-heading text-white">
                Ton entraînement.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400">
                  Ton niveau. Ton aventure.
                </span>
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed max-w-sm mx-auto">
                Un coach sportif intelligent qui adapte chaque séance à tes objectifs, ton énergie et ton matériel, sans jamais de culpabilisation.
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setOnboardingStep(2)}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all cursor-pointer"
              >
                <span>Découvrir la progression</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2 */}
        {onboardingStep === 2 && (
          <div className="space-y-6 animate-fadeIn">
            <div className="text-center space-y-2">
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                SYSTÈME RPG INTÉGRÉ
              </span>
              <h2 className="text-2xl font-bold font-heading text-white">
                Chaque séance te fait progresser.
              </h2>
              <p className="text-slate-300 text-xs">
                La régularité est récompensée. Pas de pesée intrusive, uniquement ta constance et tes accomplissements.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-2xl bg-[#121929] border border-cyan-500/20 flex flex-col items-start gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Points d'XP</h4>
                  <p className="text-[11px] text-slate-400">+50 XP par exercice, +300 XP par victoire de séance</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#121929] border border-purple-500/20 flex flex-col items-start gap-2">
                <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Niveaux & Rangs</h4>
                  <p className="text-[11px] text-slate-400">Passe de Cadet à Initié Cyber et Débloque des titres</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#121929] border border-amber-500/20 flex flex-col items-start gap-2">
                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                  <Shield className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Badges Rares</h4>
                  <p className="text-[11px] text-slate-400">Succès débloquables : Guerrier, Endurance, Premier pas</p>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#121929] border border-red-500/20 flex flex-col items-start gap-2">
                <div className="p-2 rounded-xl bg-red-500/20 text-red-400">
                  <Flame className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">Séries de Flammes</h4>
                  <p className="text-[11px] text-slate-400">Maintiens ta cadence et protège ta série active</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setOnboardingStep(1)}
                className="py-3 px-4 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-700 cursor-pointer"
              >
                Retour
              </button>
              <button
                onClick={() => setOnboardingStep(3)}
                className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-bold text-sm flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,240,255,0.4)] cursor-pointer"
              >
                <span>Continuer</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3 */}
        {onboardingStep === 3 && (
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-emerald-500/20 via-cyan-500/20 to-blue-500/20 border border-emerald-400/40 flex items-center justify-center glow-emerald">
              <Sparkles className="w-10 h-10 text-emerald-400 animate-pulse" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                INITIALISATION DU JEU
              </span>
              <h2 className="text-3xl font-extrabold font-heading text-white">
                Prêt à commencer ?
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Configure ton profil en 3 minutes pour obtenir ton premier programme IA sur-mesure ou explore directement avec le profil préconfiguré de Lucas (Niveau 7).
              </p>
            </div>

            <div className="space-y-3 pt-3">
              <button
                onClick={() => {
                  setShowOnboarding(false);
                  setShowQuestionnaire(true);
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-400 via-teal-400 to-emerald-400 hover:brightness-110 text-black font-extrabold text-sm flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.4)] cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Créer mon profil</span>
              </button>

              <button
                onClick={() => {
                  resetToLucasDemo();
                  setShowOnboarding(false);
                }}
                className="w-full py-3 px-6 rounded-2xl bg-slate-800/80 hover:bg-slate-700/80 border border-cyan-500/20 text-cyan-300 font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Se connecter (Compte Démo Lucas – Niveau 7)</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
