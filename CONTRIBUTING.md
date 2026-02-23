# Contributing to Track-Go

Welcome to the team! To maintain a stable project, we follow a strict Git Flow.

## 🛡️ Branch Protection Rules

### 1. The `main` Branch

- **Status**: Production Only.
- **Rule**: NEVER push directly to `main`.
- **Rule**: Only merges from `develop` are allowed via Pull Request.
- **Rule**: Requires at least 1 approval.

### 2. The `develop` Branch

- **Status**: Integration & Testing.
- **Rule**: NEVER push directly to `develop`.
- **Rule**: All features must be merged via Pull Request from a `feature/` branch.
- **Rule**: Code must pass CI tests before merging.

## 🚀 How to Work

1. **Start a task**:
   ```bash
   git checkout develop
   git pull origin develop
   git checkout -b feature/your-task-name
   ```
2. **Commit often**: Use meaningful commit messages (`feat:`, `fix:`, `docs:`).
3. **Submit for review**: Push your branch and open a PR to `develop` on GitHub.
4. **Merge**: Once approved, merge your PR and delete the feature branch.

## 🛠 Definition of Done (DoD)

- Code is formatted (`go fmt`).
- Tests pass (`go test ./...`).
- Documentation updated (if applicable).
- PR is reviewed and approved.
