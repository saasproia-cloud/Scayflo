# Architecture proposée

## Vue d'ensemble ✅
- **Frontend**: Next.js (app router) + React + Tailwind CSS — hébergé sur Vercel ou Render.
- **Backend**: API server intégré à Next.js (routes /app/api) ou Node.js/Express si séparation stricte requise.
- **Base de données**: PostgreSQL (managed) — Supabase, Neon, DigitalOcean Managed DB ou AWS RDS.
- **ORM**: Prisma (déjà présent) pour schéma, migrations et accès DB sécurisé.
- **Authentification**: JWT stocké en cookie HTTP-only (déjà en place), contrôle par rôle (user/admin).
- **Admin / Back-office**: Tableau de bord admin dans Next.js (protéger avec role=admin) + possibilité d'utiliser Supabase Studio ou AdminJS / Forest Admin pour interface en ligne.

---

## Pourquoi ces choix 🔧
- **PostgreSQL**: fiable, ACID, transactions, bon pour données relationnelles (utilisateurs, abonnements, clients, métriques).
- **Prisma**: déjà intégré dans le projet — facilite migrations, client type-safe et Prisma Studio (édition locale).
- **Next.js**: frontend + API route dans le même projet -> déploiement simple et cohérent.
- **Supabase / Neon**: solutions managées offrant UI pour administrer la DB, backups et sécurité.

---

## Sécurité & contrôle 🔒
- Restreindre toutes les routes admin via la vérification du token et du rôle (`getSession()` déjà présent).
- Utiliser `DATABASE_URL` sécurisé (TLS) et stocker `JWT_SECRET` en variable d'environnement.
- Sauvegardes régulières (snapshots DB) et accès IP restreint pour la DB.

---

## Fichiers & endpoints ajoutés ✨
- `app/api/admin/users/route.ts` — GET / PATCH / DELETE pour la gestion des utilisateurs (protégé admin).
- `app/api/admin/companies/[id]/route.ts` — PATCH / DELETE pour modifier plan, nom, supprimer company.
- `prisma/seed.ts` — script de seed (crée un compte admin de test / Demo Company).
- `.env.example` — mis à jour avec option PostgreSQL.
- `prisma/schema.prisma` — basculé pour utiliser `provider = "postgresql"`.
- `package.json` — scripts: `prisma:migrate`, `prisma:deploy`, `prisma:seed`.

---

## Étapes rapides pour démarrer ▶️
1. Choisir un provider Postgres et récupérer `DATABASE_URL`.
2. Copier `.env.example` -> `.env` et configurer `DATABASE_URL` et `JWT_SECRET`.
3. Installer dépendances: `pnpm install` (ou `npm install`).
4. Lancer migration & seed (dev): `pnpm prisma:migrate` puis `pnpm prisma:seed`.
5. Démarrer le projet: `pnpm dev`.

---

## Options d'hébergement & admin UI 🛰️
- Hosting Next.js: **Vercel** (très simple), **Render**, **Fly.io**.
- Managed Postgres: **Supabase** (UI & auth optionnel), **Neon** (serverless Postgres), **DigitalOcean Managed DB**, **AWS RDS**.
- Interface DB en ligne: **Supabase Studio**, **PgAdmin**, **Prisma Studio** (local), **AdminJS** ou **Forest Admin** (back-office prêt à l’emploi).

---

## Prochaines tâches recommandées ✅
1. Mettre en place backups et accès sécurisé pour la DB.
2. Créer pages **/admin** (UI) pour: gestion utilisateurs, gestion abonnements, revue clients, journaux et actions manuelles.
3. Ajouter logs d’audit (qui a changé quoi) et validations côté serveur avant modification des abonnements.
4. Ajouter tests API & e2e pour endpoints admin.

---

Si tu veux, je peux générer un squelette de la page `/admin` (frontend) avec composants pour lister utilisateurs, sociétés et modifier l’abonnement en appelant les nouveaux endpoints.
