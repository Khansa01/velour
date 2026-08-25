# Velour

A luxury beauty e-commerce web app built with Next.js — inspired by Sephora.

## Live Demo

[velour-by-khansa.vercel.app](https://velour-by-khansa.vercel.app)

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** + **shadcn/ui**
- **Supabase** (PostgreSQL Database)
- **Prisma v7** (ORM)
- **NextAuth.js** (Authentication + Google OAuth)
- **Zustand** (Cart & Wishlist state)

## Getting Started

1. Clone the repo

```bash
   git clone https://github.com/Khansa01/velour.git
   cd velour
```

2. Install dependencies

```bash
   npm install
```

3. Setup environment variables

```bash
   cp .env.example .env.local
```

Fill in your keys in `.env.local`

4. Setup database

```bash
   npx prisma generate
   npx prisma migrate dev --name init
```

5. Run the dev server

```bash
   npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Features

- Product listing & detail page
- Category filter & search
- Cart & wishlist
- Google OAuth + credentials authentication
- Checkout flow (sandbox)
- Responsive design
- PostgreSQL database via Supabase

## Environment Variables

See `.env.example` for required keys.
