# Prompt 05 — DevOps (CI/CD, Docker, Testing)

---

## Prompt 5.1 — GitHub Actions CI/CD

```
Create the CI/CD pipeline for Track&Go:

1. Create .github/workflows/ci.yml:

name: Track&Go CI

on:
  pull_request:
    branches: [main, develop]
  push:
    branches: [main]

jobs:
  lint-and-typecheck:
    name: Lint & Type Check
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run ESLint
        run: npx eslint . --ext .ts,.tsx --max-warnings 0

      - name: TypeScript Type Check
        run: npx tsc --noEmit

  test:
    name: Run Tests
    runs-on: ubuntu-latest
    needs: lint-and-typecheck
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - name: Run Tests
        run: npm test -- --ci --coverage

  # Bonus: Build verification
  build:
    name: Build Check
    runs-on: ubuntu-latest
    needs: lint-and-typecheck
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - name: Export Web Build
        run: npx expo export --platform web

2. Add ESLint config if not present:
   npm i -D eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin

3. Branch protection rules (configure in GitHub settings):
   - Require lint-and-typecheck to pass before merge
   - Require PR review (optional)
```

---

## Prompt 5.2 — Docker Configuration

```
Set up Docker for the Track&Go mock API:

1. mock-api/Dockerfile:
   FROM node:18-alpine
   WORKDIR /app
   RUN npm install -g json-server@0.17.4
   COPY db.json /app/db.json
   COPY routes.json /app/routes.json
   EXPOSE 3000
   CMD ["json-server", "--watch", "db.json", "--routes", "routes.json", "--host", "0.0.0.0", "--port", "3000"]

2. mock-api/routes.json (custom routing):
   {
     "/auth/login": "/livreurs",
     "/api/*": "/$1"
   }

3. mock-api/docker-compose.yml:
   version: '3.8'
   services:
     mock-api:
       build: .
       container_name: trackgo-api
       ports:
         - "3000:3000"
       volumes:
         - ./db.json:/app/db.json
       restart: unless-stopped
       healthcheck:
         test: ["CMD", "wget", "-q", "--spider", "http://localhost:3000"]
         interval: 30s
         timeout: 10s
         retries: 3

4. Mock API verification:
   - docker-compose up -d
   - curl http://localhost:3000/colis → returns colis array
   - curl http://localhost:3000/tournees?livreurId=liv-001 → returns tournee

5. Root .dockerignore:
   node_modules
   .expo
   .git
   *.log
   dist
   android
   ios
```

---

## Prompt 5.3 — Testing Setup

```
Set up testing for Track&Go:

1. Install testing dependencies:
   npm i -D jest @testing-library/react-native @testing-library/jest-native
   npm i -D jest-expo @types/jest

2. Configure jest in package.json:
   "jest": {
     "preset": "jest-expo",
     "transformIgnorePatterns": [
       "node_modules/(?!((jest-)?react-native|@react-native(-community)?)|expo(nent)?|@expo(nent)?/.*|@expo-google-fonts/.*|react-navigation|@react-navigation/.*|@sentry/react-native|native-base|react-native-svg)"
     ],
     "setupFilesAfterSetup": ["@testing-library/jest-native/extend-expect"]
   }

3. Unit Tests:

   __tests__/hooks/useColis.test.ts:
   - Test reducer actions: LOAD_TOURNEE, UPDATE_STATUS, SET_FILTER
   - Test computed stats
   - Test filter logic

   __tests__/services/colis.service.test.ts:
   - Mock fetch responses
   - Test getTournee returns correct structure
   - Test updateColisStatus sends correct PATCH
   - Test error handling (network failure)

4. Component Tests:

   __tests__/components/ColisCard.test.tsx:
   - Renders colis info (destinataire, adresse, status)
   - Shows correct status badge color
   - Calls onPress with correct id

   __tests__/components/IncidentForm.test.tsx:
   - Renders form fields
   - Validates required fields (type, description)
   - Submit button disabled without required fields

5. Run tests:
   npm test
   npm test -- --coverage
```

---

## Prompt 5.4 — README & Final Polish

```
Create a comprehensive README.md for Track&Go:

# Track&Go 🚚

> Application mobile React Native de gestion du dernier kilomètre

## Description
Track&Go est une solution mobile pour les livreurs de transport express.
Elle permet de gérer les tournées, scanner les colis, capturer des preuves
de livraison géo-certifiées et signaler des incidents.

## Stack Technique
- React Native (Expo SDK)
- TypeScript
- Expo Router
- expo-camera / expo-location / react-native-maps
- JSON-Server (Mock API via Docker)
- GitHub Actions (CI/CD)

## Prérequis
- Node.js 18+
- npm 9+
- Docker & Docker Compose
- Expo CLI: npm i -g expo-cli
- Android Studio (émulateur) ou Expo Go (appareil physique)

## Installation

1. Cloner le projet:
   git clone https://github.com/[user]/track-go.git
   cd track-go

2. Installer les dépendances:
   npm install

3. Lancer le mock API:
   cd mock-api
   docker-compose up -d
   cd ..

4. Configurer l'environnement:
   cp .env.example .env
   # Modifier EXPO_PUBLIC_API_URL si nécessaire

5. Lancer l'application:
   npx expo start

## Architecture
[Include folder structure diagram]

## User Stories
- US1: Auth & Session
- US2: Tableau de Bord
- US3: Scan Intelligent
- US4: Preuve de Livraison GPS
- US5: Gestion d'Incidents

## Tests
npm test
npm test -- --coverage

## CI/CD
Pipeline GitHub Actions: Lint → Type Check → Tests → Build
Déclenché sur chaque Pull Request vers main/develop

## Docker
cd mock-api && docker-compose up -d

## Équipe
[Noms des membres]

## Licence
MIT
```
