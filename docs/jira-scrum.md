# Méthodologie Jira / Scrum — Track&Go

## Gestion de Projet Agile avec Automatisation GitHub

---

## 1) Framework Scrum

### Sprint

| Paramètre | Valeur |
|-----------|--------|
| **Durée du sprint** | 2 semaines (10 jours ouvrés) |
| **Début** | 23/02/2026 |
| **Fin** | 06/03/2026 |
| **Outil** | Jira Software (Board Scrum) |

### Cérémonies

| Cérémonie | Quand | Durée | Objectif |
|-----------|-------|-------|----------|
| **Sprint Planning** | Jour 1 (23/02) | 1h | Définir le Sprint Goal, sélectionner les User Stories |
| **Daily Stand-up** | Chaque matin | 15 min | Synchronisation : ce qui a été fait, ce qui sera fait, blocages |
| **Sprint Review** | Jour 10 (06/03) | 50 min | Démonstration de l'application (évaluation) |
| **Sprint Retrospective** | Jour 10 (06/03) | 30 min | Retour d'expérience, améliorations |

---

## 2) Epics

| Epic | Clé | Description | Priorité |
|------|-----|-------------|----------|
| Authentification | AUTH | Login sécurisé, gestion de session | 🔴 High |
| Interface Tournée | UI | Liste des colis (FlatList), cartes de colis, navigation | 🔴 High |
| Vue Carte | MAP | Carte interactive avec points de livraison | 🔴 High |
| Scanner | SCAN | Scan codes-barres + vérification ID | 🔴 High |
| Géolocalisation | GEO | Capture GPS pour preuves de livraison | 🔴 High |
| Gestion Incidents | INC | Formulaire incident + photo + commentaire | 🔴 High |
| Persistance Données | DATA | AsyncStorage/SQLite + synchronisation API | 🟡 Medium |
| DevOps | OPS | CI/CD GitHub Actions + Docker mock API | 🟡 Medium |
| Tests | TEST | Tests unitaires et d'intégration | 🟡 Medium |

---

## 3) User Stories & Tâches

### Epic : Authentification (AUTH)

| Clé | Type | Résumé | Description | Priorité | Sprint |
|-----|------|--------|-------------|----------|--------|
| TG-1 | Story | Login livreur | En tant que livreur, je veux m'identifier avec mon email et mot de passe pour accéder à ma tournée | High | Sprint 1 |
| TG-2 | Task | Setup Expo + TypeScript | Initialiser le projet Expo avec TypeScript strict | High | Sprint 1 |
| TG-3 | Task | Écran Login UI | Créer l'écran de connexion avec formulaire validé | High | Sprint 1 |
| TG-4 | Task | Service d'authentification | Implémenter `auth.service.ts` avec appel API | High | Sprint 1 |
| TG-5 | Task | Persistance session | Sauvegarder le token dans AsyncStorage/SecureStore | Medium | Sprint 1 |

### Epic : Interface Tournée (UI)

| Clé | Type | Résumé | Description | Priorité | Sprint |
|-----|------|--------|-------------|----------|--------|
| TG-6 | Story | Liste des colis | En tant que livreur, je veux voir tous les colis de ma tournée dans une liste performante | High | Sprint 1 |
| TG-7 | Task | Navigation Expo Router | Configurer Auth Flow → Tabs Flow → Stack Navigator | High | Sprint 1 |
| TG-8 | Task | Composant ColisCard | Créer la carte colis avec statut, destinataire, créneau | High | Sprint 1 |
| TG-9 | Task | FlatList optimisée | Implémenter FlatList avec `getItemLayout`, mémorisation, `keyExtractor` | High | Sprint 1 |
| TG-10 | Task | Filtrage par statut | Permettre le filtrage temps réel (Tous, En attente, Livré, Incident) | Medium | Sprint 1 |
| TG-11 | Story | Détail d'un colis | En tant que livreur, je veux voir tous les détails d'un colis sélectionné | High | Sprint 1 |
| TG-12 | Task | Écran détail colis | Créer l'écran avec infos destinataire, poids, créneau, actions | High | Sprint 1 |
| TG-13 | Story | Tableau de bord | En tant que livreur, je veux voir l'avancement global de ma tournée | High | Sprint 1 |
| TG-14 | Task | Dashboard composants | Stats (total, livrés, en cours, échecs), barre de progression | High | Sprint 1 |

