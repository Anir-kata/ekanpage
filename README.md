# Projet Portfolio + Dashboard

## Features
- Portfolio (profil, experiences, projets, contact)
- Dashboard pedagogique (liste eleves, CRUD eleves)
- API backend NestJS + PostgreSQL

## Lancement rapide

### 1. Installer les dependances
```bash
npm run install:all
```

### 2. Lancer la base PostgreSQL
```bash
cd backend
docker compose up -d
cd ..
```

### 3. Lancer front + back ensemble
```bash
npm run dev:full
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:3000`

## Commandes utiles

### Verification complete (tests + coverage + build)
```bash
npm run verify:all
```

### Build front + back
```bash
npm run build:full
```

### Lancer uniquement le front
```bash
npm run dev
```

Alias equivalent:
```bash
npm run vite
```
