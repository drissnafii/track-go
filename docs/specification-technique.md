# Spécification Technique — Track&Go

> 🚚 Ce document est la **spécification technique complète** pour construire Track&Go en **2 semaines** (Sprint), avec **best practices** React Native et une base solide pour évoluer.
>
> - Stack cible : **Expo SDK** + **React Native** + **TypeScript** + **JSON-Server** (Docker) + **GitHub Actions**
> - Navigation : **Expo Router** (file-based) — Auth Flow → Tabs → Stacks
> - Hardware : `expo-camera`, `expo-location`, `react-native-maps`
> - Persistance : `expo-sqlite` / `AsyncStorage`

---

## 1) Périmètre MVP

- Authentification livreur (login/session)
- Tableau de bord avec liste des colis et vue carte
- Scan intelligent de codes-barres (vérification d'ID)
- Preuve de livraison géo-certifiée (position GPS + timestamp)
- Gestion d'incidents (photo + commentaire + type d'incident)
- Persistance locale pour résilience hors-ligne
- Mock API via JSON-Server (Docker)

---

## 2) Stack Technologique

| Couche | Technologie | Version |
|--------|-------------|---------|
| Framework | React Native (Expo) | Expo SDK 51+ |
| Langage | TypeScript | Strict mode |
| Navigation | Expo Router | v3+ |
| Style | NativeWind ou StyleSheet | — |
| Camera | `expo-camera` | — |
| Localisation | `expo-location` | — |
| Cartes | `react-native-maps` | — |
| API Mock | JSON-Server | Docker |
| Stockage local | `expo-sqlite` ou `AsyncStorage` | — |
| CI/CD | GitHub Actions | — |
| Conteneurisation | Docker + docker-compose | — |

---

## 3) Architecture du Projet

```
track-go/
├── app/                          # Expo Router (file-based routing)
│   ├── (auth)/
│   │   ├── _layout.tsx           # Auth layout (no tabs)
│   │   ├── login.tsx             # Écran de connexion
│   │   └── index.tsx             # Redirect to login
│   ├── (tabs)/
│   │   ├── _layout.tsx           # Tab navigator layout
│   │   ├── tournee/
│   │   │   ├── _layout.tsx       # Stack layout for tournée
│   │   │   ├── index.tsx         # Liste des colis (FlatList)
│   │   │   └── [id].tsx          # Détail d'un colis
│   │   ├── carte.tsx             # Vue carte interactive
│   │   ├── scan.tsx              # Scanner de codes-barres
│   │   └── profil.tsx            # Profil livreur
│   ├── incident/
│   │   └── [colisId].tsx         # Formulaire d'incident
│   ├── _layout.tsx               # Root layout
│   └── index.tsx                 # Entry point (redirect)
├── components/
│   ├── ui/                       # Button, Card, Badge, Input, Modal, Spinner
│   ├── colis/                    # ColisCard, ColisStatusBadge, ColisList
│   ├── carte/                    # MapView, MarkerColis, ItineraireOverlay
│   ├── scan/                     # ScanOverlay, ScanResult
│   └── incident/                 # IncidentForm, PhotoCapture
├── services/
│   ├── api.ts                    # Configuration axios/fetch centralisée
│   ├── colis.service.ts          # CRUD colis, changements de statut
│   ├── auth.service.ts           # Authentification
│   ├── location.service.ts       # GPS tracking
│   └── storage.service.ts        # Persistance locale
├── hooks/
│   ├── useAuth.ts                # Gestion session
│   ├── useColis.ts               # Liste et statut des colis
│   ├── useLocation.ts            # Position GPS temps réel
│   ├── useScanner.ts             # Logique de scan
│   └── useIncident.ts            # Gestion incidents
├── constants/
│   ├── colors.ts                 # Palette de couleurs
│   ├── layout.ts                 # Espacements, tailles
│   ├── api.ts                    # URL de base, endpoints
│   └── status.ts                 # Enums de statut colis
├── types/
│   └── index.ts                  # Interfaces TypeScript
├── assets/                       # Images, fonts, icônes
├── mock-api/
│   ├── db.json                   # Données de mock
│   ├── Dockerfile                # Image JSON-Server
│   └── docker-compose.yml        # Orchestration
├── .github/
│   └── workflows/
│       └── ci.yml                # Pipeline CI/CD
├── app.json                      # Configuration Expo
├── tsconfig.json                 # Configuration TypeScript
├── package.json
├── .env.example
└── README.md
```

---

## 4) Modèle de Données (Domain Model)

### 4.1. Interfaces TypeScript

