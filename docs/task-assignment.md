# Task Assignment — Track&Go

> **Date**: 24/02/2026  
> **Method**: Tasks were redistributed by AI to **break technical silos**. Each member now works across multiple domains (UI, Logic, Hardware, and DevOps) to ensure knowledge sharing and team versatility.

---

## Distribution Logic

| #   | Principle              | Why                                                                              |
| --- | ---------------------- | -------------------------------------------------------------------------------- |
| 1   | **Anti-Silo Approach** | No more single "owners" of tech parts. Everyone touches UI, Logic, and Hardware. |
| 2   | **Equal load**         | ~7-8 tasks per person.                                                           |
| 3   | **Cross-Learning**     | Developers share knowledge during PR reviews since they work on diverse domains. |
| 4   | **Skill diversity**    | Each member manages a mix of Frontend, Backend integrations, and DevOps.         |

---

## Assignments

### 🟦 Mustapha Boukadi (MB)

**Focus**: UI Core, Geolocation, Map and DevOps integration.

| Key   | Summary                       | Domain |
| ----- | ----------------------------- | ------ |
| TG-19 | Écran Login UI                | UI     |
| TG-24 | FlatList optimisée            | UI     |
| TG-31 | Intégration expo-location     | Device |
| TG-34 | Intégration react-native-maps | Map    |
| TG-39 | Envoi incident API            | API    |
| TG-45 | GitHub Actions CI             | DevOps |
| TG-46 | Tests unitaires hooks         | Tests  |

---

### 🟩 Mohamed EDDAHMANI (ME)

**Focus**: Logic, Detailed screens, Scan verification, and DevOps.

| Key   | Summary                      | Domain |
| ----- | ---------------------------- | ------ |
| TG-20 | Service d'authentification   | Logic  |
| TG-26 | Écran détail colis           | UI     |
| TG-29 | Vérification code-barres     | Device |
| TG-35 | Marqueurs colorés par statut | Map    |
| TG-41 | Service stockage local       | Logic  |
| TG-43 | Docker mock API              | DevOps |
| TG-47 | Tests composants             | Tests  |

---

### 🟧 drissnafi3 (DN)

**Focus**: Auth logic, Components UI, Camera interaction, and Mock data.

| Key   | Summary                     | Domain |
| ----- | --------------------------- | ------ |
| TG-21 | Persistance session         | Auth   |
| TG-23 | Composant ColisCard         | UI     |
| TG-27 | Dashboard composants        | UI     |
| TG-28 | Intégration expo-camera     | Device |
| TG-32 | Validation précision GPS    | Device |
| TG-36 | Position livreur temps réel | Map    |
| TG-44 | Données de mock             | Data   |

---

### 🟪 Anime World (AW)

**Focus**: Navigation, Logic services, Scan hardware, and Incident flows.

| Key   | Summary                        | Domain |
| ----- | ------------------------------ | ------ |
| TG-22 | Navigation Expo Router         | UI     |
| TG-25 | Filtrage par statut            | UI     |
| TG-30 | Gestion faible luminosité      | Device |
| TG-33 | Enregistrement ProofOfDelivery | Logic  |
| TG-37 | Formulaire incident            | UI     |
| TG-38 | Capture photo incident         | Device |
| TG-40 | Service API centralisé         | Logic  |
| TG-42 | Synchronisation double         | Logic  |

---

## Rules

1. **Knowledge Sharing**: If you are working on a domain for the first time (e.g., GPS integration), tag the previous "expert" in your PR for review.
2. **Coordination**: Since multiple people now touch the Map or the API services, coordinate in the daily stand-up to avoid breaking shared components.
3. **All work goes through PRs** into `develop` — no direct pushes.
