# Prompt 04 — Data & State Management

---

## Prompt 4.1 — API Service Layer

```
Create the centralized API service for Track&Go:

1. services/api.ts:

   const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';

   - Create a wrapper around fetch (or install axios):
     - GET, POST, PATCH, DELETE methods
     - Automatic JSON serialization/deserialization
     - Error handling: network errors, HTTP errors
     - Timeout: 10 seconds
     - Logging in dev mode

   export const apiClient = {
     get: async <T>(endpoint: string): Promise<T>,
     post: async <T>(endpoint: string, data: unknown): Promise<T>,
     patch: async <T>(endpoint: string, data: unknown): Promise<T>,
   };

2. services/auth.service.ts:

   login(email, password):
     - POST /livreurs?email=X&password=Y (JSON-Server filter)
     - If match found: return livreur object
     - If not: throw 'Identifiants invalides'
     - Note: JSON-Server doesn't have real auth, simulate with query

   getProfile(livreurId):
     - GET /livreurs/{id}

   isAuthenticated():
     - Check if token/livreurId exists in AsyncStorage

3. services/colis.service.ts:

   getTournee(livreurId, date):
     - GET /tournees?livreurId=X&date=Y
     - Returns Tournee with nested colis

   getColisByTournee(tourneeId):
     - GET /colis?tourneeId=X&_sort=ordre

   getColis(colisId):
     - GET /colis/{id}

   updateColisStatus(colisId, status):
     - PATCH /colis/{id} { status }

   createProof(proof: ProofOfDelivery):
     - POST /proofs

   createIncident(incident: Incident):
     - POST /incidents
     - Then PATCH /colis/{colisId} { status: 'INCIDENT' }

4. Error handling pattern:
   - Wrap all API calls in try/catch
   - Return typed results: { data, error }
   - Network errors → user-friendly messages in French
```

---

## Prompt 4.2 — State Management

```
Implement state management for Track&Go:

1. Context: AuthContext (hooks/useAuth.ts or context/AuthContext.tsx)

   State: { livreur: Livreur | null, isAuthenticated: boolean, isLoading: boolean }
   Methods: login(email, password), logout(), checkAuth()

   Provider wraps the entire app in _layout.tsx
   On mount: check AsyncStorage for saved livreurId → hydrate state

2. Tournée State: useColis hook (hooks/useColis.ts)

   Use useReducer for complex state:

   State: {
     tournee: Tournee | null,
     colis: Colis[],
     filteredColis: Colis[],
     filter: ColisStatus | 'ALL',
     isLoading: boolean,
     error: string | null,
   }

   Actions:
   - LOAD_TOURNEE: set tournee + colis
   - UPDATE_STATUS: update a single colis status
   - SET_FILTER: filter colis by status
   - SET_LOADING / SET_ERROR

   Methods:
   - loadTournee(livreurId, date)
   - updateColisStatus(colisId, newStatus)
   - filterByStatus(status)
   - refreshTournee() → pull-to-refresh
   - getStats() → computed { total, livres, enCours, echecs, incidents }

3. Computed values (useMemo):
   - filteredColis: filter colis array by selected status
   - stats: count by status
   - progressPercentage: colisLivres / totalColis * 100
```

---

## Prompt 4.3 — Local Persistence

```
Implement local storage for Track&Go:

1. Install:
   npx expo install @react-native-async-storage/async-storage
   # OR for structured data:
   npx expo install expo-sqlite

2. services/storage.service.ts:

   Using AsyncStorage (simpler for MVP):

   const KEYS = {
     AUTH_TOKEN: '@trackgo/auth_token',
     LIVREUR_ID: '@trackgo/livreur_id',
     TOURNEE: '@trackgo/tournee',
     PENDING_SYNCS: '@trackgo/pending_syncs',
   };

   // Auth
   saveAuthData(livreurId: string): Promise<void>
   getAuthData(): Promise<string | null>
   clearAuthData(): Promise<void>

   // Tournée
   saveTournee(tournee: Tournee): Promise<void>
   loadTournee(): Promise<Tournee | null>

   // Colis status changes
   saveColisUpdate(colisId: string, status: ColisStatus): Promise<void>
   // Updates the locally saved tournee's colis status

   // Pending syncs (offline support)
   addPendingSync(action: PendingSync): Promise<void>
   getPendingSyncs(): Promise<PendingSync[]>
   clearPendingSync(id: string): Promise<void>

   interface PendingSync {
     id: string;
     type: 'STATUS_UPDATE' | 'PROOF' | 'INCIDENT';
     data: unknown;
     timestamp: string;
     retryCount: number;
   }

3. Sync strategy:
   - On every status change: update API AND local storage
   - If API call fails: save to pending syncs queue
   - On app resume / pull-to-refresh: retry pending syncs
   - Show sync indicator if there are pending items
```

---

## Prompt 4.4 — Delivery Validation Flow

```
Implement the complete delivery validation flow:

1. When livreur taps "Scanner pour livrer" on colis detail:
   a. Open scanner with target barcode pre-set
   b. On scan: compare with colis.barcode

2. If barcode matches:
   a. Get current GPS position
   b. Validate accuracy (< 50m)
   c. Create ProofOfDelivery object:
      {
        colisId, livreurId, timestamp: new Date().toISOString(),
        position, scannedBarcode, barcodeMatch: true
      }
   d. POST /proofs → API
   e. PATCH /colis/{id} → { status: 'LIVRE' }
   f. Save locally (AsyncStorage)
   g. Show success animation/alert
   h. Navigate back to list (auto-refresh)

3. If barcode doesn't match:
   a. Show error: "Code incorrect"
   b. Display expected barcode
   c. Option to rescan

4. If GPS inaccurate:
   a. Show warning: "Signal GPS faible"
   b. Retry button
   c. After 3 retries: allow validation with warning flag

5. Error handling:
   - Network failure: save to pending syncs
   - Camera failure: show fallback manual input
   - All errors: user-friendly French messages
```
