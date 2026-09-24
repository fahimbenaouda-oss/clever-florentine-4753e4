import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  UserProfile,
  UserStats,
  BadgeItem,
  ChallengeItem,
  FriendUser,
  AvatarCosmetics,
  INITIAL_LUCAS_PROFILE,
  INITIAL_LUCAS_STATS,
  INITIAL_BADGES,
  INITIAL_CHALLENGES,
  INITIAL_FRIENDS,
  INITIAL_COSMETICS,
  LEVEL_TIERS,
} from '../data/mockData';
import { generateWorkoutProgram, GeneratedProgram, Exercise } from '../data/exercises';

function fireConfetti(opts: any) {
  if (typeof window !== 'undefined') {
    import('canvas-confetti')
      .then((module) => {
        const conf = module.default || module;
        conf(opts);
      })
      .catch(() => {});
  }
}

export type TabType = 'accueil' | 'programme' | 'coach' | 'classement' | 'profil';

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
  type: 'xp' | 'badge' | 'coach' | 'streak' | 'challenge';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'coach';
  text: string;
  timestamp: string;
  actionPrompt?: {
    label: string;
    action: () => void;
  };
}

interface AppContextType {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  
  // Onboarding & Questionnaire
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
  onboardingStep: number;
  setOnboardingStep: (step: number) => void;
  showQuestionnaire: boolean;
  setShowQuestionnaire: (show: boolean) => void;
  
  // User Data
  profile: UserProfile;
  setProfile: React.Dispatch<React.SetStateAction<UserProfile>>;
  stats: UserStats;
  badges: BadgeItem[];
  challenges: ChallengeItem[];
  friends: FriendUser[];
  cosmetics: AvatarCosmetics;
  setCosmetics: React.Dispatch<React.SetStateAction<AvatarCosmetics>>;
  subscriptionTier: 'free' | 'standard' | 'premium';
  setSubscriptionTier: (tier: 'free' | 'standard' | 'premium') => void;
  
  // Workouts
  currentProgram: GeneratedProgram;
  setProgramFromProfile: (customProfile?: UserProfile) => void;
  isWorkoutActive: boolean;
  activeExerciseIndex: number;
  startWorkout: () => void;
  finishExercise: () => void;
  skipExercise: () => void;
  exitWorkout: () => void;
  floatingXp: { id: number; amount: number; text: string } | null;
  workoutTimeElapsed: number;
  
  // Completion & Rewards Modal
  showWorkoutFinishedModal: boolean;
  closeFinishedModal: () => void;
  showLevelUpModal: boolean;
  closeLevelUpModal: () => void;
  levelUpInfo: { oldLevel: number; newLevel: number; title: string } | null;
  
  // Gamification helpers
  addXp: (amount: number, reason: string) => void;
  claimChallenge: (id: string) => void;
  sendFriendlyChallenge: (friendId: string) => void;
  
  // Coach Chat
  chatMessages: ChatMessage[];
  sendCoachMessage: (text: string) => void;
  
  // Notifications
  notifications: AppNotification[];
  markAllNotificationsRead: () => void;
  showNotificationCenter: boolean;
  setShowNotificationCenter: (show: boolean) => void;
  
  // Subscriptions Modal
  showSubscriptionModal: boolean;
  setShowSubscriptionModal: (show: boolean) => void;
  