```typescript
// types/index.ts

export enum ColisStatus {
  EN_ATTENTE = 'EN_ATTENTE',
  EN_COURS = 'EN_COURS',
  LIVRE = 'LIVRE',
  ECHEC = 'ECHEC',
  INCIDENT = 'INCIDENT',
}

export enum IncidentType {
  DESTINATAIRE_ABSENT = 'DESTINATAIRE_ABSENT',
  COLIS_ENDOMMAGE = 'COLIS_ENDOMMAGE',
  ADRESSE_INTROUVABLE = 'ADRESSE_INTROUVABLE',
  REFUSE_PAR_CLIENT = 'REFUSE_PAR_CLIENT',
  AUTRE = 'AUTRE',
}

export interface Position {
  latitude: number;
  longitude: number;
  timestamp: string;     // ISO 8601
  accuracy?: number;     // metres
}

export interface Livreur {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  vehicule: string;
  zone: string;
  avatar?: string;
}

export interface Colis {
  id: string;
  barcode: string;           // Code-barres unique
  destinataire: {
    nom: string;
    prenom: string;
    telephone: string;
    adresse: string;
    ville: string;
    codePostal: string;
    coordonnees: {
      latitude: number;
      longitude: number;
    };
  };
  poids: number;             // kg
  dimensions: string;        // ex: "30x20x15"
  description: string;
  status: ColisStatus;
  ordre: number;             // Ordre dans la tournée
  creneauLivraison: {
    debut: string;           // ISO 8601
    fin: string;
  };
  tourneeId: string;
  livreurId: string;
}

export interface Tournee {
  id: string;
  date: string;              // ISO 8601 date
  livreurId: string;
  zone: string;
  colis: Colis[];
  totalColis: number;
  colisLivres: number;
  colisEchec: number;
  colisEnCours: number;
  startTime?: string;
  endTime?: string;
}

export interface ProofOfDelivery {
  id: string;
  colisId: string;
  livreurId: string;
  timestamp: string;         // ISO 8601
  position: Position;
  scannedBarcode: string;
  barcodeMatch: boolean;     // true si scan == colis.barcode
  photoUri?: string;
  signatureUri?: string;     // Bonus
}

export interface Incident {
  id: string;
  colisId: string;
  livreurId: string;
  type: IncidentType;
  description: string;
  photoUri?: string;
  position: Position;
  timestamp: string;         // ISO 8601
  resolved: boolean;
}
```

### 4.2. Règles Métier

| Règle | Description |
|-------|-------------|
| **Validation de scan** | Le code-barres scanné doit correspondre au `barcode` du colis sélectionné |
| **Transition de statut** | `EN_ATTENTE` → `EN_COURS` → `LIVRE` ou `ECHEC` ou `INCIDENT` |
| **Preuve obligatoire** | Un colis ne peut passer à `LIVRE` sans position GPS enregistrée |
| **Incident documenté** | Chaque incident requiert un type + description ; la photo est recommandée |
| **Persistance double** | Tout changement → mise à jour API **ET** stockage local |
| **Position GPS** | Précision requise : < 50 mètres pour validation de livraison |

---

## 5) API Mock (JSON-Server)

### 5.1. Endpoints

| Méthode | Route | Description |
|---------|-------|-------------|
| `POST` | `/auth/login` | Authentification livreur |
| `GET` | `/livreurs/:id` | Profil du livreur |
| `GET` | `/tournees?livreurId=:id&date=:date` | Tournée du jour |
| `GET` | `/colis?tourneeId=:id` | Liste des colis d'une tournée |
| `GET` | `/colis/:id` | Détail d'un colis |
| `PATCH` | `/colis/:id` | Mise à jour statut du colis |
| `POST` | `/proofs` | Enregistrer une preuve de livraison |
| `POST` | `/incidents` | Enregistrer un incident |
| `GET` | `/incidents?colisId=:id` | Incidents liés à un colis |

### 5.2. Fichier `db.json` (structure)

```json
{
  "livreurs": [
    {
      "id": "liv-001",
      "nom": "Dupont",
      "prenom": "Jean",
      "email": "jean.dupont@trackgo.com",
      "password": "password123",
      "telephone": "+33612345678",
      "vehicule": "Renault Kangoo",
      "zone": "Paris 11e"
    }
  ],
  "tournees": [
    {
      "id": "tour-001",
      "date": "2026-02-23",
      "livreurId": "liv-001",
      "zone": "Paris 11e",
      "totalColis": 15,
      "colisLivres": 0,
      "colisEchec": 0,
      "colisEnCours": 0,
      "startTime": null,
      "endTime": null
    }
  ],
  "colis": [
    {
      "id": "col-001",
      "barcode": "TG-2026-001-A7B3",
      "destinataire": {
        "nom": "Martin",
        "prenom": "Sophie",
        "telephone": "+33698765432",
        "adresse": "12 Rue de la Roquette",
        "ville": "Paris",
        "codePostal": "75011",
        "coordonnees": {
          "latitude": 48.8534,
          "longitude": 2.3741
        }
      },
      "poids": 2.5,
      "dimensions": "30x20x15",
      "description": "Livres et accessoires",
      "status": "EN_ATTENTE",
      "ordre": 1,
      "creneauLivraison": {
        "debut": "2026-02-23T09:00:00Z",
        "fin": "2026-02-23T12:00:00Z"
      },
      "tourneeId": "tour-001",
      "livreurId": "liv-001"
    }
  ],
  "proofs": [],
  "incidents": []
}
```

