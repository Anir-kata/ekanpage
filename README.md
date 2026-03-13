# Portfolio + Tableau de Bord Pédagogique

Application front-end réalisée avec React, TypeScript, Vite et Tailwind CSS.

Le projet contient deux espaces principaux:
- un portfolio professionnel interactif
- un tableau de bord pédagogique pour le suivi des élèves

## Fonctionnalités

### Portfolio
- Interface sci-fi moderne avec animations et effets interactifs
- Présentation du profil, des compétences, des expériences et des projets
- Section contact avec accès direct email/téléphone/LinkedIn/GitHub

### Espace pédagogique
- Liste des élèves avec anonymisation des noms dans l'interface
- Ajout et modification complète des fiches élèves via fenêtre modale
- Déverrouillage protégé par schéma (pattern lock) avant affichage de la fiche complète
- Sélection de la prochaine séance via calendrier (date + heure)
- Tableau de bord avec indicateurs et avis de progression

## Stack technique
- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Icons

## Backend (NestJS + PostgreSQL)

Un backend NestJS a ete initialise dans le dossier `backend`.

### Prerequis
- Docker Desktop (pour PostgreSQL local)
- Node.js 20+

### Demarrage de la base PostgreSQL

```bash
cd backend
docker compose up -d
```

### Demarrage du backend NestJS

```bash
cd backend
npm install
npm run start:dev
```

API par defaut: `http://localhost:3000`

Le backend lit sa configuration depuis `backend/.env`.

Le frontend lit l'API sur `http://localhost:3000` par defaut.
Tu peux surcharger avec `VITE_API_BASE_URL` dans un fichier `.env` a la racine du projet.

### Endpoints disponibles

- `GET /` : endpoint de base (Hello World)
- `GET /health` : verification de sante de l'API
- `GET /students` : liste des eleves
- `GET /students/:id` : detail d'un eleve
- `POST /students` : creation d'un eleve
- `PATCH /students/:id` : mise a jour partielle d'un eleve
- `DELETE /students/:id` : suppression d'un eleve

Exemple de payload `POST /students`:

```json
{
	"fullName": "Sarah Benali",
	"level": "Terminale",
	"objective": "Preparation bac mathematiques",
	"sessionsDone": 6,
	"nextSessionAt": "2026-03-14T18:00:00.000Z",
	"notes": "Bonne progression"
}
```

La validation des DTO est active globalement (champs inconnus refuses, types verifies).

## Démarrage local

1. Installer les dépendances

```bash
npm install
```

2. Lancer le serveur de développement

```bash
npm run dev
```

2bis. Lancer frontend + backend ensemble (un seul script)

```bash
npm run dev:full
```

Cette commande lance Vite (frontend) et NestJS (backend) en parallele.

3. Générer le build de production

```bash
npm run build
```

4. Prévisualiser le build

```bash
npm run preview
```

## Structure rapide

- src/components: composants UI (portfolio, élèves, onglets)
- src/data: données de profil et jeu de données élèves
- src/types: types TypeScript métier
- backend/src: code backend NestJS

## Note importante

Le verrouillage par schéma est actuellement géré côté front. Pour une sécurité forte en production, il faut ajouter une authentification côté backend et des endpoints protégés.
