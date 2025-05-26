# Match Me App

> App for people to find their match.

## URL

[YouTube App Demo](?)

## Tools

- NextJS
- Prisma ORM
- TailwindCSS
- NextUI
- NextAuth
- TypeScript
- React

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