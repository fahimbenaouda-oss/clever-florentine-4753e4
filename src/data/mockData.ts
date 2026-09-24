export interface UserProfile {
  firstName: string;
  age: number;
  mainGoal: 'musculation' | 'remise_en_forme' | 'perte_de_poids' | 'endurance' | 'actif';
  fitnessLevel: 'debutant' | 'intermediaire' | 'avance';
  trainingLocation: 'maison' | 'salle' | 'exterieur';
  equipment: string;
  sessionsPerWeek: number;
  preferredDuration: number;
  favoriteActivities: string;
  physicalLimitations: string;
  healthDisclaimerAccepted: boolean;
}

export interface UserStats {
  level: number;
  levelTitle: string;
  currentXp: number;
  nextLevelXp: number;
  totalXp: number;
  streakDays: number;
  bestStreak: number;
  workoutsThisWeek: number;
  totalWorkouts: number;
  totalMinutes: number;
  challengesCompleted: number;
}

export interface BadgeItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface ChallengeItem {
  id: string;
  title: string;
  description: string;
  xpReward: number;
  badgeRewardSlug?: string;
  progress: number;
  target: number;
  unit: string;
  isCompleted: boolean;
  isClaimed: boolean;
  icon: string;
}

export interface FriendUser {
  id: string;
  name: string;
  avatar: string;
  armor: string;
  color: string;
  level: number;
  xp: number;
  streak: number;
  statusText: string;
}

export interface AvatarCosmetics {
  preset: string;
  armor: string;
  aura: string;
  color: string;
  unlockedArmors: string[];
  unlockedAuras: string[];
}

export const LEVEL_TIERS: { level: number; title: number extends 0 ? never : string; minXp: number }[] = [
  { level: 1, title: 'Initié Néon', minXp: 0 },
  { level: 2, title: 'Cadet Cybersport', minXp: 500 },
  { level: 3, title: 'Combattant Électron', minXp: 900 },
  { level: 4, title: 'Ranger Urbain', minXp: 1350 },
  { level: 5, title: 'Gardien Synthwave', minXp: 1850 },
  { level: 6, title: 'Chevalier Holo', minXp: 2400 },
  { level: 7, title: 'Guerrier Cyber', minXp: 3000 },
  { level: 8, title: 'Vanguard Titan', minXp: 3700 },
  { level: 9, title: 'Maître Apex', minXp: 4500 },
  { level: 10, title: 'Légende Ascendante', minXp: 5400 },
  { level: 11, title: 'Overclocked Champion', minXp: 6400 },
  { level: 12, title: 'Demi-Dieu Quantum', minXp: 7500 },
];

export const INITIAL_BADGES: BadgeItem[] = [
  {
    id: 'premier-pas',
    title: 'Premier pas',
    description: 'Première séance terminée avec brio',
    icon: 'Footprints',
    unlocked: true,
    unlockedAt: 'Il y a 4 jours',
    rarity: 'common',
  },
  {
    id: 'regulier',
    title: 'Régulier',
    description: '3 séances accomplies dans la semaine',
    icon: 'Flame',
    unlocked: true,
    unlockedAt: 'Hier',
    rarity: 'rare',
  },
  {
    id: 'guerrier',
    title: 'Guerrier',
    description: '10 séances terminées au total',
    icon: 'Swords',
    unlocked: false,
    rarity: 'epic',
  },
  {
    id: 'endurance',
    title: 'Endurance',
    description: '5 séances cardio et mobilité validées',
    icon: 'HeartPulse',
    unlocked: false,
    rarity: 'rare',
  },
  {
    id: 'level-10',
    title: 'Level 10',
    description: 'Atteindre le rang prestigieux de Niveau 10',
    icon: 'Crown',
    unlocked: false,
    rarity: 'legendary',
  },
  {
    id: 'focus-parfait',
    title: 'Focus Parfait',
    description: 'Compléter une séance sans sauter d’exercice',
    icon: 'Target',
    unlocked: true,
    unlockedAt: 'Il y a 2 jours',
    rarity: 'common',
  },
];

export const INITIAL_CHALLENGES: ChallengeItem[] = [
  {
    id: 'c1',
    title: '3 séances cette semaine',
    description: 'Progresse régulièrement pour maintenir ton boost d’XP.',
    xpReward: 500,
    progress: 2,
    target: 3,
    unit: 'séances',
    isCompleted: false,
    isClaimed: false,
    icon: 'CalendarCheck',
  },
  {
    id: 'c2',
    title: '30 minutes d’activité',
    description: 'Marche, course ou séance active aujourd’hui.',
    xpReward: 150,
    progress: 25,
    target: 30,
    unit: 'min',
    isCompleted: false,
    isClaimed: false,
    icon: 'Timer',
  },
  {
    id: 'c3',
    title: '7 jours actifs consécutifs',
    description: 'Construis une discipline d’acier digne d’un héros.',
    xpReward: 400,
    badgeRewardSlug: 'discipline-fer',
    progress: 4,
    target: 7,
    unit: 'jours',
    isCompleted: false,
    isClaimed: false,
    icon: 'Zap',
  },
];

