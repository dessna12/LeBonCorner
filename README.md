 # LeBonCorner

Projet pédagogique – Plateforme de petites annonces

**Type** : application inspirée du fonctionnement de Leboncoin
**Objectif pédagogique** : Le projet est structuré en 12 modules indépendants permettant à l’apprenant d’identifier ses lacunes et de travailler spécifiquement les compétences associées. Chaque module peut être réalisé séparément, puis intégré dans un projet final global.
**Durée indicative par module** : 1 à 2 jours



## Technologies possibles
### Backend:
-	Node.js + Express
-	Node.js + ESM
-	PHP

### Frontend:
-	React
-	Vue
-	Next.js
-	EJS
-	Twig

### Base de données:
-	SQL (MySQL / PostgreSQL)
-	MongoDB

### UI:
-	Bootstrap
-	Tailwind CSS
-	CSS natif
 
## MODULE 1 – Analyse du besoin et architecture

Objectif pédagogique : Comprendre le projet, définir les fonctionnalités et structurer un projet web.
Énoncé : Créer l’architecture d’une plateforme de petites annonces. Définir les pages nécessaires, la structure backend/frontend et les principales entités de données.
Livrables : Document avec arborescence du projet, schéma de données, liste des routes et wireframes simples.
Astuces : Commencez par identifier les pages et fonctionnalités principales. Utilisez des croquis ou Figma pour les wireframes.
Ressources :
https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps https://www.figma.com



## MODULE 2 – Mise en place du serveur backend
Objectif pédagogique : Créer un serveur backend fonctionnel capable de recevoir et traiter des requêtes.
Énoncé : Mettre en place un serveur Node.js ou PHP avec au moins une route API test.
Livrables : Serveur fonctionnel avec README expliquant le lancement du projet.
Astuces : Testez votre serveur avec une route simple GET /api/test. Installez Express pour Node.js.
Ressources : https://nodejs.org/en/docs https://expressjs.com
 
## MODULE 3 – Conception de la base de données
Objectif pédagogique : Créer une base de données structurée pour stocker utilisateurs, annonces et messages.
Énoncé : Créer les tables/collections Utilisateur, Annonce et Message avec les champs essentiels.
Livrables : Script SQL ou modèle MongoDB + schéma de base. Astuces : Définir les relations : 1 utilisateur → plusieurs annonces.
Ressources : https://sqlbolt.com https://www.mongodb.com/docs

## MODULE 4 – CRUD des annonces
Objectif pédagogique : Implémenter les opérations Create, Read, Update, Delete pour les annonces.
Énoncé : Créer les routes : POST /annonces, GET /annonces, GET
/annonces/:id, PUT /annonces/:id, DELETE /annonces/:id.
Livrables : API CRUD fonctionnelle testée via Postman ou Insomnia.
Astuces : Tester chaque route avec des données simples avant d’ajouter la base complète.
Ressources : https://restfulapi.net
 
## MODULE 5 – Authentification utilisateur
Objectif pédagogique : Permettre aux utilisateurs de s’inscrire, se connecter et gérer leur session.
Énoncé : Créer POST /register et POST /login avec gestion sécurisée des mots de passe.
Livrables : API d’authentification fonctionnelle avec JWT ou sessions.
Astuces : Utilisez bcrypt pour le hash des mots de passe et jsonwebtoken pour la gestion des tokens.
Ressources : https://jwt.io https://www.npmjs.com/package/bcrypt

## MODULE 6 – Interface utilisateur (Frontend)
Objectif pédagogique : Créer les pages web pour interagir avec le backend.
Énoncé : Pages à créer : liste annonces, détail annonce, formulaire création, inscription, connexion.
Livrables : Frontend fonctionnel connecté à l’API backend.
Astuces : Commencez par des pages statiques puis connectez-les à l’API avec Axios ou fetch.
Ressources : https://react.dev https://vuejs.org
 
## MODULE 7 – Recherche et filtres
Objectif pédagogique : Mettre en place un moteur de recherche et des filtres pour les annonces.
Énoncé : Fonctionnalités : recherche texte, filtrage par catégorie et prix. Livrables : Interface avec fonctionnalité recherche opérationnelle.
Astuces : Commencez par filtrer localement avant d’implémenter côté serveur.
Ressources : https://uxpatterns.dev

## MODULE 8 – Envoi d’emails
Objectif pédagogique : Permettre l’envoi d’emails depuis le site.
Énoncé : Créer formulaire Contact vendeur avec envoi d’email via Nodemailer.
Livrables : Email envoyé et reçu correctement.
Astuces : Tester en local avec Mailtrap ou compte Gmail dédié. Ressources : https://nodemailer.com
 
## MODULE 9 – Upload d’images
Objectif pédagogique : Permettre d’ajouter des images aux annonces.
Énoncé : Chaque annonce doit pouvoir avoir une image principale et des images supplémentaires.
Livrables : Upload fonctionnel avec stockage local ou cloud.
Astuces : Utilisez multer pour Node.js ou une solution équivalente en PHP. Ressources : https://developer.mozilla.org/en-US/docs/Web/API/File


## MODULE 10 – Sécurité
Objectif pédagogique : Sécuriser les données et l’application web.
Énoncé : Implémenter validation des formulaires, protection XSS et contre injections SQL.
Livrables : Application sécurisée avec tests sur données invalides.
Astuces : Sanitize inputs et utiliser ORM pour réduire les risques d’injection SQL.
Ressources : https://owasp.org

## MODULE 11 – Accessibilité et UX
Objectif pédagogique : Respecter les standards d’accessibilité et améliorer l’expérience utilisateur.
Énoncé : Implémenter contraste, navigation clavier, labels de formulaires. Livrables : Interface accessible avec audit Lighthouse ou outils WCAG.
Astuces : Testez votre site sur mobile et clavier, pas seulement avec la souris.
Ressources : https://www.w3.org/WAI
 
## MODULE 12 – Déploiement
Objectif pédagogique : Mettre en production l’application complète.
Énoncé : Déployer frontend, backend et base de données sur serveur ou cloud.
Livrables : Application accessible en ligne avec documentation.
Astuces : Utilisez services cloud comme Heroku, Render, ou un VPS pour déploiement complet.
Ressources :
https://developer.mozilla.org/en-US/docs/Learn/Server-side/Deploying

--- 

Objectif final pédagogique
À l’issue des 12 modules, l’apprenant doit :
-	identifier ses lacunes
-	retravailler les modules correspondants
-	assembler les briques techniques
-	produire une application complète de petites annonces Durée projet final : 15 jours.