### Epic : Scanner (SCAN)

| Clé | Type | Résumé | Description | Priorité | Sprint |
|-----|------|--------|-------------|----------|--------|
| TG-15 | Story | Scan intelligent | En tant que livreur, je veux scanner le code du colis pour confirmer la remise | High | Sprint 2 |
| TG-16 | Task | Intégration expo-camera | Configurer `expo-camera` avec permissions et overlay de scan | High | Sprint 2 |
| TG-17 | Task | Vérification code-barres | Comparer le scan vs `colis.barcode`, feedback visuel/vibration | High | Sprint 2 |
| TG-18 | Task | Gestion faible luminosité | Activer le flash/torch dans des conditions sombres | Medium | Sprint 2 |

### Epic : Géolocalisation (GEO)

| Clé | Type | Résumé | Description | Priorité | Sprint |
|-----|------|--------|-------------|----------|--------|
| TG-19 | Story | Preuve GPS | En tant que livreur, je veux que ma position soit enregistrée lors de la validation | High | Sprint 2 |
| TG-20 | Task | Intégration expo-location | Configurer permissions + capture position HIGH_ACCURACY | High | Sprint 2 |
| TG-21 | Task | Validation précision GPS | Vérifier que la précision est < 50m avant validation | High | Sprint 2 |
| TG-22 | Task | Enregistrement ProofOfDelivery | Créer la preuve avec position, barcode, timestamp → API + local | High | Sprint 2 |

### Epic : Vue Carte (MAP)

| Clé | Type | Résumé | Description | Priorité | Sprint |
|-----|------|--------|-------------|----------|--------|
| TG-23 | Story | Carte des livraisons | En tant que livreur, je veux voir tous les points de livraison sur une carte | High | Sprint 2 |
| TG-24 | Task | Intégration react-native-maps | Configurer MapView avec marqueurs par colis | High | Sprint 2 |
| TG-25 | Task | Marqueurs colorés par statut | Vert=livré, Orange=en cours, Rouge=incident, Gris=en attente | Medium | Sprint 2 |
| TG-26 | Task | Position livreur temps réel | Afficher la position courante du livreur sur la carte | Medium | Sprint 2 |

### Epic : Gestion Incidents (INC)

| Clé | Type | Résumé | Description | Priorité | Sprint |
|-----|------|--------|-------------|----------|--------|
| TG-27 | Story | Signalement incident | En tant que livreur, je veux signaler un problème avec photo et commentaire | High | Sprint 2 |
| TG-28 | Task | Formulaire incident | Écran avec sélection type, champ commentaire, bouton photo | High | Sprint 2 |
| TG-29 | Task | Capture photo incident | Intégrer l'appareil photo pour les preuves visuelles | High | Sprint 2 |
| TG-30 | Task | Envoi incident API | POST /incidents + PATCH colis status → INCIDENT | High | Sprint 2 |

### Epic : Persistance Données (DATA)

| Clé | Type | Résumé | Description | Priorité | Sprint |
|-----|------|--------|-------------|----------|--------|
| TG-31 | Task | Service API centralisé | Créer `api.ts` avec configuration fetch/axios | High | Sprint 1 |
| TG-32 | Task | Service stockage local | Implémenter AsyncStorage ou expo-sqlite pour persistance | High | Sprint 1 |
| TG-33 | Task | Synchronisation double | Tout changement → API + local storage | High | Sprint 2 |

### Epic : DevOps (OPS)

| Clé | Type | Résumé | Description | Priorité | Sprint |
|-----|------|--------|-------------|----------|--------|
| TG-34 | Task | Docker mock API | Dockerfile + docker-compose pour JSON-Server | High | Sprint 1 |
| TG-35 | Task | Données de mock | Créer db.json avec livreurs, tournées, colis réalistes | High | Sprint 1 |
| TG-36 | Task | GitHub Actions CI | Pipeline lint + type-check sur chaque PR | High | Sprint 1 |

### Epic : Tests (TEST)

