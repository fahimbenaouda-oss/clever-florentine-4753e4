import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { UserProfile } from '../data/mockData';
import {
  Zap,
  ShieldAlert,
  ArrowRight,
  ArrowLeft,
  Check,
  Dumbbell,
  Home,
  Building2,
  TreePine,
  Clock,
  Sparkles,
  Heart,
  Target,
  Flame,
  Activity,
  CheckCircle2,
} from 'lucide-react';

export function QuestionnaireModal() {
  const {
    showQuestionnaire,
    setShowQuestionnaire,
    setProfile,
    setProgramFromProfile,
    setActiveTab,
    addXp,
  } = useApp();

  const [step, setStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  // Form State initialized with Lucas values by default
  const [formData, setFormData] = useState<UserProfile>({
    firstName: 'Lucas',
    age: 20,
    mainGoal: 'musculation',
    fitnessLevel: 'debutant',
    trainingLocation: 'maison',
    equipment: 'aucun',
    sessionsPerWeek: 3,
    preferredDuration: 30,
    favoriteActivities: 'Poids du corps, Calisthénie',
    physicalLimitations: '',
    healthDisclaimerAccepted: true,
  });

  if (!showQuestionnaire) return null;

  const handleNext = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);
    } else {
      // Finalize and generate program
      submitAndGenerate();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const submitAndGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setProfile(formData);
      setProgramFromProfile(formData);
      setIsGenerating(false);
      setShowQuestionnaire(false);
      setActiveTab('programme');
      addXp(150, 'Création de profil & questionnaire validé');
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="w-full max-w-lg bg-[#0e1322] border border-cyan-500/40 rounded-3xl p-5 sm:p-7 text-white relative shadow-[0_0_60px_rgba(0,240,255,0.25)] my-auto">
        {/* Decorative cyber lines */}
        <div className="absolute top-0 left-10 right-10 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />

        {isGenerating ? (
          <div className="py-14 text-center space-y-6">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center glow-cyan">
              <Sparkles className="w-10 h-10 text-cyan-400 animate-spin" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-heading text-white">
                Génération IA de ton Programme...
              </h3>
              <p className="text-sm text-cyan-300 font-mono">
                Analyse de tes objectifs [{formData.mainGoal.toUpperCase()}] & calibration sécurisée
              </p>
            </div>
            <div className="w-48 h-2 bg-slate-800 rounded-full mx-auto overflow-hidden">
              <div className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full animate-shimmer w-full" />
            </div>
          </div>
        ) : (
          <div>
            {/* Header / Step Bar */}
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[11px] font-mono font-bold text-cyan-400 tracking-wider uppercase">
                  QUESTIONNAIRE SPORTIF RAPIDE (3 MIN)
                </span>
                <h3 className="text-xl font-bold font-heading text-white">
                  {step === 1 && 'Identité du Joueur'}
                  {step === 2 && 'Objectif Principal'}
                  {step === 3 && 'Niveau & Lieu d’action'}
                  {step === 4 && 'Matériel & Disponibilités'}
                  {step === 5 && 'Sécurité & Préférences'}
                </h3>
              </div>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      step === i
                        ? 'w-6 bg-cyan-400 shadow-[0_0_8px_#00F0FF]'
                        : step > i
                        ? 'w-2 bg-emerald-400'
                        : 'w-2 bg-slate-700'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* STEP 1: Name and Age */}
            {step === 1 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Prénom du Guerrier / Joueur
                  </label>
                  <input
                    type="text"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    placeholder="Ex: Lucas"
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 focus:outline-none text-white font-medium text-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Âge (ans)
                  </label>
                  <input
                    type="number"
                    min="14"
                    max="99"
                    value={formData.age}
                    onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 20 })}
                    className="w-full px-4 py-3.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 focus:outline-none text-white font-medium text-sm transition-all"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Permet d'ajuster l'intensité cardiaque de récupération.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2: Main Goal */}
            {step === 2 && (
              <div className="space-y-3 animate-fadeIn">
                <p className="text-xs text-slate-300">
                  Quel est le boss final ou ton but d'entraînement principal ?
                </p>
                {[
                  { id: 'musculation', label: 'Prendre du muscle', desc: 'Développement de la masse & gain de force', icon: Dumbbell, color: 'text-cyan-400' },
                  { id: 'remise_en_forme', label: 'Se remettre en forme', desc: 'Retrouver tonus, vitalité et énergie quotidienne', icon: Flame, color: 'text-amber-400' },
                  { id: 'perte_de_poids', label: 'Perdre du poids', desc: 'Dépense calorique & circuits métaboliques dynamiques', icon: Target, color: 'text-rose-400' },
                  { id: 'endurance', label: 'Améliorer son endurance', desc: 'Capacité respiratoire, cardio & résistance', icon: Activity, color: 'text-emerald-400' },
                  { id: 'actif', label: 'Rester actif', desc: 'Bouger régulièrement, anti-sédentarité et plaisir', icon: Heart, color: 'text-purple-400' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, mainGoal: item.id as any })}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                      formData.mainGoal === item.id
                        ? 'bg-cyan-500/15 border-cyan-400 shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                        : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl bg-slate-800 ${item.color}`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-white">{item.label}</div>
                        <div className="text-[11px] text-slate-400">{item.desc}</div>
                      </div>
                    </div>
                    {formData.mainGoal === item.id && (
                      <div className="w-5 h-5 rounded-full bg-cyan-400 text-black flex items-center justify-center">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* STEP 3: Fitness Level & Location */}
            {step === 3 && (
              <div className="space-y-5 animate-fadeIn">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Niveau Sportif Actuel
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'debutant', label: 'Débutant', sub: 'Je commence' },
                      { id: 'intermediaire', label: 'Intermédiaire', sub: 'Pratique régulière' },
                      { id: 'avance', label: 'Avancé', sub: 'Confirmé / Athlète' },
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, fitnessLevel: lvl.id as any })}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          formData.fitnessLevel === lvl.id
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="font-bold text-xs text-white">{lvl.label}</div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{lvl.sub}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-2">
                    Lieu d’entraînement principal
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'maison', label: 'Maison', icon: Home },
                      { id: 'salle', label: 'Salle de sport', icon: Building2 },
                      { id: 'exterieur', label: 'Extérieur', icon: TreePine },
                    ].map((loc) => (
                      <button
                        key={loc.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, trainingLocation: loc.id as any })}
                        className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          formData.trainingLocation === loc.id
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <loc.icon className="w-5 h-5" />
                        <span className="font-bold text-xs text-white">{loc.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Equipment & Frequency & Duration */}
            {step === 4 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Matériel disponible
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'aucun', label: 'Aucun (Poids du corps)' },
                      { id: 'halteres', label: 'Haltères' },
                      { id: 'elastiques', label: 'Élastiques' },
                      { id: 'tapis', label: 'Tapis de sol' },
                      { id: 'machines', label: 'Machines complètes' },
                    ].map((eq) => (
                      <button
                        key={eq.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, equipment: eq.id })}
                        className={`p-2.5 rounded-xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                          formData.equipment === eq.id
                            ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {eq.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Nombre de séances par semaine ({formData.sessionsPerWeek} séances)
                  </label>
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5, 6, 7].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setFormData({ ...formData, sessionsPerWeek: num })}
                        className={`flex-1 py-2 rounded-lg font-mono text-xs font-bold border transition-all cursor-pointer ${
                          formData.sessionsPerWeek === num
                            ? 'bg-cyan-500 text-black border-cyan-400'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Durée préférée par séance
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[15, 30, 45, 60].map((dur) => (
                      <button
                        key={dur}
                        type="button"
                        onClick={() => setFormData({ ...formData, preferredDuration: dur })}
                        className={`py-2 rounded-xl border text-center font-mono text-xs font-bold transition-all cursor-pointer ${
                          formData.preferredDuration === dur
                            ? 'bg-emerald-500 text-black border-emerald-400'
                            : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        {dur} min
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Sports, Limitations & Health Disclaimer */}
            {step === 5 && (
              <div className="space-y-4 animate-fadeIn">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Sports ou exercices appréciés
                  </label>
                  <input
                    type="text"
                    value={formData.favoriteActivities}
                    onChange={(e) => setFormData({ ...formData, favoriteActivities: e.target.value })}
                    placeholder="Ex: Calisthénie, Foot, Running, Boxe..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 focus:outline-none text-white text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-slate-300 mb-1.5">
                    Éventuelles limitations physiques ou exercices à éviter
                  </label>
                  <input
                    type="text"
                    value={formData.physicalLimitations}
                    onChange={(e) => setFormData({ ...formData, physicalLimitations: e.target.value })}
                    placeholder="Ex: Douleurs aux genoux, fragilité bas du dos..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 focus:border-cyan-400 focus:outline-none text-white text-xs"
                  />
                </div>

                {/* CRITICAL HEALTH DISCLAIMER AS MANDATED */}
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-200 text-xs space-y-2">
                  <div className="flex items-center gap-2 font-bold text-amber-300">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-amber-400" />
                    <span>AVERTISSEMENT DE SÉCURITÉ & SANTÉ</span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-amber-100/90">
                    Les informations concernant les limitations physiques servent uniquement à adapter et filtrer les exercices proposés par l'algorithme. <strong>L'application LEVEL UP ne remplace en aucun cas un professionnel de santé, médecin ou kinésithérapeute.</strong>
                  </p>
                  <label className="flex items-center gap-2 pt-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.healthDisclaimerAccepted}
                      onChange={(e) => setFormData({ ...formData, healthDisclaimerAccepted: e.target.checked })}
                      className="rounded border-amber-400 text-amber-500 focus:ring-0"
                    />
                    <span className="text-[11px] font-semibold text-amber-300">
                      J'ai compris et j'accepte ces conditions.
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-3 mt-6 pt-3 border-t border-slate-800">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={handleBack}
                  className="py-2.5 px-4 rounded-xl bg-slate-800 text-slate-300 text-xs font-bold hover:bg-slate-700 flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Précédent</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowQuestionnaire(false)}
                  className="py-2.5 px-4 rounded-xl text-slate-400 text-xs hover:text-white cursor-pointer"
                >
                  Annuler
                </button>
              )}

              <button
                type="button"
                onClick={handleNext}
                disabled={step === 5 && !formData.healthDisclaimerAccepted}
                className="py-2.5 px-6 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 disabled:opacity-50 text-black font-extrabold text-xs flex items-center gap-2 shadow-[0_0_15px_rgba(0,240,255,0.4)] cursor-pointer"
              >
                <span>{step === 5 ? 'Générer mon programme IA' : 'Suivant'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