---

## 6) Architecture de Navigation

### Flux de navigation (Expo Router)

```
Root Layout (_layout.tsx)
│
├── (auth)/                     ← Écrans non authentifiés
│   ├── login.tsx
│   └── _layout.tsx             ← Stack simple, pas de tabs
│
└── (tabs)/                     ← Écrans authentifiés
    ├── _layout.tsx             ← Tab Navigator (4 onglets)
    │
    ├── [Tab 1] tournee/        ← Stack Navigator
    │   ├── index.tsx           ← FlatList des colis
    │   └── [id].tsx            ← Détail colis
    │
    ├── [Tab 2] carte.tsx       ← Vue carte MapView
    │
    ├── [Tab 3] scan.tsx        ← Scanner caméra
    │
    └── [Tab 4] profil.tsx      ← Profil livreur
```

### Transitions d'état de navigation

1. **App Launch** → Vérifier token → `(auth)/login` ou `(tabs)/tournee`
2. **Login Success** → Redirect → `(tabs)/tournee`
3. **Tap colis** → Push → `tournee/[id]` (détail)
4. **Scan colis** → Vérification → Modal résultat ou alerte erreur
5. **Incident** → Push → `incident/[colisId]` (formulaire)
6. **Logout** → Reset → `(auth)/login`

---

## 7) Intégration Hardware

### 7.1. Scanner de Codes-Barres (`expo-camera`)

```typescript
// Configuration requise
import { CameraView, useCameraPermissions } from 'expo-camera';

// Fonctionnalités :
// - Scan codes-barres 1D (Code128, EAN13) et 2D (QR Code, DataMatrix)
// - Gestion faible luminosité (torch/flash)
// - Overlay visuel avec zone de scan guidée
// - Vibration + son sur scan réussi
// - Vérification automatique : barcode scanné vs barcode attendu

// Workflow scan :
// 1. Ouvrir caméra avec overlay
// 2. Détecter code-barres (onBarcodeScanned)
// 3. Vérifier correspondance avec le colis sélectionné
// 4. Si match → confirmer + vibrer + enregistrer proof
// 5. Si mismatch → alerter l'utilisateur avec le bon code attendu
```

### 7.2. Géolocalisation (`expo-location`)

```typescript
// Configuration requise
import * as Location from 'expo-location';

// Fonctionnalités :
// - Permission foreground + background
// - Capture position au moment de la validation
// - Précision : HIGH_ACCURACY
// - Monitoring continu (background) pour tracking itinéraire

// Workflow GPS :
// 1. Demander permissions au lancement
// 2. Lors de validation colis → capturer position courante
// 3. Vérifier précision (< 50m requis)
// 4. Enregistrer dans ProofOfDelivery
// 5. (Bonus) Tracking continu pour notifications de proximité
```

### 7.3. Cartes Interactives (`react-native-maps`)

```typescript
// Configuration requise
import MapView, { Marker, Polyline } from 'react-native-maps';

// Fonctionnalités :
// - Afficher tous les points de livraison sur la carte
// - Marqueurs colorés selon statut (vert=livré, orange=en cours, rouge=incident)
// - Position du livreur en temps réel
// - Tap sur marqueur → détail du colis
// - (Bonus) Polyline pour l'itinéraire optimal
```

### 7.4. Capture Photo (`expo-camera` / `expo-image-picker`)

```typescript
// Utilisée pour :
// - Photo de preuve de livraison
// - Photo d'incident (colis endommagé, etc.)
// - Stockage local de l'URI de la photo
```

---

## 8) Gestion d'État (3 Niveaux)

### Niveau 1 : API (Source de vérité)

```typescript
// services/api.ts
const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

export const apiClient = {
  get: <T>(endpoint: string): Promise<T> => { /* ... */ },
  post: <T>(endpoint: string, data: unknown): Promise<T> => { /* ... */ },
  patch: <T>(endpoint: string, data: unknown): Promise<T> => { /* ... */ },
};
```

### Niveau 2 : État Application (`useState` / `useReducer`)