| Clé | Type | Résumé | Description | Priorité | Sprint |
|-----|------|--------|-------------|----------|--------|
| TG-37 | Task | Tests unitaires hooks | Tester useAuth, useColis, useScanner | Medium | Sprint 2 |
| TG-38 | Task | Tests composants | Tester ColisCard, IncidentForm, ScanOverlay | Medium | Sprint 2 |

---

## 4) Sprint Planning

### Sprint 1 (Jours 1–5) : Fondations & UI

**Sprint Goal** : Avoir une application navigable avec la liste des colis, le détail, le dashboard et les données mockées.

| Jour | Tâches | Tickets |
|------|--------|---------|
| **Jour 1** | Setup Expo + TypeScript + Expo Router + Docker mock API | TG-2, TG-34, TG-35 |
| **Jour 2** | Navigation (Auth → Tabs → Stacks) + Écran Login | TG-7, TG-3, TG-4, TG-5 |
| **Jour 3** | FlatList colis + ColisCard + Service API | TG-8, TG-9, TG-31, TG-32 |
| **Jour 4** | Filtrage par statut + Dashboard tableau de bord | TG-10, TG-13, TG-14 |
| **Jour 5** | Écran détail colis + Navigation Stack + CI/CD | TG-11, TG-12, TG-36 |

### Sprint 2 (Jours 6–10) : Hardware & Logique Avancée

**Sprint Goal** : Intégrer le scan, le GPS, la carte et les incidents pour un flux de livraison complet.

| Jour | Tâches | Tickets |
|------|--------|---------|
| **Jour 6** | expo-camera scanner + overlay + vérification barcode | TG-15, TG-16, TG-17 |
| **Jour 7** | react-native-maps + marqueurs + position livreur | TG-23, TG-24, TG-25, TG-26 |
| **Jour 8** | expo-location GPS + ProofOfDelivery + synchronisation | TG-19, TG-20, TG-21, TG-22, TG-33 |
| **Jour 9** | Formulaire incident + photo + envoi API | TG-27, TG-28, TG-29, TG-30 |
| **Jour 10** | Tests + polissage + flash/torch + démo | TG-18, TG-37, TG-38 |

---

## 5) Jira CSV — Backlog Prêt à Importer

> **Note** : Ce CSV est compatible avec l'import Jira Cloud. Ajuster le nom des colonnes selon votre configuration Jira.