  // Reset demo
  resetToLucasDemo: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabType>('accueil');
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);

  // User State
  const [profile, setProfile] = useState<UserProfile>(INITIAL_LUCAS_PROFILE);
  const [stats, setStats] = useState<UserStats>(INITIAL_LUCAS_STATS);
  const [badges, setBadges] = useState<BadgeItem[]>(INITIAL_BADGES);
  const [challenges, setChallenges] = useState<ChallengeItem[]>(INITIAL_CHALLENGES);
  const [friends, setFriends] = useState<FriendUser[]>(INITIAL_FRIENDS);
  const [cosmetics, setCosmetics] = useState<AvatarCosmetics>(INITIAL_COSMETICS);
  const [subscriptionTier, setSubscriptionTier] = useState<'free' | 'standard' | 'premium'>('standard');

  // Workout state
  const [currentProgram, setCurrentProgram] = useState<GeneratedProgram>(() =>
    generateWorkoutProgram(INITIAL_LUCAS_PROFILE)
  );
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [activeExerciseIndex, setActiveExerciseIndex] = useState(0);
  const [workoutTimeElapsed, setWorkoutTimeElapsed] = useState(0);
  const [floatingXp, setFloatingXp] = useState<{ id: number; amount: number; text: string } | null>(null);

  // Modals
  const [showWorkoutFinishedModal, setShowWorkoutFinishedModal] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [levelUpInfo, setLevelUpInfo] = useState<{ oldLevel: number; newLevel: number; title: string } | null>(null);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showNotificationCenter, setShowNotificationCenter] = useState(false);

  // In-app notifications
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'n1',
      title: 'Prochain palier en vue !',
      message: 'Plus que 550 XP avant d’atteindre le Niveau 8 (Vanguard Titan).',
      timeAgo: 'Il y a 10 min',
      read: false,
      type: 'xp',
    },
    {
      id: 'n2',
      title: 'Série de 4 jours 🔥',
      message: 'Lucas, ton avatar brûle d’énergie ! Continue sur cette lancée.',
      timeAgo: 'Ce matin',
      read: false,
      type: 'streak',
    },
    {
      id: 'n3',
      title: 'Conseil du Coach A.I.D.E.N',
      message: 'Petite journée ? Même 15 minutes comptent pour la progression.',
      timeAgo: 'Hier',
      read: true,
      type: 'coach',
    },
  ]);

  // Coach AI Chat
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-1',
      sender: 'coach',
      text: "Salut Lucas ! Je suis A.I.D.E.N., ton coach cyber-sportif. Je suis configuré pour calibrer tes séances selon ton énergie, ton matériel et ton emploi du temps. Comment te sens-tu aujourd'hui ?",
      timestamp: '10:00',
    },
  ]);

  // Workout active timer
  useEffect(() => {
    let timer: any;
    if (isWorkoutActive) {
      timer = setInterval(() => {
        setWorkoutTimeElapsed((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isWorkoutActive]);

  // Regenerate program when profile changes
  const setProgramFromProfile = (customProfile?: UserProfile) => {
    const p = customProfile || profile;
    const newProg = generateWorkoutProgram(p);
    setCurrentProgram(newProg);
  };

  // Add XP with automatic Level Up check
  const addXp = (amount: number, reason: string) => {
    // Show floating reward
    setFloatingXp({ id: Date.now(), amount, text: `+${amount} XP ${reason}` });
    setTimeout(() => {
      setFloatingXp(null);
    }, 2200);

    setStats((prev) => {
      const newTotalXp = prev.totalXp + amount;
      const newCurrentXp = prev.currentXp + amount;
      
      // Check for level up
      if (newCurrentXp >= prev.nextLevelXp) {
        const newLevel = prev.level + 1;
        const nextTier = LEVEL_TIERS.find((t) => t.level === newLevel + 1) || {
          minXp: prev.nextLevelXp + 800,
          title: 'Légende Ascendante',
        };
        const currentTier = LEVEL_TIERS.find((t) => t.level === newLevel) || {
          title: 'Champion Titan',
        };

        const remainingXp = newCurrentXp - prev.nextLevelXp;
        const nextTarget = 3000 + (newLevel - 7) * 750;

        setLevelUpInfo({
          oldLevel: prev.level,
          newLevel,
          title: currentTier.title,
        });
        setShowLevelUpModal(true);

        try {
          fireConfetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00F0FF', '#10B981', '#F59E0B', '#8B5CF6'],
          });
        } catch (e) {
          // ignore
        }

        return {
          ...prev,
          level: newLevel,
          levelTitle: currentTier.title,
          currentXp: remainingXp,
          nextLevelXp: nextTarget,
          totalXp: newTotalXp,
        };
      }

      return {
        ...prev,
        currentXp: newCurrentXp,
        totalXp: newTotalXp,
      };
    });
  };

  const startWorkout = () => {
    setActiveExerciseIndex(0);
    setWorkoutTimeElapsed(0);
    setIsWorkoutActive(true);
  };

  const finishExercise = () => {
    const currentEx = currentProgram.exercises[activeExerciseIndex];
    const reward = currentEx?.exercise.xpReward || 50;
    addXp(reward, 'Exercice validé !');

    if (activeExerciseIndex + 1 < currentProgram.exercises.length) {
      setActiveExerciseIndex((prev) => prev + 1);
    } else {
      // Workout Completed!
      finishWorkout();
    }
  };

  const skipExercise = () => {
    if (activeExerciseIndex + 1 < currentProgram.exercises.length) {
      setActiveExerciseIndex((prev) => prev + 1);
    } else {
      finishWorkout();
    }
  };

  const finishWorkout = () => {
    setIsWorkoutActive(false);
    setShowWorkoutFinishedModal(true);
    
    // Confetti celebration
    try {
      fireConfetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#00F0FF', '#EC4899', '#F59E0B'],
      });
    } catch (e) {
      // ignore
    }

    // Award workout XP bonus
    const workoutXp = currentProgram.xpReward || 300;
    addXp(workoutXp, 'Victoire Séance !');

    // Update user stats
    setStats((prev) => ({
      ...prev,
      workoutsThisWeek: prev.workoutsThisWeek + 1,
      totalWorkouts: prev.totalWorkouts + 1,
      totalMinutes: prev.totalMinutes + Math.round(workoutTimeElapsed / 60 || 28),
    }));

    // Update challenges progress
    setChallenges((prev) =>
      prev.map((c) => {
        if (c.id === 'c1') {
          const newProg = Math.min(c.target, c.progress + 1);
          return { ...c, progress: newProg, isCompleted: newProg >= c.target };
        }
        if (c.id === 'c2') {
          const newProg = Math.min(c.target, c.progress + Math.round(workoutTimeElapsed / 60 || 28));
          return { ...c, progress: newProg, isCompleted: newProg >= c.target };
        }
        return c;
      })
    );

    // Check warrior badge
    setBadges((prev) =>
      prev.map((b) => {
        if (b.id === 'guerrier' && stats.totalWorkouts + 1 >= 10) {
          return { ...b, unlocked: true, unlockedAt: 'À l’instant' };
        }
        return b;
      })
    );
  };

  const exitWorkout = () => {
    setIsWorkoutActive(false);
  };

  const closeFinishedModal = () => {
    setShowWorkoutFinishedModal(false);
    setActiveTab('accueil');
  };

  const closeLevelUpModal = () => {
    setShowLevelUpModal(false);
  };

  const claimChallenge = (id: string) => {
    const ch = challenges.find((c) => c.id === id);
    if (!ch || !ch.isCompleted || ch.isClaimed) return;

    addXp(ch.xpReward, `Quête "${ch.title}" !`);
    setChallenges((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isClaimed: true } : c))
    );
    setStats((prev) => ({
      ...prev,
      challengesCompleted: prev.challengesCompleted + 1,
    }));
  };

  const sendFriendlyChallenge = (friendId: string) => {
    const friend = friends.find((f) => f.id === friendId);
    if (!friend) return;

    setNotifications((prev) => [
      {
        id: Date.now().toString(),
        title: 'Défi amical envoyé ⚔️',
        message: `Tu as lancé un duel de 30 min à ${friend.name}. +50 XP bonus d'esprit sportif !`,
        timeAgo: 'À l’instant',
        read: false,
        type: 'challenge',
      },
      ...prev,
    ]);
    addXp(50, 'Défi amical envoyé');
  };

  const sendCoachMessage = (text: string) => {
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChatMessages((prev) => [...prev, userMsg]);

    // Smart contextual responses mimicking AI Coach AIDEN
    setTimeout(() => {
      let reply = '';
      const lower = text.toLowerCase();

      if (lower.includes('20 minute') || lower.includes('20min') || lower.includes('pressé') || lower.includes('court')) {
        reply = "Pas de problème Lucas ! J'ai recalibré ta séance en mode Express 20 minutes : 1 échauffement réactif, 3 exercices composés intenses au poids du corps et un retour au calme rapide. Prêt à tout donner ?";
        setProgramFromProfile({
          ...profile,
          preferredDuration: 15,
        });
      } else if (lower.includes('haltère') || lower.includes('haltere') || lower.includes('matériel') || lower.includes('materiel')) {
        reply = "Compris guerrier ! J'adapte immédiatement ta programmation en 100% poids de corps (calisthénie). Tous les mouvements de tirage et de poussée sont remplacés par des variantes au sol et au mur.";
        setProgramFromProfile({
          ...profile,
          equipment: 'aucun',
        });
      } else if (lower.includes('genou') || lower.includes('mal au genou') || lower.includes('articulation')) {
        reply = "Attention reçue 5/5. La sécurité passe avant l'XP ! Note bien que je ne remplace pas un médecin ou kiné, mais j'ai retiré les sauts et les fentes profondes pour les remplacer par du pont fessier doux et du gainage statique.";
        setProgramFromProfile({
          ...profile,
          physicalLimitations: 'genou',
        });
      } else if (lower.includes('fatigué') || lower.includes('motivation') || lower.includes('flemme')) {
        reply = "C'est dans les jours sans envie que les héros forgent leur légende ! Pas besoin de soulever une montagne : fais juste 10 à 15 minutes tranquilles. Ton avatar t'attend et chaque répétition t'apporte des XP.";
      } else {
        reply = "Parfaitement noté Lucas ! Tes retours affinent l'algorithme d'entraînement. N'oublie pas de bien t'hydrater, garde le dos droit et verrouille ta respiration.";
      }

      const coachMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'coach',
        text: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setChatMessages((prev) => [...prev, coachMsg]);
    }, 600);
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const resetToLucasDemo = () => {
    setProfile(INITIAL_LUCAS_PROFILE);
    setStats(INITIAL_LUCAS_STATS);
    setBadges(INITIAL_BADGES);
    setChallenges(INITIAL_CHALLENGES);
    setFriends(INITIAL_FRIENDS);
    setCosmetics(INITIAL_COSMETICS);
    setSubscriptionTier('standard');
    setProgramFromProfile(INITIAL_LUCAS_PROFILE);
    setActiveTab('accueil');
    setIsWorkoutActive(false);
  };

  return (
    <AppContext.Provider
      value={{
        activeTab,
        setActiveTab,
        showOnboarding,
        setShowOnboarding,
        onboardingStep,
        setOnboardingStep,
        showQuestionnaire,
        setShowQuestionnaire,
        profile,
        setProfile,
        stats,
        badges,
        challenges,
        friends,
        cosmetics,
        setCosmetics,
        subscriptionTier,
        setSubscriptionTier,
        currentProgram,
        setProgramFromProfile,
        isWorkoutActive,
        activeExerciseIndex,
        startWorkout,
        finishExercise,
        skipExercise,
        exitWorkout,
        floatingXp,
        workoutTimeElapsed,
        showWorkoutFinishedModal,
        closeFinishedModal,
        showLevelUpModal,
        closeLevelUpModal,
        levelUpInfo,
        addXp,
        claimChallenge,
        sendFriendlyChallenge,
        chatMessages,
        sendCoachMessage,
        notifications,
        markAllNotificationsRead,
        showNotificationCenter,
        setShowNotificationCenter,
        showSubscriptionModal,
        setShowSubscriptionModal,
        resetToLucasDemo,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
