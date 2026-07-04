# GrabYojana — Team Workflow

This document outlines the development workflow and contribution guidelines for the GrabYojana project.

---

## 🌿 Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production-ready code, always deployable |
| `dev` | Active development, features merge here first |
| `feature/<name>` | Individual feature branches |
| `bugfix/<name>` | Bug fix branches |

### Workflow

1. Create a feature branch from `dev`:
   ```bash
   git checkout dev
   git pull origin dev
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit:
   ```bash
   git add .
   git commit -m "feat: add scheme filter functionality"
   ```

3. Push and create a Pull Request to `dev`:
   ```bash
   git push origin feature/your-feature-name
   ```

4. After code review, merge to `dev`. When stable, merge `dev` → `main`.

---

## 📁 Project Structure Guide

```
src/
├── components/       # Reusable components (Button, Card, Navbar, etc.)
├── pages/            # Page components mapped to routes
├── services/         # API calls, data, and helper functions
├── assets/           # Images and static files
├── App.jsx           # Root component with routing
├── main.jsx          # Entry point
└── index.css         # Global styles
```

### Naming Conventions

- **Components**: PascalCase (`SchemeCard.jsx`, `Navbar.jsx`)
- **Pages**: PascalCase (`Home.jsx`, `CheckEligibility.jsx`)
- **Services/Utils**: camelCase (`schemesData.js`, `helpers.js`)
- **CSS classes**: Use Tailwind utilities

---

## 🔧 Development Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint

# Deploy to GitHub Pages
npm run deploy
```

---

## ✅ Commit Message Format

Use conventional commit messages:

```
feat: add new feature
fix: resolve a bug
style: formatting, no logic change
refactor: restructure code without changing behavior
docs: update documentation
chore: maintenance tasks
```

---

## 📋 Code Review Checklist

Before submitting a PR, verify:

- [ ] App builds without errors (`npm run build`)
- [ ] No console errors in the browser
- [ ] Pages are responsive on mobile
- [ ] Animations are smooth and not janky
- [ ] All routes navigate correctly
- [ ] No hardcoded values — use `constants.js`

---

## 🚀 Deployment

The project is deployed to GitHub Pages using the `gh-pages` package.

```bash
# Builds and deploys to gh-pages branch
npm run deploy
```

---

## 📞 Contact

For questions or issues, reach out to:
- Email: support@grabyojana.in