```typescript
// Tournée state : géré via un reducer
type TourneeAction =
  | { type: 'LOAD_TOURNEE'; payload: Tournee }
  | { type: 'UPDATE_COLIS_STATUS'; payload: { colisId: string; status: ColisStatus } }
  | { type: 'FILTER_COLIS'; payload: ColisStatus | 'ALL' }
  | { type: 'SORT_COLIS'; payload: 'ordre' | 'status' | 'creneauLivraison' };
```

### Niveau 3 : Persistance Locale

```typescript
// services/storage.service.ts
// expo-sqlite pour données structurées OU AsyncStorage pour clé/valeur

export const StorageService = {
  saveTournee: (tournee: Tournee) => Promise<void>,
  loadTournee: (tourneeId: string) => Promise<Tournee | null>,
  updateColisStatus: (colisId: string, status: ColisStatus) => Promise<void>,
  saveProof: (proof: ProofOfDelivery) => Promise<void>,
  saveIncident: (incident: Incident) => Promise<void>,
  getPendingSyncs: () => Promise<PendingSync[]>,  // Items not yet synced to API
};
```

---

## 9) Optimisation des Performances

### FlatList

```typescript
// Optimisations obligatoires pour la liste des colis :
<FlatList
  data={colis}
  renderItem={renderColis}          // Memoized avec React.memo
  keyExtractor={(item) => item.id}
  getItemLayout={(data, index) => ({
    length: ITEM_HEIGHT,
    offset: ITEM_HEIGHT * index,
    index,
  })}
  initialNumToRender={10}
  maxToRenderPerBatch={5}
  windowSize={5}
  removeClippedSubviews={true}
/>
```

### Mémorisation

```typescript
// Utiliser React.memo pour les composants de liste
const ColisCard = React.memo(({ colis, onPress }: ColisCardProps) => {
  // ...
});

// useMemo pour les filtrages/tris coûteux
const filteredColis = useMemo(() =>
  colis.filter(c => filter === 'ALL' || c.status === filter),
  [colis, filter]
);

// useCallback pour les handlers
const handlePress = useCallback((id: string) => {
  router.push(`/tournee/${id}`);
}, []);
```

---

## 10) Style & Design System

### Palette de Couleurs

```typescript
// constants/colors.ts
export const Colors = {
  primary: '#2563EB',        // Bleu principal
  primaryDark: '#1D4ED8',
  secondary: '#7C3AED',     // Violet
  success: '#22C55E',        // Vert — Livré
  warning: '#F59E0B',        // Orange — En cours
  danger: '#EF4444',         // Rouge — Incident/Échec
  neutral: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    500: '#64748B',
    700: '#334155',
    900: '#0F172A',
  },
  background: '#FFFFFF',
  backgroundDark: '#0F172A', // Dark mode
};
```

### Typographie

```typescript
// constants/layout.ts
export const Typography = {
  h1: { fontSize: 28, fontWeight: '700' as const, lineHeight: 34 },
  h2: { fontSize: 22, fontWeight: '600' as const, lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600' as const, lineHeight: 24 },
  body: { fontSize: 16, fontWeight: '400' as const, lineHeight: 22 },
  caption: { fontSize: 12, fontWeight: '400' as const, lineHeight: 16 },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};
```

---

## 11) CI/CD (GitHub Actions)

### Pipeline Obligatoire

```yaml
# .github/workflows/ci.yml
name: Track&Go CI

on:
  pull_request:
    branches: [main, develop]

jobs:
  quality-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Lint
        run: npx eslint . --ext .ts,.tsx

      - name: Type Check
        run: npx tsc --noEmit

      # Bonus: Build
      - name: Build
        run: npx expo export --platform web
```

---

## 12) Docker (Mock API)

### Dockerfile

```dockerfile
# mock-api/Dockerfile
FROM node:18-alpine
WORKDIR /app
RUN npm install -g json-server
COPY db.json /app/db.json
EXPOSE 3000
CMD ["json-server", "--watch", "db.json", "--host", "0.0.0.0", "--port", "3000"]
```

### Docker Compose

```yaml
# mock-api/docker-compose.yml
version: '3.8'

services:
  mock-api:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - ./db.json:/app/db.json
    restart: unless-stopped
```

---

## 13) Sécurité — Checklist

- [ ] Validation des entrées (formulaires, scan)
- [ ] Gestion sécurisée du token de session (SecureStore ou équivalent)
- [ ] Permissions hardware demandées au bon moment (caméra, localisation)
- [ ] Pas de données sensibles en clair dans le code
- [ ] `.env.example` fourni, secrets non committés
- [ ] Sanitisation des données utilisateur avant envoi API
- [ ] Gestion des erreurs réseau (timeout, retry)
- [ ] Protection contre les actions doubles (debounce boutons de validation)
