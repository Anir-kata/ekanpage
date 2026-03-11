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

## Démarrage local

1. Installer les dépendances

```bash
npm install
```

2. Lancer le serveur de développement

```bash
npm run dev
```

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

## Note importante

Le verrouillage par schéma est actuellement géré côté front. Pour une sécurité forte en production, il faut ajouter une authentification côté backend et des endpoints protégés.
