# AGENTS.md

Ce document résume l'architecture, les conventions et les décisions de conception de **LEVEL UP** pour les agents d'IA et développeurs intervenant sur ce dépôt.

---

## Vue d'ensemble du projet

**LEVEL UP** est une application web mobile de coaching sportif gamifié inspirée des codes du jeu vidéo RPG, conçue pour les 16-30 ans. Elle utilise l'IA pour générer et adapter des programmes physiques en temps réel tout en appliquant une boucle de gamification (XP, niveaux, quêtes quotidiennes, badges, classement social et cosmétiques d'avatar débloquables).

---

## Architecture des répertoires

```
├── db/
│   ├── index.ts                     # Initialisation du client Drizzle ORM avec adaptateur Netlify Database
│   └── schema.ts                    # Schéma relationnel complet PostgreSQL (14 tables de persistance)
├── netlify/
│   ├── database/
│   │   └── migrations/              # Fichiers de migrations SQL générés par drizzle-kit
│   └── functions/
│       ├── coach-ai.mts             # Endpoint serveur sécurisé pour les conseils et adaptations IA
│       └── workout-generator.mts    # Endpoint serveur pour la calibration algorithmique des séances
├── src/
│   ├── components/
│   │   ├── ActiveWorkoutScreen.tsx  # Mode entraînement en plein écran, chrono, séries, +50 XP
│   │   ├── AvatarDisplay.tsx        # Avatar SVG dynamique avec armures, auras et insignes de niveau
│   │   ├── BottomNav.tsx            # Barre de navigation mobile inférieure (5 onglets)
│   │   ├── LevelUpModal.tsx         # Célébration de passage de niveau & déblocage cosmétique
│   │   ├── NotificationCenterModal.tsx # Notifications positives et non-agressives
│   │   ├── OnboardingModal.tsx      # Introduction en 3 écrans
│   │   ├── QuestionnaireModal.tsx   # Questionnaire rapide 3 min avec avertissement médical
│   │   ├── SubscriptionModal.tsx    # Présentation des 3 offres (Gratuit, Standard, Premium)
│   │   ├── TopHeader.tsx            # En-tête avec pseudo, rang, flammes de série et notifications
│   │   └── WorkoutFinishedModal.tsx # Écran de victoire, calcul des calories, +300 XP
│   ├── context/
│   │   └── AppContext.tsx           # Machine d'état centralisée React Context (profil, XP, workout player)
│   ├── data/
│   │   ├── exercises.ts             # Base interne validée d'exercices & logique de filtrage sécurisé
│   │   └── mockData.ts              # Données initiales de démo (Lucas Niv. 7, amis, badges, quêtes)
│   ├── routes/
│   │   ├── __root.tsx               # Layout racine TanStack Router, polices Google et balises meta
│   │   └── index.tsx                # Page principale de l'application LEVEL UP
│   ├── screens/
│   │   ├── CoachScreen.tsx          # Chat conversationnel avec Coach A.I.D.E.N.
│   │   ├── HomeScreen.tsx           # Hub principal : Séance du jour, quêtes, XP bar, série
│   │   ├── LeaderboardScreen.tsx    # Classement social avec amis, podium et duels
│   │   ├── ProfileScreen.tsx        # Profil, statistiques, graphique Chart.js, avatar, badges
│   │   └── ProgramScreen.tsx        # Détail des 3 phases du programme d'entraînement
│   ├── router.tsx                   # Initialisation de TanStack Router
│   └── styles.css                   # Styles globaux Tailwind 4, néons et animations cyberpunk
├── drizzle.config.ts                # Configuration Drizzle Kit ciblant netlify/database/migrations
└── netlify.toml                     # Configuration de build et des fonctions Netlify
```

---

## Conventions & Règles Clés

1. **Sécurité Médicale & Entraînement** :
   - L'algorithme ne doit jamais inventer d'exercices libres. Tous les mouvements proviennent de `src/data/exercises.ts`.
   - Les contre-indications et limitations physiques doivent obligatoirement filtrer les mouvements concernés (ex: éviter fentes et sauts lors de douleurs aux genoux).
   - L'application rappelle explicitement qu'elle ne remplace aucun professionnel de santé.

2. **Gamification Éthique** :
   - Aucune mesure corporelle, perte de poids ou pesée intrusive n'est utilisée comme moteur de progression.
   - Les XP et les niveaux reposent exclusivement sur la régularité, les exercices validés, les quêtes accomplies et le temps d'effort.
   - L'avatar gagne des cosmétiques (armures nanotech, auras) basés sur le niveau et non sur la silhouette corporelle.

3. **Base de Données Netlify (Postgres)** :
   - Drizzle ORM est installé via le tag `@beta` (`drizzle-orm@beta` et `drizzle-kit@beta`).
   - Le schéma est centralisé dans `db/schema.ts` et les migrations SQL sont placées dans `netlify/database/migrations/`.
   - Ne jamais exécuter de migrations en local : Netlify les applique automatiquement lors du déploiement.

4. **Compatibilité SSR & Design Mobile** :
   - Les bibliothèques dépendantes du DOM (comme `canvas-confetti`) sont appelées de manière sécurisée en vérifiant `typeof window !== 'undefined'`.
   - La vue principale est dimensionnée pour une expérience native sur mobile (`max-w-md mx-auto`) tout en restant parfaitement lisible et centrée sur desktop.
