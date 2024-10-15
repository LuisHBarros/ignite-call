import NextAuth, { NextAuthOptions } from "next-auth";
import Google from "next-auth/providers/google";
export const authOptions: NextAuthOptions = {
  providers: [
    Google({
      clientId: process.env.CLIENT_GOOGLE_ID ?? "",
      clientSecret: process.env.CLIENT_GOOGLE_SECRET ?? "",
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/userinfo.profile",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (
        !account?.scope?.includes("https://www.googleapis.com/auth/calendar")
      ) {
        return "/register/connect-calendar/?error=permissions";
      }
      return true;
    },
  },
};

export default NextAuth(authOptions);
