import uuid from "uuid";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Ethereum",
      credentials: {
        message: {
          label: "Message",
          type: "text",
          placeholder: "0x0",
        },
        signature: {
          label: "Signature",
          type: "text",
          placeholder: "0x0",
        },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const aa = uuid.v1();

        return {
          id: new Date().getTime(),
          token: aa,
          // loginType: credentials?.loginType,
        };
      },
    }),
  ],
  secret: "TEST_AUTH",
  debug: process.env.NODE_ENV === "development",
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
      if (session && session.user) {
        session = {
          ...session,
          user: { ...session.user, ...token },
        };
        return session;
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
});
