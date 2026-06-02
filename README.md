# LeBonCorner

Plateforme de petites annonces fullstack — les utilisateurs peuvent publier, rechercher et contacter des vendeurs via une messagerie intégrée.

---

## Stack

| | |
|---|---|
| **Backend** | Node.js · Express 5 · MySQL · MongoDB · JWT · Nodemailer · Joi |
| **Frontend** | React 18 · Vite · React Router v6 · Axios |

---

## Fonctionnalités

- Inscription / Connexion / Déconnexion
- Refresh automatique du token (intercepteur Axios)
- Réinitialisation du mot de passe par email
- Gestion du profil (modifier nom/email, supprimer son compte)
- Publication, modification et suppression d'annonces
- Recherche et filtrage par texte, catégorie et fourchette de prix
- Messagerie entre utilisateurs (conversations + réactions)
- Panneau d'accessibilité (contraste élevé, zoom texte, niveaux de gris)

---

## Prérequis

- Node.js ≥ 18
- MySQL
- MongoDB (local ou Atlas)
- Un compte Gmail avec un [mot de passe d'application](https://myaccount.google.com/apppasswords)

---

## Installation

### Backend

```bash
cd backend
npm install
cp .env.example .env
```

Complétez le `.env` :

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=votre_mot_de_passe
DB_NAME=leboncorner

MONGODB_URI=mongodb://localhost:27017/leboncorner

JWT_SECRET=une_chaine_secrete_longue
JWT_REFRESH_SECRET=une_autre_chaine_secrete

CLIENT_URL=http://localhost:5173

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=votre.adresse@gmail.com
MAIL_PASS=xxxx xxxx xxxx xxxx
MAIL_FROM=votre.adresse@gmail.com
```

```bash
npm run dev   # nodemon
npm start     # production
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

L'app tourne sur **http://localhost:5173**.  
Les appels `/api/*` sont proxifiés vers `http://localhost:5000`.

---

## Structure

```
LeBonCorner/
├── backend/
│   ├── config/          # Connexions MySQL et MongoDB
│   ├── controllers/     # Logique métier
│   ├── repositories/    # Requêtes SQL / Mongoose
│   ├── routes/          # Déclaration des endpoints
│   ├── middlewares/     # Auth JWT, validation, rôles, erreurs
│   ├── validators/      # Schémas Joi
│   ├── services/        # Envoi d'emails (Nodemailer)
│   ├── errors/          # Classes d'erreurs (AppError, UnauthorizedError…)
│   └── server.js
│
└── frontend/
    └── src/
        ├── api/          # Instance Axios + intercepteurs
        ├── context/      # AuthContext · AccessibilityContext
        ├── hooks/        # useAnnonces
        ├── components/   # AnnonceCard · SearchFilterBar · AccessibilityPanel…
        └── pages/        # Login · Register · ForgotPassword · ResetPassword · Home · Profile
```

---

## API

### Auth — `/api/auth`

| Méthode | Route | Description |
|---|---|---|
| POST | `/register` | Inscription |
| POST | `/login` | Connexion |
| POST | `/refresh` | Renouvelle l'access token via cookie |
| POST | `/logout` | Déconnexion |
| POST | `/forgot-password` | Envoie un lien de réinitialisation par email |
| POST | `/reset-password` | Réinitialise le mot de passe avec le token |

### Profil — `/api/profil` *(authentifié)*

| Méthode | Route | Description |
|---|---|---|
| GET | `/` | Récupérer son profil |
| PUT | `/` | Modifier nom et/ou email |
| DELETE | `/` | Supprimer son compte |

### Annonces — `/api/posts` *(authentifié)*

| Méthode | Route | Description |
|---|---|---|
| GET | `/` | Toutes les annonces |
| GET | `/search?q=&category_id=&min_price=&max_price=` | Recherche filtrée |
| GET | `/:id` | Détail d'une annonce |
| POST | `/` | Créer une annonce |
| PUT | `/:id` | Modifier une annonce |
| DELETE | `/:id` | Supprimer une annonce |

### Conversations — `/api/conversations` *(authentifié)*

| Méthode | Route | Description |
|---|---|---|
| GET | `/` | Mes conversations |
| POST | `/` | Créer une conversation |
| GET | `/:id` | Détail (réservé aux participants) |
| POST | `/:id/messages` | Envoyer un message |
| POST | `/:id/messages/:messageId/reactions` | Ajouter une réaction |

---

## Pages

| URL | Description | Accès |
|---|---|---|
| `/login` | Connexion | Public |
| `/register` | Inscription | Public |
| `/forgot-password` | Demande de réinitialisation | Public |
| `/reset-password?token=` | Nouveau mot de passe | Public |
| `/` | Liste et recherche d'annonces | Authentifié |
| `/profil` | Gestion du profil | Authentifié |
