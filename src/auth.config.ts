import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";

import { loginSchema } from "./lib/schemas/LoginSchema"
import { getUserByEmail } from "./app/actions/authActions";
import { compare } from "bcryptjs";
 
export default {
  providers: [
    Credentials({
      name: 'credentials',
      async authorize(creds) {
        const validated = loginSchema.safeParse(creds);

        if (validated.success) {
          const { email, password } = validated.data;

          const user = await getUserByEmail(email);

          if (!user || !user.passwordHash || !(await compare(password, user.passwordHash))) {
            return null;
          }

          return user;
        }

        return null;
      }
    }),
    // Add other providers here, e.g., Google, GitHub, etc.
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    })
  ],
  secret: process.env.SECRET,
} satisfies NextAuthConfig