```csv
Issue Type,Summary,Description,Epic Name,Epic Link,Priority,Sprint
Epic,Authentification,Login sécurisé et gestion de session livreur,Authentification,,High,
Epic,Interface Tournée,Liste des colis FlatList et navigation hybride,Interface Tournée,,High,
Epic,Vue Carte,Carte interactive avec points de livraison,Vue Carte,,High,
Epic,Scanner,Scan codes-barres 1D/2D avec vérification ID,Scanner,,High,
Epic,Géolocalisation,Capture GPS pour preuves de livraison certifiées,Géolocalisation,,High,
Epic,Gestion Incidents,Signalement d'incidents avec photo et commentaire,Gestion Incidents,,High,
Epic,Persistance Données,AsyncStorage/SQLite et synchronisation API,Persistance Données,,Medium,
Epic,DevOps,CI/CD GitHub Actions et Docker mock API,DevOps,,Medium,
Epic,Tests,Tests unitaires et d'intégration,Tests,,Medium,
Story,TG-1 En tant que livreur je veux me connecter,Login avec email/password pour accéder à la tournée,,Authentification,High,Sprint 1
Story,TG-6 En tant que livreur je veux voir mes colis,Liste performante FlatList de tous les colis de la tournée,,Interface Tournée,High,Sprint 1
Story,TG-11 En tant que livreur je veux voir le détail d'un colis,Informations complètes du colis sélectionné,,Interface Tournée,High,Sprint 1
Story,TG-13 En tant que livreur je veux voir mon avancement,Tableau de bord avec stats de progression,,Interface Tournée,High,Sprint 1
Story,TG-15 En tant que livreur je veux scanner le code du colis,Scan code-barres avec vérification d'ID automatique,,Scanner,High,Sprint 2
Story,TG-19 En tant que livreur je veux certifier ma position,Position GPS enregistrée lors de la validation,,Géolocalisation,High,Sprint 2
Story,TG-23 En tant que livreur je veux voir la carte,Carte interactive avec tous les points de livraison,,Vue Carte,High,Sprint 2
Story,TG-27 En tant que livreur je veux signaler un incident,Formulaire incident avec photo et commentaire,,Gestion Incidents,High,Sprint 2
Task,TG-2 Setup Expo TypeScript,Initialiser le projet Expo avec TypeScript strict,,Authentification,High,Sprint 1
Task,TG-3 Écran Login UI,Créer l'écran de connexion avec formulaire validé,,Authentification,High,Sprint 1
Task,TG-4 Service authentification,Implémenter auth.service.ts avec appel API,,Authentification,High,Sprint 1
Task,TG-5 Persistance session,Sauvegarder le token dans AsyncStorage,,Authentification,Medium,Sprint 1
Task,TG-7 Navigation Expo Router,Configurer Auth Flow → Tabs Flow → Stack Navigator,,Interface Tournée,High,Sprint 1
Task,TG-8 Composant ColisCard,Créer la carte colis avec statut et destinataire,,Interface Tournée,High,Sprint 1
Task,TG-9 FlatList optimisée,Implémenter FlatList avec getItemLayout et mémorisation,,Interface Tournée,High,Sprint 1
Task,TG-10 Filtrage par statut,Filtrage temps réel par statut des colis,,Interface Tournée,Medium,Sprint 1
Task,TG-12 Écran détail colis,Écran avec infos destinataire et actions,,Interface Tournée,High,Sprint 1
Task,TG-14 Dashboard composants,Stats total livrés en cours échecs et barre de progression,,Interface Tournée,High,Sprint 1
Task,TG-16 Intégration expo-camera,Configurer expo-camera avec permissions et overlay,,Scanner,High,Sprint 2
Task,TG-17 Vérification code-barres,Comparer scan vs colis.barcode avec feedback,,Scanner,High,Sprint 2
Task,TG-18 Gestion faible luminosité,Activer flash/torch en conditions sombres,,Scanner,Medium,Sprint 2
Task,TG-20 Intégration expo-location,Configurer permissions et capture HIGH_ACCURACY,,Géolocalisation,High,Sprint 2
Task,TG-21 Validation précision GPS,Vérifier précision < 50m avant validation,,Géolocalisation,High,Sprint 2
Task,TG-22 Enregistrement ProofOfDelivery,Créer preuve avec position barcode timestamp,,Géolocalisation,High,Sprint 2
Task,TG-24 Intégration react-native-maps,Configurer MapView avec marqueurs par colis,,Vue Carte,High,Sprint 2
Task,TG-25 Marqueurs colorés par statut,Vert livré orange en cours rouge incident,,Vue Carte,Medium,Sprint 2
Task,TG-26 Position livreur temps réel,Afficher position courante du livreur sur la carte,,Vue Carte,Medium,Sprint 2
Task,TG-28 Formulaire incident,Écran avec type commentaire et bouton photo,,Gestion Incidents,High,Sprint 2
Task,TG-29 Capture photo incident,Intégrer appareil photo pour preuves visuelles,,Gestion Incidents,High,Sprint 2
Task,TG-30 Envoi incident API,POST incidents et PATCH colis status INCIDENT,,Gestion Incidents,High,Sprint 2
Task,TG-31 Service API centralisé,Créer api.ts avec configuration fetch/axios,,Persistance Données,High,Sprint 1
Task,TG-32 Service stockage local,Implémenter AsyncStorage ou expo-sqlite,,Persistance Données,High,Sprint 1
Task,TG-33 Synchronisation double,Tout changement API et local storage,,Persistance Données,High,Sprint 2
Task,TG-34 Docker mock API,Dockerfile et docker-compose pour JSON-Server,,DevOps,High,Sprint 1
Task,TG-35 Données de mock,Créer db.json avec données réalistes,,DevOps,High,Sprint 1
Task,TG-36 GitHub Actions CI,Pipeline lint et type-check sur chaque PR,,DevOps,High,Sprint 1
Task,TG-37 Tests unitaires hooks,Tester useAuth useColis useScanner,,Tests,Medium,Sprint 2
Task,TG-38 Tests composants,Tester ColisCard IncidentForm ScanOverlay,,Tests,Medium,Sprint 2
```

