# Cahier des Charges — Track&Go

## Application mobile de gestion du dernier kilomètre

---

## 1. Contexte du Projet

**Track&Go** est une solution mobile destinée aux entreprises de transport express pour la gestion du **"dernier kilomètre"**. Dans une industrie où la précision et la traçabilité sont vitales, cette application doit permettre aux livreurs de gérer leur tournée de manière fluide, tout en fournissant des **preuves de livraison incontestables** (géolocalisation, scan, photos).

L'objectif de ce sprint de **2 semaines** est de passer d'une idée à une application robuste et performante, capable de gérer les conditions réelles du terrain (erreurs de scan, incidents).

---

## 2. Objectifs d'Apprentissage

À l'issue de ce projet, les apprenants auront acquis des compétences en **React Native** :

- **Design System mobile** : Maîtriser Flexbox, SafeAreas, Typographie responsive
- **Listes dynamiques** : Optimiser le rendu via FlatList (mémorisation, `getItemLayout`)
- **Navigation hybride complexe** : Auth Flow → Tabs Flow → Stacks imbriquées (Expo Router)
- **État persistant** : Gérer un état synchronisé entre plusieurs écrans
- **Vision par ordinateur** : Intégration caméra pour scan codes-barres 1D/2D (conditions de faible luminosité)
- **Géolocalisation** : Monitoring position en arrière-plan + cartes interactives (`react-native-maps`)
- **Capture médias** : Appareil photo pour preuves de livraison / rapports d'incidents
- **Services asynchrones** : Consommation de données via REST / JSON-Server

---

## 3. User Stories

| ID  | User Story | Description |
|-----|-----------|-------------|
| US1 | **Auth & Session** | En tant que livreur, je veux m'identifier de manière sécurisée pour accéder à mes tournées personnelles. |
| US2 | **Tableau de Bord interactif** | En tant que livreur, je veux voir l'avancement global de ma tournée sous forme de liste et de carte. |
| US3 | **Validation par Scan Intelligent** | En tant que livreur, je veux scanner le code du colis pour confirmer la remise, avec une vérification d'ID. |
| US4 | **Preuve de Livraison Géo-certifiée** | En tant que livreur, je veux que ma position soit enregistrée lors de la validation pour certifier mon passage. |
| US5 | **Gestion d'Incident Complexe** | En tant que livreur, je veux pouvoir signaler un problème (Destinataire absent / Colis endommagé) avec une photo et un commentaire. |

---

## 4. Plan de Développement (2 Semaines)

### Semaine 1 : Fondations, UI et Listes

| Jour | Objectifs |
|------|-----------|
| **Jour 1-2** | Setup environnement (TypeScript, Expo, Android Studio/Emulator ou Expo Go), Navigation (Expo Router) |
| **Jour 3-4** | Écran "Ma Tournée" — FlatList avec données mockées complexes, design des cartes de colis |
| **Jour 5** | Écran Détail du colis — Navigation Stack, passage de paramètres, premières interactions |

### Semaine 2 : Hardware et Logique Avancée

| Jour | Objectifs |
|------|-----------|
| **Jour 6-7** | Intégration `expo-camera` (scan) + `react-native-maps` (vue carte) |
| **Jour 8** | Logique de validation — Captures GPS (`expo-location`), gestion des changements d'état |
| **Jour 9** | Gestion des incidents — Formulaires multipages, appareil photo, feedback utilisateur |
| **Jour 10** | Polissage final, optimisation des performances (JSI), tests sur appareils réels, démonstration |

---

## 5. Contraintes Techniques Obligatoires

| Contrainte | Exigence |
|-----------|----------|
| **Langage** | TypeScript obligatoire (typage strict des données colis) |
| **Architecture** | Dossiers structurés : `components/`, `services/`, `hooks/`, `constants/` |
| **Navigation** | Expo Router (File-based navigation) |
| **Style** | NativeWind ou StyleSheet |
| **CI/CD** | GitHub Action déclenchée à chaque Pull Request : Linting + Type-checking (Bonus: Build) |
| **Docker** | Dockerfile + `docker-compose.yml` pour lancer le serveur mock API (JSON-Server) |

---

## 6. Architecture des Données & Consommation

### 6.1. Source de Vérité (Remote API)

- **Outil** : Serveur mock API lancé via Docker (JSON-Server)
- **Consommation** : `fetch` ou `axios` centralisée dans un dossier `services/`
- **Format** : Données typées immédiatement avec TypeScript

### 6.2. État Global & Local (Application State)

- **Synchronisation** : Au lancement, l'application récupère la liste des colis depuis l'API
- **Gestion** : `useState` ou `useReducer` pour l'état local de la tournée (ex: filtrage en temps réel)

### 6.3. Persistance (Local Storage)

- **Outil** : `expo-sqlite` ou `AsyncStorage`
- **Rôle** : Sauvegarder l'état de la tournée (éviter perte de données en cas de fermeture/crash)
- **Flux** : Tout changement de statut (colis livré) → mise à jour sur l'API **ET** dans le stockage local

---

## 7. Défis Bonus

| # | Défi | Description |
|---|------|-------------|
| 1 | **Dark Mode Complet** | Adaptation automatique de l'interface et de la carte au thème système |
| 2 | **Statistiques Temps Réel** | Onglet "Performance" avec graphiques (temps moyen de livraison) |
| 3 | **Build Automatisé** | EAS Build + GitHub Actions pour générer APK/IPA sur tag de version |
| 4 | **Signature Digitale** | Canvas de signature (`react-native-signature-canvas`) pour signature client |
| 5 | **Optimisation d'Itinéraire** | Ordre optimal de livraison en fonction de la distance |
| 6 | **Notifications Client** | Simulation notification de proximité (livreur à < 1 km) |
| 7 | **Pull-to-Refresh** | Système de rafraîchissement des données au besoin |

---

## 8. Modalités Pédagogiques

- **Travail** : En groupes
- **Date de début** : 23/02/2026
- **Deadline** : 06/03/2026 (10 jours)

---

## 9. Modalités d'Évaluation

Durée : **50 minutes** organisées comme suit :

| Durée | Phase |
|-------|-------|
| 10 min | Démonstration du contenu et des fonctionnalités |
| 5 min | Présentation du code source et explications |
| 20 min | Mise en situation |
| 15 min | Code Review + Questions culture Web |

---

## 10. Livrables

- Repository GitHub propre avec **README détaillé** (architecture, guide d'installation, configuration)
- **Jira** pour la planification
- Tests, Docker et **Pipelines CI/CD en succès**

---

## 11. Critères de Performance

| Critère | Description |
|---------|-------------|
| Structure du projet | Organisation claire et logique des fichiers |
| Nommage | Dossiers et fichiers principaux bien nommés |
| Clarté du code | Code lisible et maintenable |
| DRY | Éviter la répétition des fonctions |
| SRP | Une fonction/méthode = une seule responsabilité |
| Nommage fonctions/variables | Noms explicites et cohérents |
| Validation des entrées | Données validées avant traitement |
| Gestion des erreurs | Error handling robuste |
| Documentation | Capacité à comprendre et lire la documentation |
