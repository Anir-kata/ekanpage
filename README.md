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

URLs locales:
- Frontend: http://localhost:5173
- Backend: http://localhost:3000

URLs production:
- Frontend: https://ekanpagecontrol.vercel.app
- Backend: https://ekanpage-backend.onrender.com


Verifier le projet (tests + build):
```bash
npm run verify:all
```

Build complet:
```bash
npm run build:full
```

## Nouveautes

- v4.0.21: La barre de navigation rapide du portfolio est maintenant sticky pendant le scroll (haut/bas).
- v4.0.20: Ajout d'une navigation rapide en haut du portfolio pour acceder directement aux sections (scroll fluide).
- v4.0.19: Suppression de la cle `env` depreciee dans `vercel.json` et injection de `VITE_API_BASE_URL` dans `buildCommand`.
- v4.0.18: Remplacement des icones generiques IntelliJ et VS Code par leurs vraies icones dans les competences techniques.

