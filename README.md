# Portfolio + Dashboard

## Structure
- `frontend/` : application React + Vite
- `backend/` : API NestJS + PostgreSQL

## Features
- Portfolio (profil, experiences, projets, contact)
- Dashboard pedagogique (liste eleves, CRUD eleves)
- API backend NestJS + PostgreSQL

## Lancement rapide

Toutes les commandes ci-dessous sont a executer depuis la racine du depot Git.

### 1. Installer les dependances
```bash
npm run install:all
```

### 2. Lancer la base PostgreSQL
```bash
docker compose -f backend/docker-compose.yml up -d
```

### 3. Lancer front + back ensemble
```bash
npm run dev:full
```

Frontend: `http://localhost:5173`
Backend: `http://localhost:3000`

## Commandes utiles

### Lancer uniquement le backend
```bash
npm --prefix backend run start:dev
```

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
