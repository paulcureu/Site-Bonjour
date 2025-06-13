# Site Bonjour

![CI](https://github.com/paulcureu/site-bonjour/actions/workflows/lint-test.yml/badge.svg)

[![codecov](https://codecov.io/gh/paulcureu/Site-Bonjour/branch/main/graph/badge.svg)](https://codecov.io/gh/paulcureu/Site-Bonjour)

🍽️ Premium Plan – Restaurant Website
This is a full-stack project for a restaurant presentation and management site, built with a modern, robust, and scalable tech stack.

📜 Description
The app delivers a complete experience for both customers and restaurant administrators. Customers can browse the menu, make reservations, and leave reviews, while admins have access to a powerful dashboard for managing bookings, menu items, and site content.

✨ Key Features
Reservation System: Intuitive booking form for customers and centralized admin management.

Interactive Menu: Filterable by category with images and detailed descriptions.

Admin Dashboard: Stats panel, CRUD for menu items, review moderation, and reservation management.

Secure Authentication: JWT-based system with refresh tokens and role management (Admin/Public).

Email Notifications: Reservation confirmations and password reset emails.

Responsive Design: Optimized for both desktop and mobile, with Dark Mode support.

Performance & SEO: PWA-ready, lazy-loading, and dynamic SEO best practices (meta-tags, sitemap).

🚀 Tech Stack
Backend
Runtime: Node.js 18+

Framework: Express.js

Language: TypeScript

ORM: Prisma

Job Queue: BullMQ

Email: MJML + SMTP

Frontend
Framework: React

Bundler: Vite

Language: TypeScript

Styling: Tailwind CSS

State Management: React Query, React Context

Routing: React Router DOM

Component Dev: Storybook

Database & Caching
Database: PostgreSQL

Cache & Queues: Redis

DevOps & Tooling
Containerization: Docker & Docker Compose

CI/CD: GitHub Actions

Hosting: Vercel (Frontend) / Railway (Backend)

Linting & Formatting: ESLint & Prettier

Logging: Winston & Logtail

Error Monitoring: Sentry

Monorepo Management: pnpm workspaces

⚙️ Local Setup Instructions
Prerequisites
Make sure the following tools are installed:

Node.js (v18+)

pnpm (v9+)

Docker & Docker Compose

Installation Steps
Clone the repository:

bash
Copy code
git clone https://github.com/paulcureu/Site-Bonjour.git
cd Site-Bonjour
Install all dependencies:

bash
Copy code
pnpm install
Start Docker services (PostgreSQL & Redis):

bash
Copy code
docker-compose up -d
Configure Environment Variables
Navigate to the API folder:

bash
Copy code
cd apps/api
Copy the example .env file:

bash
Copy code
cp .env.example .env
Edit .env and update values like so:

env
Copy code
DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase?schema=public"
REDIS_URL="redis://localhost:6379"

JWT_ACCESS_SECRET="your_access_secret"
JWT_REFRESH_SECRET="your_refresh_secret"
JWT_RESET_SECRET="your_reset_secret"

EMAIL_FROM="no-reply@restaurant.com"
SMTP_HOST="sandbox.smtp.mailtrap.io"
SMTP_PORT=2525
SMTP_USER="your_mailtrap_user"
SMTP_PASS="your_mailtrap_pass"

LOGTAIL_TOKEN=""
Run Database Migrations
From the project root:

bash
Copy code
pnpm --filter api prisma migrate dev
(Optional) Seed the database with test data:

bash
Copy code
pnpm --filter api seed
Start the App
Use two terminal windows in the project root:

Start the Backend (API):

bash
Copy code
pnpm dev:api
Runs at: http://localhost:3000

Start the Frontend (Web):

bash
Copy code
pnpm dev:web
Runs at: http://localhost:5173

📜 Available Scripts
Script (pnpm <name>)	Description
dev:api	Starts the API server in dev mode
dev:web	Starts the frontend app in dev mode
storybook	Launches the Storybook UI preview
lint	Runs ESLint on the entire project
test	Runs unit and integration tests
build	Builds production versions of API and Web

🏛️ Project Structure
This is a monorepo managed with pnpm workspaces:

bash
Copy code
/
├── apps/
│   ├── api/      # Node.js + Express Backend
│   └── web/      # React + Vite Frontend
│
├── packages/
│   ├── ui/       # (Example) Shared React Components
│   └── config/   # (Example) Shared ESLint/TS configs
│
├── docker-compose.yml
├── package.json
└── pnpm-workspace.yaml
