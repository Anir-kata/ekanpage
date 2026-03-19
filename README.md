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
