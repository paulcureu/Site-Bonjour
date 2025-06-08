# Site Bonjour

![CI](https://github.com/paulcureu/site-bonjour/actions/workflows/lint-test.yml/badge.svg)

[![codecov](https://codecov.io/gh/paulcureu/Site-Bonjour/branch/main/graph/badge.svg)](https://codecov.io/gh/paulcureu/Site-Bonjour)

Un site premium pentru un restaurant modern. Monorepo full-stack cu pnpm, Docker, CI, autentificare și dashboard.


## Pornire rapidă

1. **Pornește serviciile de bază**

   ```bash
   docker compose up -d db redis
   ```

   Acest pas pornește containerele PostgreSQL și Redis. Baza de date PostgreSQL este necesară pentru Prisma și trebuie configurată prin variabila `DATABASE_URL`.

   Copiază fișierul `.env.example` în `.env` la rădăcina proiectului și adaugă URL-ul conexiunii, de exemplu:

   ```bash
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/site_db"
   ```

2. **Aplică migrațiile și popularea inițială**

   ```bash
   pnpm --filter api prisma migrate deploy
   pnpm --filter api seed
   ```

   Comenzile rulează în pachetul `api` și pregătesc baza de date cu structura și datele necesare.


## Configurare API

Inainte de a porni API-ul sau scripturile de seed, copiaza `apps/api/.env.example` in `apps/api/.env` si actualizeaza valorile variabilelor.
