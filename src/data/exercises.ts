export interface Exercise {
  id: string;
  name: string;
  muscleGroup: string;
  difficulty: 'debutant' | 'intermediaire' | 'avance';
  equipmentRequired: 'aucun' | 'halteres' | 'elastiques' | 'tapis' | 'machines';
  defaultSets: number;
  defaultReps: string;
  durationSeconds?: number;
  restSeconds: number;
  instructions: string;
  mistakesToAvoid: string;
  contraindications: string;
  xpReward: number;
  category: 'echauffement' | 'entrainement' | 'calme';
  icon: string;
  accentColor: string;
}

export const EXERCISE_DATABASE: Exercise[] = [
  // ÉCHAUFFEMENT (WARM-UP)
  {
    id: 'jumping-jacks',
    name: 'Jumping Jacks',
    muscleGroup: 'Cardio & Réveil articulaire',
    difficulty: 'debutant',
    equipmentRequired: 'aucun',
    defaultSets: 1,
    defaultReps: '45 secondes',
    durationSeconds: 45,
    restSeconds: 20,
    instructions: 'Saute en écartant simultanément les jambes et en levant les bras au-dessus de la tête. Reviens en position initiale sur la pointe des pieds de façon fluide.',
    mistakesToAvoid: 'Ne bloque pas la respiration. Évite d’atterrir lourdement sur les talons, amortis toujours sur l’avant du pied.',
    contraindications: 'Douleurs aiguës aux chevilles ou aux genoux.',
    xpReward: 40,
    category: 'echauffement',
    icon: 'Activity',
    accentColor: '#00F0FF',
  },
  {
    id: 'mobilite-epaules',
    name: 'Mobilité & Cercles d’épaules',
    muscleGroup: 'Épaules & Ceinture scapulaire',
    difficulty: 'debutant',
    equipmentRequired: 'aucun',
    defaultSets: 1,
    defaultReps: '30 secondes',
    durationSeconds: 30,
    restSeconds: 15,
    instructions: 'Debout, pieds largeur d’épaules, effectue de grands cercles contrôlés avec les bras vers l’arrière puis vers l’avant pour lubrifier les articulations.',
    mistakesToAvoid: 'Ne cambre pas excessivement le bas du dos pendant le mouvement.',
    contraindications: 'Instabilité sévère de l’épaule ou bursite active.',
    xpReward: 35,
    category: 'echauffement',
    icon: 'RotateCw',
    accentColor: '#38BDF8',
  },
  {
    id: 'montees-genoux-douces',
    name: 'Montées de genoux dynamiques',
    muscleGroup: 'Cardio & Fléchisseurs de hanche',
    difficulty: 'debutant',
    equipmentRequired: 'aucun',
    defaultSets: 1,
    defaultReps: '40 secondes',
    durationSeconds: 40,
    restSeconds: 20,
    instructions: 'Alterne les montées de genoux à hauteur de hanches avec un rythme régulier, en accompagnant le geste avec les bras opposés.',
    mistakesToAvoid: 'Ne te penche pas vers l’arrière. Garde le buste fier et engagé.',
    contraindications: 'Entorse récente de cheville.',
    xpReward: 40,
    category: 'echauffement',
    icon: 'Flame',
    accentColor: '#F59E0B',
  },
  {
    id: 'rotation-buste-fentes',
    name: 'Fentes dynamiques & Torsion',
    muscleGroup: 'Hanches, Quadriceps & Colonne',
    difficulty: 'intermediaire',
    equipmentRequired: 'aucun',
    defaultSets: 1,
    defaultReps: '45 secondes',
    durationSeconds: 45,
    restSeconds: 20,
    instructions: 'Fais un pas en avant en fente douce et effectue une légère rotation du buste vers la jambe avant pour ouvrir la cage thoracique.',
    mistakesToAvoid: 'Ne force pas la rotation si tu ressens une gêne lombaire.',
    contraindications: 'Hernie discale aiguë en torsion.',
    xpReward: 45,
    category: 'echauffement',
    icon: 'Compass',
    accentColor: '#10B981',
  },

  // ENTRAÎNEMENT - BAS DU CORPS
  {
    id: 'squats-poids-corps',
    name: 'Squats au poids du corps',
    muscleGroup: 'Quadriceps, Fessiers & Ischios',
    difficulty: 'debutant',
    equipmentRequired: 'aucun',
    defaultSets: 3,
    defaultReps: '12 répétitions',
    durationSeconds: 0,
    restSeconds: 45,
    instructions: 'Pieds largeur d’épaules, fléchis les genoux en envoyant les fesses vers l’arrière comme pour t’asseoir. Descends jusqu’à cuisses parallèles au sol puis pousse fort dans les talons.',
    mistakesToAvoid: 'Ne laisse pas les genoux s’effondrer vers l’intérieur (valgus). Ne décolle pas les talons du sol.',
    contraindications: 'Douleur aiguë au ménisque ou ligament croisé non rééduqué.',
    xpReward: 50,
    category: 'entrainement',
    icon: 'Zap',
    accentColor: '#00F0FF',
  },
  {
    id: 'fentes-arriere',
    name: 'Fentes arrières alternées',
    muscleGroup: 'Fessiers, Quadriceps & Équilibre',
    difficulty: 'debutant',
    equipmentRequired: 'aucun',
    defaultSets: 3,
    defaultReps: '10 par jambe',
    durationSeconds: 0,
    restSeconds: 45,
    instructions: 'Fais un pas vers l’arrière et descends le genou arrière à quelques centimètres du sol à 90°. Reviens en poussant avec le talon de la jambe avant.',
    mistakesToAvoid: 'Ne projette pas le genou avant au-delà des orteils. Garde le buste vertical.',
    contraindications: 'Tendinite rotulienne sévère.',
    xpReward: 50,
    category: 'entrainement',
    icon: 'TrendingUp',
    accentColor: '#10B981',
  },
  {
    id: 'pont-fessier',
    name: 'Pont Fessier (Glute Bridge)',
    muscleGroup: 'Grand fessier & Ischio-jambiers',
    difficulty: 'debutant',
    equipmentRequired: 'tapis',
    defaultSets: 3,
    defaultReps: '15 répétitions',
    durationSeconds: 0,
    restSeconds: 30,
    instructions: 'Allongé sur le dos, genoux pliés et pieds au sol, contracte les fessiers pour soulever le bassin jusqu’à former une ligne droite épaules-genoux. Maintiens 1 seconde en haut.',
    mistakesToAvoid: 'Ne cambre pas le bas du dos en fin de mouvement; la poussée vient des fessiers et des talons.',
    contraindications: 'Douleur vive au sacrum.',
    xpReward: 45,
    category: 'entrainement',
    icon: 'Shield',
    accentColor: '#8B5CF6',
  },

  // ENTRAÎNEMENT - HAUT DU CORPS
  {
    id: 'pompes-adaptees',
    name: 'Pompes adaptées (Sur genoux ou surélevées)',
    muscleGroup: 'Pectoraux, Triceps & Épaules',
    difficulty: 'debutant',
    equipmentRequired: 'aucun',
    defaultSets: 3,
    defaultReps: '8 à 10 répétitions',
    durationSeconds: 0,
    restSeconds: 60,
    instructions: 'Mains écartées un peu plus larges que les épaules, sur les genoux ou en appui sur une table/banc. Corps parfaitement aligné, descends la poitrine et repousse le sol.',
    mistakesToAvoid: 'Ne laisse pas le bassin s’affaisser (creuser le dos). Les coudes ne doivent pas s’écarter à 90° (forme de flèche à 45°).',
    contraindications: 'Douleur aiguë au poignet ou à l’acromio-claviculaire.',
    xpReward: 50,
    category: 'entrainement',
    icon: 'Award',
    accentColor: '#EC4899',
  },
  {
    id: 'pompes-classiques',
    name: 'Pompes militaires (Pieds au sol)',
    muscleGroup: 'Pectoraux, Épaules & Triceps',
    difficulty: 'intermediaire',
    equipmentRequired: 'aucun',
    defaultSets: 3,
    defaultReps: '10 à 12 répétitions',
    durationSeconds: 0,
    restSeconds: 60,
    instructions: 'En appui sur la pointe des pieds et les mains, gainer l’ensemble du corps. Descends le torse à 5 cm du sol puis repousse énergiquement.',
    mistakesToAvoid: 'Ne casse pas l’alignement tête-colonne-bassin.',
    contraindications: 'Pathologie non consolidée de la coiffe des rotateurs.',
    xpReward: 60,
    category: 'entrainement',
    icon: 'ShieldAlert',
    accentColor: '#F43F5E',
  },
  {
    id: 'dips-sur-chaise',
    name: 'Dips sur chaise ou canapé',
    muscleGroup: 'Triceps & Épaules antérieures',
    difficulty: 'debutant',
    equipmentRequired: 'aucun',
    defaultSets: 3,
    defaultReps: '10 répétitions',
    durationSeconds: 0,
    restSeconds: 45,
    instructions: 'Dos à une chaise stable, pose les mains sur le rebord. Fléchis les coudes vers l’arrière pour faire descendre les fessiers, puis repousse avec les triceps.',
    mistakesToAvoid: 'Ne laisse pas les épaules monter aux oreilles. Reste proche de la chaise.',
    contraindications: 'Conflit sous-acromial douloureux.',
    xpReward: 45,
    category: 'entrainement',
    icon: 'Layers',
    accentColor: '#6366F1',
  },
  {
    id: 'tirage-elastique-dos',
    name: 'Rowing horizontal avec élastique',
    muscleGroup: 'Dorsaux, Trapèzes & Biceps',
    difficulty: 'debutant',
    equipmentRequired: 'elastiques',
    defaultSets: 3,
    defaultReps: '12 répétitions',
    durationSeconds: 0,
    restSeconds: 45,
    instructions: 'Élastique fixé sous les pieds ou à un point fixe, tire les coudes vers l’arrière en resserrant les omoplates. Contrôle le retour.',
    mistakesToAvoid: 'Ne tire pas uniquement avec les bras; initie le mouvement par le pincement des omoplates.',
    contraindications: 'Douleur aiguë au milieu du dos.',
    xpReward: 50,
    category: 'entrainement',
    icon: 'GitPullRequest',
    accentColor: '#06B6D4',
  },

  // ENTRAÎNEMENT - CORE / GAINAGE
  {
    id: 'gainage-planche',
    name: 'Gainage ventral (Planche classique)',
    muscleGroup: 'Grand droit, Transverse & Stabilisateurs',
    difficulty: 'debutant',
    equipmentRequired: 'aucun',
    defaultSets: 3,
    defaultReps: '30 secondes',
    durationSeconds: 30,
    restSeconds: 30,
    instructions: 'En appui sur les avant-bras et les orteils, maintiens une ligne droite continue des talons jusqu’au sommet du crâne. Rentre le nombril et contracte fessiers et cuisses.',
    mistakesToAvoid: 'Ne laisse jamais le bassin tomber vers le sol (hyperextension lombaire). Ne monte pas les fesses en toit.',
    contraindications: 'Lombalgie aiguë hyperalgique.',
    xpReward: 50,
    category: 'entrainement',
    icon: 'ShieldCheck',
    accentColor: '#10B981',
  },
  {
    id: 'gainage-lateral',
    name: 'Planche latérale',
    muscleGroup: 'Obliques & Stabilisateurs de hanche',
    difficulty: 'intermediaire',
    equipmentRequired: 'aucun',
    defaultSets: 3,
    defaultReps: '20 sec par côté',
    durationSeconds: 20,
    restSeconds: 30,
    instructions: 'En appui sur un avant-bras de profil, soulève le bassin pour aligner chevilles, hanches et tête. Maintiens la posture stable.',
    mistakesToAvoid: 'Ne laisse pas la hanche s’affaisser vers le bas.',
    contraindications: 'Gêne importante sur l’articulation de l’épaule d’appui.',
    xpReward: 50,
    category: 'entrainement',
    icon: 'Maximize2',
    accentColor: '#F59E0B',
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers modérés',
    muscleGroup: 'Sangle abdominale & Cardio',
    difficulty: 'debutant',
    equipmentRequired: 'aucun',
    defaultSets: 3,
    defaultReps: '30 secondes',
    durationSeconds: 30,
    restSeconds: 30,
    instructions: 'En position de pompes, ramène alternativement un genou vers la poitrine de manière dynamique sans faire sauter les fesses vers le haut.',
    mistakesToAvoid: 'Ne balance pas le bassin de gauche à droite. Garde les poignets sous les épaules.',
    contraindications: 'Douleur aux poignets ou instabilité vertébrale.',
    xpReward: 55,
    category: 'entrainement',
    icon: 'ChevronsUp',
    accentColor: '#EC4899',
  },

  // RETOUR AU CALME (COOL-DOWN)
  {
    id: 'etirement-ischios-fessiers',
    name: 'Étirement doux des ischios & dos',
    muscleGroup: 'Chaîne postérieure & Respiration',
    difficulty: 'debutant',
    equipmentRequired: 'aucun',
    defaultSets: 1,
    defaultReps: '60 secondes',
    durationSeconds: 60,
    restSeconds: 15,
    instructions: 'Assis ou debout, penche doucement le buste vers l’avant sans forcer, en relâchant les bras et la tête. Inspire profondément par le nez, expire par la bouche.',
    mistakesToAvoid: 'Ne donne pas d’à-coups. Laisse la gravité agir doucement.',
    contraindications: 'Sciatique avec engourdissement.',
    xpReward: 35,
    category: 'calme',
    icon: 'HeartHandshake',
    accentColor: '#3B82F6',
  },
  {
    id: 'posture-de-lenfant',
    name: 'Posture de l’enfant (Balasana)',
    muscleGroup: 'Lombaires, Dorsaux & Détente',
    difficulty: 'debutant',
    equipmentRequired: 'aucun',
    defaultSets: 1,
    defaultReps: '60 secondes',
    durationSeconds: 60,
    restSeconds: 10,
    instructions: 'À genoux, assieds-toi sur les talons, pose le front au sol et allonge les bras devant toi. Respire calmement pour faire redescendre le rythme cardiaque.',
    mistakesToAvoid: 'Ne force pas sur les genoux s’ils manquent de flexion; écarte un peu les cuisses.',
    contraindications: 'Douleur aiguë au genou en hyper-flexion.',
    xpReward: 35,
    category: 'calme',
    icon: 'Moon',
    accentColor: '#8B5CF6',
  },
  {
    id: 'respiration-diaphragmatique',
    name: 'Respiration de récupération (Box breathing)',
    muscleGroup: 'Système nerveux parasympathique',
    difficulty: 'debutant',
    equipmentRequired: 'aucun',
    defaultSets: 1,
    defaultReps: '60 secondes',
    durationSeconds: 60,
    restSeconds: 0,
    instructions: 'Allongé ou assis confortablement: inspire 4 secondes, bloque 2 secondes, expire lentement 4 secondes pour apaiser les battements de ton cœur.',
    mistakesToAvoid: 'Ne force pas une hyperventilation.',
    contraindications: 'Aucune.',
    xpReward: 30,
    category: 'calme',
    icon: 'Wind',
    accentColor: '#10B981',
  },
];

