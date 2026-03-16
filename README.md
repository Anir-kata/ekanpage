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

## Deploiement 100% gratuit (Vercel + Render + Neon)

Objectif: exposer l'application publiquement sur Internet sans depenser d'argent.

### Architecture cible
- Frontend (`frontend/`) -> Vercel (Free)
- Backend (`backend/`) -> Render Web Service (Free)
- Base PostgreSQL -> Neon (Free)

### 1. Creer la base Postgres sur Neon
1. Cree un projet Neon gratuit.
2. Cree une base et copie la chaine de connexion `DATABASE_URL`.
3. Garde `sslmode=require` dans l'URL.

### 2. Deployer le backend sur Render
1. Connecte ton repo GitHub a Render.
2. Cree un Web Service avec `rootDir=backend`.
3. Render peut lire `render.yaml` a la racine du repo.
4. Configure les variables d'environnement Render:
	- `DATABASE_URL` = URL Neon
	- `DB_SSL` = `true`
	- `DB_SYNC` = `false`
	- `JWT_SECRET` = secret fort
	- `AUTH_USER` = ton login admin
	- `AUTH_PASSWORD` = ton mot de passe admin
	- `CORS_ORIGIN` = URL Vercel du frontend (ajouter apres creation Vercel)
5. Verifie l'endpoint `https://<ton-backend>.onrender.com/health`.

### 3. Deployer le frontend sur Vercel
1. Connecte le meme repo sur Vercel.
2. Configure le projet avec `Root Directory = frontend`.
3. Ajoute la variable d'environnement frontend:
	- `VITE_API_BASE_URL` = URL publique Render du backend
4. Redeploie et teste l'application.

### 4. Verification finale
1. Ouvre l'URL Vercel depuis un autre reseau (ex: 4G).
2. Teste login admin + CRUD eleves.
3. Verifie que les requetes API arrivent bien sur Render.

### Fichiers utiles ajoutes
- `render.yaml` : blueprint Render gratuit pour le backend.
- `frontend/.env.example` : variable frontend `VITE_API_BASE_URL`.
- `backend/.env.example` : support `DATABASE_URL` + `DB_SSL`.
