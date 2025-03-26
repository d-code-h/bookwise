import NextAuth, { User as NextAuthUser } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { db } from './database/drizzle';
import { users } from './database/schema';
import { eq } from 'drizzle-orm';
import { compare } from 'bcryptjs';

interface User extends NextAuthUser {
  role: string;
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      role: string;
    };
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: 'jwt',
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials.email || !credentials.password) {
          return null;
        }
        // Fetch user from database
        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials.email.toString()))
          .limit(1);

        if (user.length === 0) {
          return null;
        }

        const isPasswordValid = await compare(
          credentials.password.toString(),
          user[0].password,
        );

        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user[0].id,
          email: user[0].email,
          name: user[0].fullName,
          role: user[0].role,
        } as User;
      },
    }),
  ],
  // pages: {
  //   signIn: '/sign-in',
  // },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user && 'role' in user) {
        token.id = user.id;
        token.name = user.name;
        token.role = user.role;
      }
      return token;
    },
  },
});
