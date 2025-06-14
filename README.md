# Site Bonjour

![CI](https://github.com/paulcureu/site-bonjour/actions/workflows/lint-test.yml/badge.svg)

[![codecov](https://codecov.io/gh/paulcureu/Site-Bonjour/branch/main/graph/badge.svg)](https://codecov.io/gh/paulcureu/Site-Bonjour)

# 🍽️ Premium Plan – Restaurant Website

This is a full-stack project for a restaurant presentation and management site, built with a modern, robust, and scalable tech stack.

---

## 📜 Description

The app delivers a complete experience for both customers and restaurant administrators.

- **Customers** can browse the menu, make reservations, and leave reviews.  
- **Admins** have access to a powerful dashboard for managing bookings, menu items, and site content.

---

## ✨ Key Features

- **Reservation System**: Intuitive booking form for customers and centralized admin management.  
- **Interactive Menu**: Filterable by category with images and detailed descriptions.  
- **Admin Dashboard**: Stats panel, CRUD for menu items, review moderation, and reservation management.  
- **Secure Authentication**: JWT-based system with refresh tokens and role management (Admin/Public).  
- **Email Notifications**: Reservation confirmations and password reset emails.  
- **Responsive Design**: Optimized for both desktop and mobile, with Dark Mode support.  
- **Performance & SEO**: PWA-ready, lazy-loading, and dynamic SEO best practices (meta-tags, sitemap).

---

## 🚀 Tech Stack

### 🔧 Backend

- **Runtime**: Node.js 18+  
- **Framework**: Express.js  
- **Language**: TypeScript  
- **ORM**: Prisma  
- **Job Queue**: BullMQ  
- **Email**: MJML + SMTP  

### 🎨 Frontend

- **Framework**: React  
- **Bundler**: Vite  
- **Language**: TypeScript  
- **Styling**: Tailwind CSS  
- **State Management**: React Query, React Context  
- **Routing**: React Router DOM  
- **Component Dev**: Storybook  

### 🛢️ Database & Caching

- **Database**: PostgreSQL  
- **Cache & Queues**: Redis  

### ⚙️ DevOps & Tooling

- **Containerization**: Docker & Docker Compose  
- **CI/CD**: GitHub Actions  
- **Hosting**: Vercel (Frontend) / Railway (Backend)  
- **Linting & Formatting**: ESLint & Prettier  
- **Logging**: Winston & Logtail  
- **Error Monitoring**: Sentry  
- **Monorepo Management**: pnpm workspaces  

---

## ⚙️ Local Setup Instructions

### ✅ Prerequisites

Make sure the following tools are installed:

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/) (v9+)
- [Docker](https://www.docker.com/) & Docker Compose

### 📥 Installation Steps

1. **Clone the repository**

```bash
git clone https://github.com/paulcureu/Site-Bonjour.git
cd Site-Bonjour

