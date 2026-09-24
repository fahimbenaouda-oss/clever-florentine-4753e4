# LEVEL UP - Application Mobile de Coaching Sportif Gamifié & IA

LEVEL UP transforme le sport en une véritable aventure RPG cyberpunk. Conçue pour les 16-30 ans, les gamers, les étudiants et les débutants comme les athlètes à domicile ou en salle, l'application associe l'intelligence artificielle d'adaptation d'entraînement et une gamification poussée (XP, niveaux, quêtes quotidiennes, badges, classement social et avatar évolutif) pour maximiser la motivation durable.

---

## 🌟 Fonctionnalités Clés

1. **Onboarding Interactif (3 Écrans)** : Présentation de l'aventure sportive, de la boucle de progression en XP et accès direct au questionnaire ou au compte de démonstration immédiat (Lucas - Niveau 7).
2. **Questionnaire Sportif Évolué (3 min)** : Définition des objectifs (musculation, remise en forme, perte de poids, endurance, maintien actif), niveau, lieu (maison, salle, extérieur), matériel disponible, fréquence, préférences et limitations physiques avec clause de non-responsabilité médicale explicite.
3. **Génération de Séances par IA & Base Sécurisée** : Sélection rigoureuse à partir d'une bibliothèque interne validée (instructions pas-à-pas, erreurs courantes à éviter, contre-indications) segmentée en 3 phases (Échauffement, Entraînement, Retour au calme).
4. **Mode Entraînement Actif ("Workout Player")** : Défilement exercice par exercice, chronomètre interactif de tempo et de repos, suivi des séries/répétitions, boutons d'aide & conseils de sécurité, et feedback instantané de récompense `+50 XP`.
5. **Écran de Victoire & Célébration ("LEVEL UP !")** : Récompense de fin de séance `+300 XP`, résumé des calories et du temps d'effort, jauge de niveau et célébration par confettis et déblocage de nouvelles armures cyberpunk.
6. **Avatar RPG Évolutif** : Personnage 100% basé sur la constance et l'XP (jamais sur le poids ou l'apparence physique), débloquant armures nanotech, auras cosmiques et titres honorifiques.
7. **Coach IA Conversationnel (A.I.D.E.N)** : Chat intelligent capable d'adapter une séance à la volée (ex: "Je n'ai que 20 minutes", "Je n'ai pas mes haltères", "Gêne au genou"), toujours bienveillant, encourageant et sans diagnostic médical.
8. **Classement Social & Duels Amicaux** : Classement hebdomadaire et mensuel avec Thomas, Lucas, Emma, Antoine, Chloé, et possibilité de lancer des défis d'entraînement en 30 minutes.
9. **Centre de Notifications Positif** : Rappels stimulants et non-culpabilisants respectant le rythme du sportif.
10. **Abonnements Simulés** : Choix entre Gratuit (0 €), Standard (7,99 €/mois) et Premium (14,99 €/mois) avec validation instantanée.

---

## 🛠️ Stack Technique

- **Framework** : TanStack Start + React 19 + TypeScript
- **Routage** : TanStack Router
- **Style & Design** : Tailwind CSS v4 + Dark Mode Cyberpunk + Polices Google (*Plus Jakarta Sans*, *Rajdhani*, *JetBrains Mono*)
- **Visualisations & Graphiques** : Chart.js + React-Chartjs-2
- **Animations & Effets** : Canvas-Confetti, micro-interactions CSS & shimmers d'XP
- **Persistance & Base de Données** : Netlify Database (PostgreSQL managé) avec Drizzle ORM
- **Fonctions Serverless** : Netlify Functions (`netlify/functions/coach-ai.mts`, `netlify/functions/workout-generator.mts`)
- **Déploiement** : Netlify

---

## 🚀 Démarrage Local

```bash
# Installation des dépendances
pnpm install

# Lancement du serveur de développement local
pnpm run dev
```

L'application est optimisée pour l'affichage mobile et s'adapte automatiquement à toutes les tailles d'écrans.