export const INITIAL_FRIENDS: FriendUser[] = [
  {
    id: 'thomas',
    name: 'Thomas',
    avatar: 'cyber-ronin',
    armor: 'titan-suit',
    color: '#F59E0B',
    level: 12,
    xp: 12450,
    streak: 14,
    statusText: 'Vient de terminer "Legs & Power"',
  },
  {
    id: 'lucas',
    name: 'Lucas (Toi)',
    avatar: 'cyber-warrior',
    armor: 'nano-vest',
    color: '#00F0FF',
    level: 7,
    xp: 11980,
    streak: 4,
    statusText: 'Prêt pour la séance Full Body !',
  },
  {
    id: 'emma',
    name: 'Emma',
    avatar: 'neon-valkyrie',
    armor: 'phantom-light',
    color: '#EC4899',
    level: 8,
    xp: 10750,
    streak: 6,
    statusText: 'En pause hydratation 💧',
  },
  {
    id: 'antoine',
    name: 'Antoine',
    avatar: 'glitch-ninja',
    armor: 'scout-hoodie',
    color: '#10B981',
    level: 6,
    xp: 9320,
    streak: 3,
    statusText: 'Challenge 30 min terminé',
  },
  {
    id: 'chloe',
    name: 'Chloé',
    avatar: 'cyber-spark',
    armor: 'aegis-core',
    color: '#8B5CF6',
    level: 5,
    xp: 8100,
    streak: 2,
    statusText: 'À fond sur la mobilité',
  },
];

export const INITIAL_LUCAS_PROFILE: UserProfile = {
  firstName: 'Lucas',
  age: 20,
  mainGoal: 'musculation',
  fitnessLevel: 'debutant',
  trainingLocation: 'maison',
  equipment: 'aucun',
  sessionsPerWeek: 3,
  preferredDuration: 30,
  favoriteActivities: 'Poids du corps, Calisthénie, Fitness fun',
  physicalLimitations: '',
  healthDisclaimerAccepted: true,
};

export const INITIAL_LUCAS_STATS: UserStats = {
  level: 7,
  levelTitle: 'Guerrier Cyber',
  currentXp: 2450,
  nextLevelXp: 3000,
  totalXp: 11980,
  streakDays: 4,
  bestStreak: 6,
  workoutsThisWeek: 2,
  totalWorkouts: 8,
  totalMinutes: 240,
  challengesCompleted: 3,
};

export const INITIAL_COSMETICS: AvatarCosmetics = {
  preset: 'cyber-warrior',
  armor: 'nano-vest',
  aura: 'electric-blue',
  color: 'cyan',
  unlockedArmors: ['scout-hoodie', 'nano-vest', 'neon-striker'],
  unlockedAuras: ['electric-blue', 'cyan-pulse'],
};

export const AVAILABLE_ARMORS = [
  { id: 'scout-hoodie', name: 'Sweat Scout Tactique', minLevel: 1, icon: 'Shield', rarity: 'Commun' },
  { id: 'nano-vest', name: 'Gilet Nanotech V2', minLevel: 4, icon: 'ShieldCheck', rarity: 'Rare' },
  { id: 'neon-striker', name: 'Armure Néon Striker', minLevel: 7, icon: 'Zap', rarity: 'Épique' },
  { id: 'titan-suit', name: 'Exosquelette Titan', minLevel: 10, icon: 'Crown', rarity: 'Légendaire' },
  { id: 'shadow-shinobi', name: 'Kevlar Ombre Cyber', minLevel: 12, icon: 'Flame', rarity: 'Mythique' },
];

export const AVAILABLE_AURAS = [
  { id: 'electric-blue', name: 'Aura Électrique Cyan', minLevel: 1, color: '#00F0FF' },
  { id: 'cyan-pulse', name: 'Pulsation Quantique', minLevel: 5, color: '#06B6D4' },
  { id: 'solar-flare', name: 'Surchauffe Solaire', minLevel: 8, color: '#F59E0B' },
  { id: 'void-violet', name: 'Rayonnement Néon Violet', minLevel: 10, color: '#A855F7' },
];
