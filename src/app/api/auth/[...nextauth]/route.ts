// src/app/api/auth/[...nextauth]/route.ts
import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                // HARDCODED ADMIN CREDENTIALS for assignment demonstration purposes
                if (
                    credentials?.username === "admin" &&
                    credentials?.password === "nrl2025" // Admin username: admin, Password: nrl2025
                ) {
                    return { id: "1", name: "Admin User", email: "admin@nrlblog.com" };
                } else {
                    return null; // Login failed
                }
            }
        })
    ],
    pages: {
        signIn: '/admin/login', // Redirects unauthenticated users to the custom login page
        error: '/admin/login',
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };