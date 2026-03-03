## Track&Go – Contexte du Projet

**Track&Go** est une solution mobile destinée aux entreprises de transport express pour la gestion du **dernier kilomètre**.  
Dans une industrie où la précision et la traçabilité sont vitales, cette application doit permettre aux livreurs de:

- **Gérer leur tournée** de manière fluide.
- **Fournir des preuves de livraison incontestables** (géolocalisation, scan, photos).

L'objectif de ce sprint de 2 semaines est de passer d'une idée à une application **robuste et performante**, capable de gérer les **conditions réelles du terrain** (erreurs de scan, incidents).

---

## 1. Objectifs d'apprentissage

À l'issue de ce projet, les apprenants auront acquis des compétences en React Native pour:

- **Design System mobile**
  - Maîtriser Flexbox.
  - Gérer les SafeAreas.
  - Gérer une typographie responsive.

- **Listes dynamiques massives**
  - Optimiser le rendu via `FlatList`.
  - Utiliser la mémorisation.
  - Configurer `getItemLayout` pour de grosses listes.

- **Navigation hybride complexe**
  - Implémenter un Auth Flow → Tabs Flow → Stacks imbriquées.

- **Gestion d'état d'application**
  - Gérer un état persistant et synchronisé entre plusieurs écrans.

- **Vision par ordinateur**
  - Intégration fine de la caméra pour le scan de codes-barres 1D/2D.
  - Gestion des conditions de faible luminosité.

- **Système de géolocalisation**
  - Monitoring de la position en arrière-plan.
  - Visualisation sur cartes interactives (`react-native-maps`).

- **Capture médias**
  - Gestion de l'appareil photo pour les preuves de livraison / rapports d'incidents.

- **Consommation de services asynchrones**
  - Consommer une API REST/JSON-Server.

---

## 2. User Stories

- **US1 – Auth & Session**  
  En tant que livreur, je veux m'identifier de manière sécurisée pour accéder à mes tournées personnelles.

- **US2 – Tableau de bord interactif**  
  En tant que livreur, je veux voir l'avancement global de ma tournée sous forme de liste et de carte.

- **US3 – Validation par scan intelligent**  
  En tant que livreur, je veux scanner le code du colis pour confirmer la remise, avec une vérification d'ID.

- **US4 – Preuve de livraison géo-certifiée**  
  En tant que livreur, je veux que ma position soit enregistrée lors de la validation pour certifier mon passage.

- **US5 – Gestion d'incident complexe**  
  En tant que livreur, je veux pouvoir signaler un problème (destinataire absent / colis endommagé) avec une photo et un commentaire.

---

## 3. Plan de développement (2 semaines)

### Semaine 1 – Fondations, UI et listes

- **Jour 1-2**
  - Setup de l'environnement:
    - TypeScript.
    - Expo.
    - Android Studio / Emulator ou Expo GO.
  - Mise en place de la navigation via **Expo Router**.

- **Jour 3-4**
  - Écran **"Ma Tournée"**.
  - Implémentation d'une `FlatList` avec des données mockées complexes.
  - Design des cartes de colis.

- **Jour 5**
  - Écran **détail du colis**.
  - Navigation Stack.
  - Passage de paramètres et premières interactions simples.

### Semaine 2 – Hardware et logique avancée

- **Jour 6-7**
  - Intégration de `expo-camera` pour le scan.
  - Intégration de `react-native-maps` pour la vue carte.

- **Jour 8**
  - Logique de validation.
  - Captures GPS (`expo-location`).
  - Gestion des changements d'état (ex: colis livré).

- **Jour 9**
  - Gestion des incidents.
  - Formulaires multipages.
  - Intégration appareil photo et feedback utilisateur.

- **Jour 10**
  - Polissage final.
  - Optimisation des performances (JSI).
  - Tests sur appareils réels.
  - Démonstration.

---

## 4. Contraintes techniques obligatoires

- **Langage**:  
  - TypeScript obligatoire (typage strict des données colis).

- **Architecture**:  
  - Dossiers structurés par `components`, `services`, `hooks`, `constants`.

- **Navigation**:  
  - Utilisation de **Expo Router** (file-based navigation).

- **Style**:  
  - `NativeWind` ou `StyleSheet`.

- **CI/CD**:  
  - Mise en place d'une GitHub Action qui se déclenche à chaque Pull Request pour:
    - Vérifier le linting.
    - Vérifier le type-checking TypeScript.
    - (Bonus) Build.

- **Docker**:  
  - Fournir un `Dockerfile` et un `docker-compose.yml` pour lancer le serveur de mock API.

---

## 5. Architecture des données & consommation

Pour garantir une application fluide et réactive, la gestion des données suit une architecture à trois niveaux:

### 5.1. Source de vérité (Remote API)

- **Outil**:  
  - Serveur de mock API lancé via Docker (`JSON-Server`).
- **Consommation**:  
  - Utilisation de `fetch` ou `axios` centralisée dans le dossier `services/`.
- **Format**:  
  - Les données reçues sont immédiatement typées avec TypeScript pour éviter les erreurs de manipulation.

### 5.2. État global & local (Application State)

- **Synchronisation**:  
  - Au lancement, l'application récupère la liste des colis depuis l'API.
- **Gestion**:  
  - Utilisation de `useState` ou `useReducer` pour gérer l'état local de la tournée (ex: filtrage en temps réel).

### 5.3. Persistance (Local Storage)

- **Outil**:  
  - `expo-sqlite` ou `AsyncStorage`.
- **Rôle**:  
  - Sauvegarder l'état de la tournée pour éviter la perte de données en cas de fermeture de l'app ou de crash.
- **Flux**:  
  - Tout changement de statut (colis livré) doit être mis à jour:
    - Sur l'API.
    - Dans le stockage local.

---

## 6. Défis bonus

- **Dark mode complet**  
  - Adaptation automatique de l'interface et de la carte au thème système.

- **Statistiques en temps réel**  
  - Ajouter un onglet "Performance" avec des graphiques (ex: temps moyen de livraison).

- **Build automatisé**  
  - Utiliser EAS Build avec GitHub Actions pour générer un APK/IPA automatiquement sur un tag de version.

- **Signature digitale**  
  - Intégrer un canvas de signature (`react-native-signature-canvas`) pour permettre au client de signer directement sur l'écran du livreur.

- **Optimisation d'itinéraire**  
  - Calculer et afficher l'ordre optimal de livraison en fonction de la distance entre le livreur et tous les points restants.

- **Notifications client automatiques**  
  - Simuler l'envoi d'un SMS ou d'une notification de "proximité" au client lorsque le livreur est à moins d'un kilomètre de l'adresse de livraison.

- **Optimisation des requêtes réseau**  
  - Les données ne doivent pas être récupérées inutilement.
  - Implémenter un système de rafraîchissement "au besoin" (pull-to-refresh, invalidation ciblée, etc.).

# Track-Go

A Go project for tracking.

## Git Workflow

- **main**: Production-ready code. No direct pushes.
- **develop**: Integration branch. No direct development.
- **feature/**: Feature branches created from `develop`.
- **hotfix/**: Temporary branches for production fixes.
