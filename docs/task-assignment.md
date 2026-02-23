# Task Assignment — Track&Go

> **Date**: 23/02/2026  
> **Method**: Tasks were distributed equally by AI based on **Epic ownership** — each member owns complete features end-to-end to avoid merge conflicts and maximize autonomy.

---

## Distribution Logic

| #   | Principle                | Why                                                                                    |
| --- | ------------------------ | -------------------------------------------------------------------------------------- |
| 1   | **Feature ownership**    | Each member owns full Epics (not random tasks) so they don't step on each other's code |
| 2   | **Equal load**           | ~10 issues per person (Epics + Stories + Tasks)                                        |
| 3   | **Minimal dependencies** | Sprint 1 tasks have almost zero cross-member dependencies                              |
| 4   | **Skill diversity**      | Each member touches both UI and logic work                                             |

---

## Assignments

### 🟦 drissnafi3 — Auth + DevOps (10 tasks)

**Why**: As Scrum Master, owns the project foundation (setup, CI/CD, Docker) and the entry point (login).

| Key   | Summary                    |
| ----- | -------------------------- |
| TG-1  | Epic: Authentification     |
| TG-8  | Epic: DevOps               |
| TG-10 | Login livreur (Story)      |
| TG-18 | Setup Expo + TypeScript    |
| TG-19 | Écran Login UI             |
| TG-20 | Service d'authentification |
| TG-21 | Persistance session        |
| TG-43 | Docker mock API            |
| TG-44 | Données de mock            |
| TG-45 | GitHub Actions CI          |

---

### 🟩 Mustapha Boukadi — Interface Tournée UI (10 tasks)

**Why**: Owns all screens the user sees daily — the list, detail, dashboard, and navigation.

| Key   | Summary                   |
| ----- | ------------------------- |
| TG-2  | Epic: Interface Tournée   |
| TG-11 | Liste des colis (Story)   |
| TG-12 | Détail d'un colis (Story) |
| TG-13 | Tableau de bord (Story)   |
| TG-22 | Navigation Expo Router    |
| TG-23 | Composant ColisCard       |
| TG-24 | FlatList optimisée        |
| TG-25 | Filtrage par statut       |
| TG-26 | Écran détail colis        |
| TG-27 | Dashboard composants      |

---

### 🟧 Mohamed EDDAHMANI — Scanner + GPS (10 tasks)

**Why**: Owns all hardware integrations — camera scanning and geolocation proof of delivery.

| Key   | Summary                        |
| ----- | ------------------------------ |
| TG-4  | Epic: Scanner                  |
| TG-5  | Epic: Géolocalisation          |
| TG-14 | Scan intelligent (Story)       |
| TG-15 | Preuve GPS (Story)             |
| TG-28 | Intégration expo-camera        |
| TG-29 | Vérification code-barres       |
| TG-30 | Gestion faible luminosité      |
| TG-31 | Intégration expo-location      |
| TG-32 | Validation précision GPS       |
| TG-33 | Enregistrement ProofOfDelivery |

---

### 🟪 Anime World — Carte + Incidents + Data + Tests (8 tasks)

**Why**: Owns the map view, incident reporting, data persistence layer, and quality assurance.

| Key      | Summary                                  |
| -------- | ---------------------------------------- |
| TG-3     | Epic: Vue Carte                          |
| TG-6     | Epic: Gestion Incidents                  |
| TG-7     | Epic: Persistance Données                |
| TG-9     | Epic: Tests                              |
| TG-16    | Carte des livraisons (Story)             |
| TG-17    | Signalement incident (Story)             |
| TG-34–36 | Maps, Marqueurs, Position livreur        |
| TG-37–42 | Incident form, Photo, API, Storage, Sync |
| TG-46–47 | Tests hooks + composants                 |

---

## Rules

1. **Don't code outside your Epic** without talking to the owner first.
2. **If you need something from another Epic** (e.g., API service), coordinate in the daily stand-up.
3. **All work goes through PRs** into `develop` — no direct pushes.
