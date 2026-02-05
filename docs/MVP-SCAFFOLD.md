# MVP Scaffold

Fichiers créés:
- `README-MVP.md` — description du MVP et quick start
- `.gitignore`
- `.github/PULL_REQUEST_TEMPLATE.md`

Objectifs immédiats:
1. Mettre en place l'authentification (`next-auth`) et le modèle utilisateur.
2. Créer les tables `Client` et `Report` avec `Prisma`.
3. Implémenter import CSV et saisie manuelle pour KPI.
4. Construire UI report (3 graphiques) et bouton `Export PDF`.

Notes
- Le worker Puppeteer sera séparé du runtime Next.js (containerisé).
