import NextAuth, { User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import CredentialsProvider from "next-auth/providers/credentials";
import axiosInstance, { baseURL } from "@/src/api/instance";

const providers = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "email", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials, req) {
      const res = await fetch(`${baseURL}/auth/signin`, {
        method: "POST",
        body: JSON.stringify({
          email: credentials?.email,
          password: credentials?.password,
        }),
        headers: { "Content-Type": "application/json" },
      });
      const user = await res.json();

      // // If no error and we have user data, return it
      if (res.ok && user) {
        return user;
      }
      // Return null if user data could not be retrieved
      return null;
    },
  }),
  //   GoogleProvider({
  //     clientId: process.env.GOOGLE_ID || "",
  //     clientSecret: process.env.GOOGLE_SECRET || "",
  //   }),
  //   FacebookProvider({
  //     clientId: process.env.FACEBOOK_ID || "",
  //     clientSecret: process.env.FACEBOOK_SECRET || "",
  //   }),
  GithubProvider({
    clientId: process.env.GITHUB_ID || "",
    clientSecret: process.env.GITHUB_SECRET || "",
  }),
];

const handler = NextAuth({
  providers,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