---

## 6) Automatisation GitHub ↔ Jira

### 6.1. Convention de Nommage

#### Branches

```
feature/TG-<ID>-<description-courte>
```

**Exemples :**
- `feature/TG-7-navigation-expo-router`
- `feature/TG-16-scanner-integration`
- `feature/TG-28-incident-form`
- `fix/TG-17-barcode-mismatch`

#### Commits

```
TG-<ID>: <description du changement>
```

**Exemples :**
- `TG-7: configure Expo Router with auth and tab layouts`
- `TG-16: integrate expo-camera with barcode scanning`
- `TG-28: create incident reporting form with photo capture`

#### Pull Requests

```
TG-<ID> <Description>
```

**Exemples :**
- `TG-7 Navigation Expo Router`
- `TG-15 Scanner intelligent avec vérification barcode`
- `TG-27 Gestion complète des incidents`

### 6.2. Transition Automatique (Jira Automation)

Configurer une règle d'automatisation Jira pour que les tickets passent automatiquement à **Done** après le merge de la PR :

#### Règle Jira Automation

```
Nom : Auto-transition PR Merged → Done
Trigger : Pull Request merged (GitHub)
Condition : Clé de ticket détectée dans le titre de la PR (regex: TG-\d+)
Action : Transition de l'issue vers "Done"
```

#### Configuration étape par étape

1. **Jira** → Paramètres du projet → Automatisation → Créer une règle
2. **Trigger** : `When: Pull Request Merged` (connecter le repo GitHub)
3. **Condition** : `If: PR title contains TG-\d+` (Smart Value regex)
4. **Action** : `Then: Transition issue to Done`
5. **Activer** la règle

### 6.3. Intégration GitHub ↔ Jira

#### Installation

1. Installer l'application **Jira Software for GitHub** depuis le GitHub Marketplace
2. Connecter votre organisation GitHub à Jira
3. Lier le repository `track-go` au projet Jira `TG`

#### Résultat attendu

- Les références `TG-XX` dans les commits/PRs sont automatiquement liées aux tickets Jira
- L'onglet "Development" dans Jira affiche les branches, commits et PRs associés
- Le merge d'une PR déclenche la transition automatique vers Done

---

## 7) Branch Protection Rules (GitHub)

### Configuration Repository Settings → Branches → Branch Protection

```yaml
Branch: main
Rules:
  - ✅ Require a pull request before merging
  - ✅ Require status checks to pass before merging
    - Required checks:
      - "Lint"
      - "Type Check"
  - ✅ Require conversation resolution before merging
  - ✅ Include administrators
```

### Workflow recommandé

```
main (protégé)
  └── develop (intégration)
       ├── feature/TG-7-navigation
       ├── feature/TG-16-scanner
       └── fix/TG-17-barcode
```

1. Créer une branche `feature/TG-XX-description` depuis `develop`
2. Développer et committer avec `TG-XX: message`
3. Ouvrir une PR vers `develop` avec titre `TG-XX Description`
4. CI vérifie lint + type-check
5. Code review (si applicable)
6. Merge → ticket Jira passe à Done automatiquement
7. PR périodique `develop` → `main` pour les releases

---

## 8) Tableau de Suivi (Jira Board)

### Colonnes du Board Scrum

| Colonne | Description | Limite WIP |
|---------|-------------|------------|
| **Backlog** | Tickets planifiés non commencés | — |
| **To Do** | Tickets du sprint courant à faire | — |
| **In Progress** | Tickets en cours de développement | 3 |
| **Code Review** | PR ouverte, en attente de review | 2 |
| **Done** | PR mergée, ticket complété | — |

### Définition of Done (DoD)

Un ticket est **Done** quand :
- [ ] Le code est écrit et respecte les conventions TypeScript
- [ ] Le code est testé (si applicable au ticket)
- [ ] La PR passe le pipeline CI (lint + type-check)
- [ ] La PR est mergée dans `develop`
- [ ] Le ticket Jira est en statut "Done"
