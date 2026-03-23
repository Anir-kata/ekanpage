# ekanpage

![CI](https://github.com/Anir-kata/ekanpage/actions/workflows/ci.yml/badge.svg)

Portfolio interactif + espace d'enseignement personnel.

Le site présente mon parcours, mes projets et mes compétences, avec un dashboard pédagogique.

---

## Stack technique

**Frontend**
- React 19 + TypeScript
- Vite 7
- Tailwind CSS 4

**Backend**
- NestJS 11 (Node.js)
- TypeORM 0.3 + PostgreSQL
- Authentification JWT

**Tests**
- Jest (unitaires + e2e + sécurité)

---

## Production

| Service  | Rôle              | URL                                          |
|----------|-------------------|----------------------------------------------|
| Vercel   | Frontend          | https://anirportfolio.vercel.app/           |
| Render   | Backend (API)     | https://ekanpage-backend.onrender.com        |
| Neon     | Base PostgreSQL   | connexion via `DATABASE_URL`   |

La variable `CORS_ORIGIN` du backend Render est gérée dans `render.yaml` pour centraliser le changement de domaine dans un seul endroit du dépôt.

---

## Développement local

**Prérequis :** Node.js, Docker

```bash
# 1. Installer les dépendances
npm run install:all

# 2. Démarrer PostgreSQL (Docker)
docker compose -f backend/docker-compose.yml up -d

# 3. Configurer les variables d'environnement
cp backend/.env.example backend/.env
# renseigner AUTH_USER, AUTH_PASSWORD, JWT_SECRET

# 4. Lancer le projet
npm run dev:full
```

- Frontend : http://localhost:5173
- Backend : http://localhost:3000

---

## Commandes utiles

```bash
npm run verify:all   # tests + build complet
npm run build:full   # build frontend et backend
```
