import NextAuth from "next-auth";
import { utils } from "ethers";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "MetaMask",
      credentials: {
        address: {
          label: "Address",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        if (!Boolean(utils.getAddress(credentials?.address!))) {
          return null;
        }
        return {
          id: credentials?.address,
        };
      },
    }),
  ],
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXT_AUTH_SECRET,
  session: {
    maxAge: 60 * 60,
  },
  jwt: {
    maxAge: 60 * 60,
  },
  callbacks: {
    async jwt({ token, user, account }) {
      if (account && user) {
        return {
          ...token,
          ...user,
        };
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.sub ?? "";
      return session;
    },
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/",
    newUser: "/",
  },
});
