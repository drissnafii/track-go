# Prompt 01 — Setup Environnement Track&Go

---

## Prompt 1.1 — Initialisation Projet Expo

```
Create a new Expo project for Track&Go with TypeScript:

npx -y create-expo-app@latest ./ --template blank-typescript

The project should be initialized in the current directory.

After initialization, install the following core dependencies:

npx expo install expo-router expo-constants expo-linking expo-status-bar
npx expo install react-native-safe-area-context react-native-screens
npx expo install react-native-gesture-handler react-native-reanimated

Configure app.json:
  - name: "Track&Go"
  - slug: "track-go"
  - scheme: "track-go" (for deep linking)
  - plugins: ["expo-router"]
  - web.output: "single" (for Expo Router)

Configure tsconfig.json with strict mode:
  {
    "compilerOptions": {
      "strict": true,
      "baseUrl": ".",
      "paths": {
        "@/*": ["./*"]
      }
    },
    "extends": "expo/tsconfig.base"
  }

Create .env.example:
  EXPO_PUBLIC_API_URL=http://localhost:3000
```

---

## Prompt 1.2 — Architecture Dossiers

```
Create the following folder structure for Track&Go:

app/
├── (auth)/
│   ├── _layout.tsx         # Stack layout for auth screens
│   ├── login.tsx           # Login screen
│   └── index.tsx           # Redirect to login
├── (tabs)/
│   ├── _layout.tsx         # Tab navigator (4 tabs: Tournée, Carte, Scan, Profil)
│   ├── tournee/
│   │   ├── _layout.tsx     # Stack layout for tournee
│   │   ├── index.tsx       # FlatList des colis
│   │   └── [id].tsx        # Détail d'un colis
│   ├── carte.tsx           # Vue carte MapView
│   ├── scan.tsx            # Scanner codes-barres
│   └── profil.tsx          # Profil livreur
├── incident/
│   └── [colisId].tsx       # Formulaire incident
├── _layout.tsx             # Root layout (auth check)
└── index.tsx               # Entry redirect

components/
├── ui/                     # Button, Card, Badge, Input, Modal, Spinner
├── colis/                  # ColisCard, ColisStatusBadge, ColisList
├── carte/                  # MapMarker, ItineraireOverlay
├── scan/                   # ScanOverlay, ScanResult
└── incident/               # IncidentForm, PhotoCapture

services/
├── api.ts                  # Centralized fetch/axios configuration
├── colis.service.ts        # Colis CRUD + status changes
├── auth.service.ts         # Login, logout, session check
├── location.service.ts     # GPS tracking
└── storage.service.ts      # AsyncStorage/SQLite persistence

hooks/
├── useAuth.ts              # Session management
├── useColis.ts             # Colis list and status
├── useLocation.ts          # Real-time GPS
├── useScanner.ts           # Scan logic
└── useIncident.ts          # Incident management

constants/
├── colors.ts               # Color palette
├── layout.ts               # Spacing, typography
├── api.ts                  # Base URL, endpoints
└── status.ts               # ColisStatus, IncidentType enums

types/
└── index.ts                # All TypeScript interfaces

Create each file with a basic export placeholder so the structure is navigable.
```

---

## Prompt 1.3 — Types TypeScript

```
In types/index.ts, define all TypeScript interfaces and enums for Track&Go:

Enums:
- ColisStatus: EN_ATTENTE, EN_COURS, LIVRE, ECHEC, INCIDENT
- IncidentType: DESTINATAIRE_ABSENT, COLIS_ENDOMMAGE, ADRESSE_INTROUVABLE, REFUSE_PAR_CLIENT, AUTRE

Interfaces:
- Position { latitude, longitude, timestamp, accuracy? }
- Coordonnees { latitude, longitude }
- Livreur { id, nom, prenom, email, telephone, vehicule, zone, avatar? }
- Destinataire { nom, prenom, telephone, adresse, ville, codePostal, coordonnees: Coordonnees }
- CreneauLivraison { debut: string, fin: string }
- Colis { id, barcode, destinataire, poids, dimensions, description, status: ColisStatus, ordre, creneauLivraison, tourneeId, livreurId }
- Tournee { id, date, livreurId, zone, colis: Colis[], totalColis, colisLivres, colisEchec, colisEnCours, startTime?, endTime? }
- ProofOfDelivery { id, colisId, livreurId, timestamp, position, scannedBarcode, barcodeMatch, photoUri?, signatureUri? }
- Incident { id, colisId, livreurId, type: IncidentType, description, photoUri?, position, timestamp, resolved }

All types should be exported. Use strict typing (no `any`).
```

---

## Prompt 1.4 — Docker Mock API

```
Create the mock API server for Track&Go:

1. Create mock-api/Dockerfile:
   FROM node:18-alpine
   WORKDIR /app
   RUN npm install -g json-server
   COPY db.json /app/db.json
   EXPOSE 3000
   CMD ["json-server", "--watch", "db.json", "--host", "0.0.0.0", "--port", "3000"]

2. Create mock-api/docker-compose.yml:
   version: '3.8'
   services:
     mock-api:
       build: .
       ports:
         - "3000:3000"
       volumes:
         - ./db.json:/app/db.json
       restart: unless-stopped

3. Create mock-api/db.json with realistic data:
   - 2 livreurs (with login credentials)
   - 2 tournées (one per livreur, today's date)
   - 15 colis per tournée with:
     - Unique barcodes (format: TG-YYYY-XXX-HASH)
     - Realistic Parisian addresses with GPS coordinates
     - Various statuses
     - Ordered delivery windows
   - Empty proofs and incidents arrays

4. Add to root .env.example:
   EXPO_PUBLIC_API_URL=http://localhost:3000

5. Add to root .dockerignore:
   node_modules
   .expo
   .git
```

---

## Prompt 1.5 — Constants & Design Tokens

```
Create design system constants for Track&Go:

1. constants/colors.ts:
   - primary: '#2563EB' (blue)
   - primaryDark: '#1D4ED8'
   - secondary: '#7C3AED' (purple)
   - success: '#22C55E' (green — delivered)
   - warning: '#F59E0B' (orange — in progress)
   - danger: '#EF4444' (red — incident)
   - neutral palette: 50 to 900
   - background light/dark

2. constants/layout.ts:
   - Typography: h1(28), h2(22), h3(18), body(16), caption(12)
   - Spacing: xs(4), sm(8), md(16), lg(24), xl(32)
   - BorderRadius: sm(8), md(12), lg(16), full(9999)
   - Shadow styles

3. constants/api.ts:
   - API_BASE_URL from env
   - Endpoint constants: ENDPOINTS.AUTH.LOGIN, ENDPOINTS.COLIS.LIST, etc.

4. constants/status.ts:
   - Status label maps (FR translations)
   - Status color maps (ColisStatus → color)
   - Status icon maps (ColisStatus → icon name)
```