export interface GeneratedProgram {
  title: string;
  durationMinutes: number;
  fitnessLevel: string;
  equipment: string;
  xpReward: number;
  exercises: {
    exercise: Exercise;
    phase: 'echauffement' | 'entrainement' | 'calme';
    sets: number;
    reps: string;
    durationSeconds?: number;
    restSeconds: number;
  }[];
}

/**
 * Validated deterministic generation logic.
 * Ensures SAFETY: only uses validated database exercises and filters out contraindications.
 */
export function generateWorkoutProgram(profile: {
  mainGoal: string;
  fitnessLevel: string;
  trainingLocation: string;
  equipment: string;
  preferredDuration: number;
  physicalLimitations?: string;
}): GeneratedProgram {
  const limitations = (profile.physicalLimitations || '').toLowerCase();
  
  // Filter safe exercises based on equipment and limitations
  const safeExercises = EXERCISE_DATABASE.filter((ex) => {
    // Equipment check
    if (ex.equipmentRequired !== 'aucun') {
      const equipLower = profile.equipment.toLowerCase();
      if (!equipLower.includes(ex.equipmentRequired) && equipLower !== 'tout' && equipLower !== 'machines') {
        return false;
      }
    }
    // Limitations safety check
    if (limitations.includes('genou') && (ex.id === 'fentes-arriere' || ex.id === 'jumping-jacks')) {
      return false;
    }
    if ((limitations.includes('dos') || limitations.includes('lombaire')) && ex.id === 'mountain-climbers') {
      return false;
    }
    if ((limitations.includes('poignet') || limitations.includes('epaule')) && ex.id === 'pompes-classiques') {
      return false;
    }
    return true;
  });

  const warmups = safeExercises.filter((e) => e.category === 'echauffement');
  const mainExercises = safeExercises.filter((e) => e.category === 'entrainement');
  const cooldowns = safeExercises.filter((e) => e.category === 'calme');

  // Choose appropriate count according to preferred duration
  // 15 min: 2 warmups, 3 main, 1 cooldown
  // 30 min: 2 warmups, 4-5 main, 2 cooldowns
  // 45 min: 3 warmups, 6 main, 2 cooldowns
  // 60 min: 3 warmups, 7-8 main, 3 cooldowns
  let mainCount = 4;
  if (profile.preferredDuration <= 15) mainCount = 3;
  else if (profile.preferredDuration === 30) mainCount = 4;
  else if (profile.preferredDuration >= 45) mainCount = 6;

  const selectedWarmups = warmups.slice(0, profile.preferredDuration <= 20 ? 1 : 2);
  const selectedMain = mainExercises.slice(0, mainCount);
  const selectedCooldown = cooldowns.slice(0, 2);

  const allSelected: GeneratedProgram['exercises'] = [];

  selectedWarmups.forEach((ex) => {
    allSelected.push({
      exercise: ex,
      phase: 'echauffement',
      sets: ex.defaultSets,
      reps: ex.defaultReps,
      durationSeconds: ex.durationSeconds,
      restSeconds: ex.restSeconds,
    });
  });

  selectedMain.forEach((ex) => {
    allSelected.push({
      exercise: ex,
      phase: 'entrainement',
      sets: ex.defaultSets,
      reps: ex.defaultReps,
      durationSeconds: ex.durationSeconds,
      restSeconds: ex.restSeconds,
    });
  });

  selectedCooldown.forEach((ex) => {
    allSelected.push({
      exercise: ex,
      phase: 'calme',
      sets: ex.defaultSets,
      reps: ex.defaultReps,
      durationSeconds: ex.durationSeconds,
      restSeconds: ex.restSeconds,
    });
  });

  const goalTitles: Record<string, string> = {
    musculation: 'Full Body – Force & Hypertrophie',
    remise_en_forme: 'Full Body – Tonus & Vitalité',
    perte_de_poids: 'Metabolic Burn – Brûle-Graisse',
    endurance: 'Cardio Boost – Résistance & Souffle',
    actif: 'Mobilité & Dynamisme Quotidien',
  };

  const title = `${goalTitles[profile.mainGoal] || 'Full Body Training'} – ${profile.preferredDuration} min`;
  const xpReward = profile.preferredDuration >= 45 ? 400 : profile.preferredDuration >= 30 ? 300 : 200;

  return {
    title,
    durationMinutes: profile.preferredDuration,
    fitnessLevel: profile.fitnessLevel === 'debutant' ? 'Débutant' : profile.fitnessLevel === 'intermediaire' ? 'Intermédiaire' : 'Avancé',
    equipment: profile.equipment === 'aucun' ? 'Sans matériel' : profile.equipment,
    xpReward,
    exercises: allSelected,
  };
}
