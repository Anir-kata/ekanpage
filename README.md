# Portfolio + Dashboard

Projet full-stack:
- frontend/ : React + Vite
- backend/ : NestJS + PostgreSQL

## Prerequis
- Node.js
- Docker (pour PostgreSQL en local)

## Commandes (depuis la racine)

Installer les dependances:
```bash
npm run install:all
```

Demarrer PostgreSQL:
```bash
docker compose -f backend/docker-compose.yml up -d
```

Lancer frontend + backend:
```bash
npm run dev:full
```

URLs:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000


Verifier le projet (tests + build):
```bash
npm run verify:all
```

Build complet:
```bash
npm run build:full
```

## Nouveaute

**v4.0.13** - Configuration Render backend API
- Fixed API endpoint configuration for Vercel production deployment
- Backend now correctly points to https://ekanpage-backend.onrender.com

**v4.0.12** - Complete English translation
- Full EN translation of entire portfolio content (experiences, projects, expertise, education)

**v4.0.11** - Bilingual interface
- Added FR/EN language toggle button
- Complete translation of all UI labels and navigation
