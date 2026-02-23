# Prompt 02 — Navigation & UI Screens

---

## Prompt 2.1 — Expo Router Configuration

```
Configure Expo Router for Track&Go with a hybrid navigation architecture:

1. Root Layout (app/_layout.tsx):
   - Check for existing auth token in AsyncStorage
   - If authenticated → redirect to (tabs)
   - If not → redirect to (auth)
   - Wrap with necessary providers (SafeAreaProvider, etc.)

2. Auth Layout (app/(auth)/_layout.tsx):
   - Simple Stack navigator
   - No tabs visible
   - Screens: login
   - Header hidden

3. Tab Layout (app/(tabs)/_layout.tsx):
   - Bottom Tab Navigator with 4 tabs:
     - "Tournée" (icon: list / package)
     - "Carte" (icon: map)
     - "Scanner" (icon: scan / camera)
     - "Profil" (icon: user)
   - Active tab color: primary blue
   - Tab bar style: elevated with shadow

4. Tournée Stack Layout (app/(tabs)/tournee/_layout.tsx):
   - Stack navigator within the Tournée tab
   - Screens: index (list), [id] (detail)
   - Header with title "Ma Tournée"

5. Navigation flow:
   Login → (tabs)/tournee/index
   Tap colis → tournee/[id]
   Tap "Signaler incident" → incident/[colisId] (modal)
   Logout → (auth)/login
```

---

## Prompt 2.2 — Login Screen

```
Create the Login screen (app/(auth)/login.tsx):

1. Design:
   - Logo Track&Go at top (use Text styled as logo or SVG)
   - "Connexion Livreur" title
   - Email input field with icon
   - Password input field with icon + toggle visibility
   - "Se connecter" button (full width, primary color)
   - Loading spinner on submit
   - Error message display (red alert)
   - SafeAreaView wrapping

2. Validation:
   - Email: required, valid format
   - Password: required, min 6 chars
   - Use simple state-based validation (no external lib needed for MVP)

3. Logic:
   - On submit: call auth.service.login(email, password)
   - On success: save token to AsyncStorage, redirect to (tabs)
   - On error: display error message
   - Disable button while loading

4. Style:
   - Use design tokens from constants/colors.ts and constants/layout.ts
   - Centered layout with KeyboardAvoidingView
   - Platform-specific padding (iOS vs Android)
```

---

## Prompt 2.3 — Tournée List Screen (FlatList)

```
Create the Tournée list screen (app/(tabs)/tournee/index.tsx):

1. Header Section:
   - Dashboard summary bar at top:
     - Total colis count
     - Livrés (green badge)
     - En cours (orange badge)
     - Incidents (red badge)
   - Progress bar showing completion percentage
   - Pull-to-refresh enabled

2. Filter Tabs:
   - Horizontal scrollable filter: "Tous", "En attente", "En cours", "Livré", "Incident"
   - Active filter highlighted with primary color

3. FlatList Implementation:
   <FlatList
     data={filteredColis}
     renderItem={renderColis}
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
     refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
     ListEmptyComponent={<EmptyState />}
   />

4. Each item renders a <ColisCard /> component

5. Performance:
   - Memoize ColisCard with React.memo
   - useMemo for filtered list
   - useCallback for onPress handler
```

---

## Prompt 2.4 — ColisCard Component

```
Create the ColisCard component (components/colis/ColisCard.tsx):

Props: { colis: Colis; onPress: (id: string) => void }

Layout:
┌─────────────────────────────────────┐
│ [Status Badge]         [#ordre]     │
│                                      │
│ 📦 Destinataire: Nom Prénom          │
│ 📍 12 Rue de la Roquette, 75011     │
│ ⏰ 09:00 - 12:00                    │
│ ⚖️ 2.5 kg                           │
│                                      │
│ [───────── Progress indicator ─────] │
└─────────────────────────────────────┘

Status Badge colors:
- EN_ATTENTE → gray, "En attente"
- EN_COURS → orange, "En cours"
- LIVRE → green, "Livré"
- ECHEC → red, "Échec"
- INCIDENT → red, "Incident"

Features:
- TouchableOpacity wrapping for press handling
- Shadow/elevation for card effect
- Subtle left border color matching status
- React.memo wrapped for performance
```

---

## Prompt 2.5 — Colis Detail Screen

```
Create the Colis Detail screen (app/(tabs)/tournee/[id].tsx):

1. Get colisId from route params: useLocalSearchParams()

2. Layout:
   - ScrollView with sections:

   Section 1: Header
   - Status badge (large)
   - Barcode display
   - Order number

   Section 2: Destinataire
   - Nom Prénom
   - Adresse complète
   - Téléphone (pressable → call)
   - Mini map preview (static if react-native-maps not yet setup)

   Section 3: Détails colis
   - Poids
   - Dimensions
   - Description
   - Créneau de livraison (avec indicateur si dans le créneau)

   Section 4: Actions (bottom)
   - Button "Scanner pour livrer" (primary, full width)
     → Opens scanner with this colis pre-selected
   - Button "Signaler un incident" (outline, danger color)
     → Navigates to incident/[colisId]
   - Buttons disabled if status is LIVRE

3. Fetch colis from useColis hook or route params
```

---

## Prompt 2.6 — Dashboard & Profile

```
Create the Dashboard component and Profile screen:

1. Dashboard (integrated into tournee/index.tsx header or separate component):
   - Greeting: "Bonjour, {livreur.prenom} 👋"
   - Date du jour
   - Stats Cards row:
     - Total: {totalColis}
     - Livrés: {colisLivres} ✅
     - En cours: {colisEnCours} 🔄
     - Incidents: {incidents} ⚠️
   - Circular progress or progress bar: {colisLivres / totalColis * 100}%
   - Zone: {tournee.zone}

2. Profile Screen (app/(tabs)/profil.tsx):
   - Avatar placeholder (first letter of name)
   - Nom Prénom
   - Email
   - Téléphone
   - Véhicule
   - Zone assignée
   - Button "Se déconnecter" (danger)
     → Clear AsyncStorage, redirect to (auth)/login
   - App version at bottom
```
