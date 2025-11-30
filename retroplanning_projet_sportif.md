# 🧾 Inventaire des tâches

## 🟢 BACK-END

### Authentification / Permissions
- [x] Auth complète (déjà réalisée)
- [ ] Tests unitaires auth
- [ ] Middleware rôles (user / admin)

### Annonces
- [ ] Modèle `Annonce`
- [ ] CRUD complet
- [ ] Liaison utilisateur propriétaire
- [ ] Système de favoris (relation user ↔ annonce)
- [ ] Partage d’annonce (URL publique partageable)
- [ ] Filtrage par sport / ville
- [ ] (Optionnel : type de pratique)

### Catégories
- [ ] Modèle `Categorie`
- [ ] CRUD complet + liaison annonce
- [ ] Interface admin dédiée (UI simple, sécurisée)

### Chat / Messages
- [ ] Socket.io serveur
- [ ] Rooms par annonce / conversation privée
- [ ] Sauvegarde des messages en DB
- [ ] Notifications en temps réel (si temps dispo)

### Médias
- [ ] Upload avatar utilisateur
- [ ] Upload image(s) d’annonce
- [ ] Sécurisation des fichiers (Multer + contrôle MIME)
- [ ] Liaison avec documents MongoDB

### Tests & Déploiement back
- [ ] Tests Postman complets
- [ ] Vérification déploiement sur Render
- [ ] Correctifs API / sécurité

---

## 🟡 FRONT-END (React / Vite)

### Global
- [ ] Auth (login / register)
- [ ] Gestion JWT (stockage + routes protégées)
- [ ] Navigation (user connecté / visiteur)
- [ ] Responsive + design Tailwind

### UI Utilisateur
- [ ] Accueil (liste publique d’annonces)
- [ ] Page d’annonce (vue visiteur)
- [ ] Page "Mes annonces" (CRUD utilisateur)
- [ ] Page "Publier" (formulaire création annonce)
- [ ] Favoris (ajouter / retirer)
- [ ] Partage d’annonce (copier lien)
- [ ] Messages / Chat (Socket.io)
- [ ] Mon compte / profil / paramètres
- [ ] Calendrier personnel (bonus)
- [ ] Groupes (placeholder ou à ignorer si temps court)
- [ ] Recherche / filtres (ville, sport)
- [ ] Suggestions d’annonces similaires (bonus)

### UI Admin (Catégories)
- [ ] Login admin
- [ ] Gestion catégories (CRUD)
- [ ] Sécurisation (routes protégées)
- [ ] Design minimal, clair

### Sécurité & Design
- [ ] Validation des formulaires
- [ ] Gestion erreurs API
- [ ] Design global + responsive mobile / desktop

### Tests & Déploiement front
- [ ] Vérification liaison API
- [ ] Tests navigation et auth
- [ ] Déploiement sur Netlify / Vercel

---

## 🟣 Autres (optionnels / bonus)
- [ ] Notifications (si temps)
- [ ] Suggestions dynamiques
- [ ] Améliorations UX
- [ ] Préparation soutenance (slides, démo fluide)

---

# ⏱️ Estimation du temps

- CRUD Annonces + favoris + partage → **10h**
- CRUD Catégories + UI admin → **10h**
- Chat Socket.io + stockage messages → **10h**
- Auth tests + rôles → **4h**
- Gestion médias → **6h**
- UI utilisateur complète → **25h**
- Recherche + filtres → **5h**
- Design & responsive → **8h**
- Notifications (bonus / v2) → **5h**
- Tests + déploiement → **5h**

**≈ Total estimé : 88h (hors bonus)**

---

# 📆 Rétroplanning avec cases de suivi

## ✅ Semaine 1 (3 → 9 novembre) — Back complet (hors chat)
- [ ] CRUD Annonces (modèle, routes, contrôleurs)
- [ ] CRUD Catégories (modèle + routes)
- [ ] Liaison Annonce ↔ User ↔ Catégorie
- [ ] Favoris + partage
- [ ] Middleware rôles + tests unitaires auth
- [ ] Vérification déploiement backend

💡 *Objectif fin de semaine : Back complet et stable*

---

## ✅ Semaine 2 (10 → 16 novembre) — Chat + médias
- [ ] Implémentation Socket.io (serveur)
- [ ] Rooms / logique de conversation
- [ ] Upload avatar + images d’annonce
- [ ] Liaison médias ↔ annonces
- [ ] Tests Postman complets
- [ ] Début liaison front (auth, API)

💡 *Objectif fin de semaine : Chat et upload opérationnels*

---

## ✅ Semaine 3 (17 → 23 novembre) — Front connecté
- [ ] Auth front + gestion JWT
- [ ] Routes protégées + profil utilisateur
- [ ] Accueil + liste annonces + détails
- [ ] CRUD front (mes annonces / publier)
- [ ] Gestion favoris + partage
- [ ] UI admin catégories

💡 *Objectif fin de semaine : Front connecté, CRUD et favoris fonctionnels*

---

## ✅ Semaine 4 (24 → 30 novembre) — Design, finitions, déploiement
- [ ] Design final + responsive
- [ ] Filtres (ville, sport)
- [ ] Tests complets front/back
- [ ] Déploiement front (Netlify/Vercel)
- [ ] Documentation technique
- [ ] Vérification finale et livrable

💡 *Objectif fin de semaine : Version stable et présentable*

---

## 📅 À partir du 1er décembre — Soutenance
- [ ] Préparation slides et script oral
- [ ] Démo fluide et stable
- [ ] Tests scénarios utilisateur
- [ ] Nettoyage du code et dépôt final
