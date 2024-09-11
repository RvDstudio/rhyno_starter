// auth.ts
import NextAuth from "next-auth";
import github from "next-auth/providers/github";
import google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./src/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt" },
  adapter: DrizzleAdapter(db),
  pages: {
    signIn: "/login",
  },
  providers: [
    github({ allowDangerousEmailAccountLinking: true }),
    google({
      allowDangerousEmailAccountLinking: true,
      profile(profile) {
        return {
          id: profile.id,
          email: profile.email,
          name: profile.name,
          image: profile.picture,

        };
      },
    }),
    CredentialsProvider({
      name: "Sign in",
      id: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Check if the login is from Google
        if (credentials?.email === 'google') {
          return { email: credentials.email }; // Return a user object for Google login
        }

        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, String(credentials.email)),
        });

        if (
          !user ||
          !(await bcrypt.compare(String(credentials.password), user.password!))
        ) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          isAdmin: user.isAdmin, // Assuming this field exists in your database
        };
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const paths = ["/dashboard", "/client-side", "/api/session"];
      const isProtected = paths.some((path) =>
        nextUrl.pathname.startsWith(path)
      );

      if (isProtected && !isLoggedIn) {
        const redirectUrl = new URL("/login", nextUrl.origin);
        redirectUrl.searchParams.append("callbackUrl", nextUrl.href);
        return Response.redirect(redirectUrl);
      }
      return true;
    },
    jwt: async ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id,
          randomKey: u.randomKey,
          isAdmin: u.isAdmin, // Add isAdmin to the token
        };
      }

      // Fetch user details if coming from Google
      if (token.email === 'google') {
        token.isAdmin = true; // Set isAdmin or any other default value
      } else if (token.email) {
        const userFromDb = await db.query.users.findFirst({
          where: (users, { eq }) => eq(users.email, token.email as string),
        });
        if (userFromDb) {
          token.isAdmin = userFromDb.isAdmin; // Set isAdmin from the database
        }
      }
      return token;
    },
    session: async ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id as string,
          randomKey: token.randomKey,
          isAdmin: token.isAdmin, // Add isAdmin to the session
        },
      };
    },
  },
});
