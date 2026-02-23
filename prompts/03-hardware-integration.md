# Prompt 03 — Hardware Integration

---

## Prompt 3.1 — Barcode Scanner (expo-camera)

```
Implement the barcode scanner for Track&Go:

1. Install dependencies:
   npx expo install expo-camera expo-haptics

2. Create the Scanner screen (app/(tabs)/scan.tsx):

   - Request camera permission on mount
   - If denied: show permission denied message with button to open settings

   - Scanner UI:
     - Full screen camera view
     - Semi-transparent overlay with clear scan zone (rectangle)
     - Animated scanning line
     - "Placez le code-barres dans le cadre" instruction text
     - Flash/Torch toggle button (top right)
     - Close button (top left)

3. Scanning logic (hooks/useScanner.ts):
   - Use CameraView with barCodeScannerSettings
   - Supported formats: ['code128', 'ean13', 'qr', 'datamatrix']
   - onBarcodeScanned callback:
     a. Debounce scans (prevent duplicate reads, 2s cooldown)
     b. Trigger haptic feedback (expo-haptics)
     c. Look up scanned barcode in current tournee colis list
     d. If found: navigate to tournee/[id] with scan result
     e. If not found: show "Code non reconnu" alert

4. Scan from Colis Detail:
   - When scanning from a specific colis detail page:
     - Compare scanned barcode with expected colis.barcode
     - If match: proceed to validation (GPS capture)
     - If mismatch: show alert "Code incorrect. Attendu: {expected}"

5. Create ScanOverlay component (components/scan/ScanOverlay.tsx):
   - Animated border corners
   - Scan zone proportional to screen
   - Status text below scan zone
```

---

## Prompt 3.2 — GPS & Location (expo-location)

```
Implement GPS tracking for Track&Go:

1. Install:
   npx expo install expo-location

2. Create Location Service (services/location.service.ts):

   requestPermissions():
     - Request foreground permission first
     - If granted, optionally request background permission
     - Return permission status

   getCurrentPosition():
     - Use Location.getCurrentPositionAsync({
         accuracy: Location.Accuracy.High,
         timeInterval: 5000,
       })
     - Return Position { latitude, longitude, timestamp, accuracy }

   isPositionAccurate(position: Position, threshold = 50):
     - Return position.accuracy <= threshold

   startWatching(callback):
     - Use Location.watchPositionAsync for continuous tracking
     - Return subscription for cleanup

3. Create useLocation hook (hooks/useLocation.ts):
   - State: position, isLoading, error, permissionGranted
   - On mount: request permissions
   - Methods: getCurrentPosition(), startTracking(), stopTracking()
   - Cleanup: remove watcher on unmount

4. Integration with delivery validation:
   - When livreur validates a delivery:
     a. Get current position
     b. Check accuracy < 50 meters
     c. If accurate: create ProofOfDelivery with position
     d. If not accurate: show warning "Signal GPS faible, veuillez patienter"
     e. Retry mechanism (max 3 attempts with increasing timeout)
```

---

## Prompt 3.3 — Maps Integration (react-native-maps)

```
Implement the interactive map for Track&Go:

1. Install:
   npx expo install react-native-maps

2. Create Carte screen (app/(tabs)/carte.tsx):

   - MapView centered on the delivery zone (use first colis coordinates)
   - Initial region: fit all colis markers + driver position

   - Markers for each colis:
     - Custom marker component with color based on status:
       - EN_ATTENTE: gray (#94A3B8)
       - EN_COURS: orange (#F59E0B)
       - LIVRE: green (#22C55E)
       - ECHEC/INCIDENT: red (#EF4444)
     - Show order number on marker
     - Callout on tap: colis summary (destinataire, status)
     - Tap callout → navigate to tournee/[id]

   - Driver position marker:
     - Blue dot with pulsating effect
     - Update in real-time using useLocation hook

   - Map Controls:
     - "Center on me" button (bottom right)
     - Toggle satellite/standard view (top right)

3. Create MapMarker component (components/carte/MapMarker.tsx):
   - Custom marker view with status color
   - Order number overlay
   - React.memo for performance

4. Optional Bonus: Polyline for route
   - Draw lines connecting delivery points in order
   - Color: primary blue, dashed
```

---

## Prompt 3.4 — Photo Capture

```
Implement photo capture for Track&Go:

1. Use expo-camera or expo-image-picker for photo capture:
   npx expo install expo-image-picker

2. Create PhotoCapture component (components/incident/PhotoCapture.tsx):

   - "Prendre une photo" button
   - On press:
     a. Request camera permission
     b. Launch camera (ImagePicker.launchCameraAsync)
     c. Options: quality 0.7, base64 false, allowsEditing false
     d. Return URI of captured photo

   - After capture:
     - Show thumbnail preview
     - "Retake" button
     - "Confirm" button

3. Usage contexts:
   - Proof of delivery: optional photo after scan validation
   - Incident report: photo of damaged package / empty doorstep
   - Store photo URI locally (don't upload to API in MVP)

4. Photo handling:
   - Save URI to the ProofOfDelivery or Incident object
   - Display in detail views using Image component
   - Handle orientation correctly (exif data)
```
