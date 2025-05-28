# Match Me App

> A full-stack dating application built with Next.js 14, Prisma, NextAuth, Pusher, and Cloudinary.

## URL

[YouTube App Demo](?)

## Tools

- NextJS 14
- Prisma ORM
- NextAuth (Auth.js)
- TailwindCSS
- NextUI
- NextAuth
- TypeScript
- Pusher  
- Cloudinary  
- Vercel  
- PostgreSQL  
- React Hook Form  
- Zod Validation  
- Zustand

## Common use commands

```
npx prisma generate
# This command generates the Prisma client, which allows you to interact with your database using Prisma's API.

npx prisma db push
# This command pushes your Prisma schema changes to your database without creating a migration (for development environments).

npx prisma studio
# This command opens Prisma Studio, a web interface for browsing and editing your database content visually.

npx prisma migrate reset --skip-seed
# This command resets your database by rolling back all migrations and applying them again from scratch. The --skip-seed flag skips runnings any seed scripts.

npx prisma db seed
# This command runs your seed script, which adds initial data to your database after setting it up.
```

## Installation

1. Clone the repo
2. Install packages `npm install`
3. Set up environment variables in .env file
4. Set up Prisma database
```bash
npx prisma generate
npx prisma migrate dev
npx prisma db seed
```
5. Run the development server `npm run dev`
