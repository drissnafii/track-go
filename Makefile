.PHONY: start android ios mock-up mock-down mock-logs lint type-check install

# --- Expo Project Commands ---

start:
	@echo "Starting Expo development server..."
	npm start

android:
	@echo "Starting Expo on Android..."
	npm run android

ios:
	@echo "Starting Expo on iOS..."
	npm run ios

lint:
	@echo "Running linter..."
	npm run lint

type-check:
	@echo "Running TypeScript check..."
	npm run type-check

install:
	@echo "Installing dependencies..."
	npm install

# --- Mock API Commands ---

mock-up:
	@echo "Starting Mock API (JSON-Server via Docker)..."
	cd mock-api && docker compose up -d

mock-down:
	@echo "Stopping Mock API..."
	cd mock-api && docker compose down

mock-logs:
	@echo "Viewing Mock API logs..."
	cd mock-api && docker compose logs -f

# --- Combined Commmands ---

dev: mock-up start
