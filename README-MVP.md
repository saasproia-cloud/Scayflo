B2B Audit & Reporting Tool — MVP

Résumé
-------
Outil SaaS pour agences/consultants permettant d'automatiser les audits marketing (SEO, trafic, conversions) et de générer des rapports PDF brandés.

Stack recommandée (MVP)
- Frontend: Next.js + TypeScript
- Auth: next-auth
- DB: PostgreSQL (Prisma)
- Jobs: Redis + BullMQ (workers pour génération PDF)
- Storage: S3-compatible
- PDF: Puppeteer (headless Chromium)

Scope MVP
- Auth (agence/utilisateur)
- CRUD clients (URL, secteur, KPIs initiaux)
- Import CSV + saisie manuelle KPI
- Rapport interactif (trafic, conversions, SEO summary)
- Export PDF brandé
- Envoi PDF par email (optionnel)

Quick start
1. Copier .env.example → .env et remplir
2. Installer dépendances: `pnpm install`
3. Lancer dev: `pnpm dev`

Branche de travail
- Cette fonctionnalité est scaffoldée sur la branche `feat/mvp-scaffold`.

Prochaines étapes
- Implémenter auth + DB migrations
- Ajouter import CSV et UI report
- Mettre en place worker PDF
