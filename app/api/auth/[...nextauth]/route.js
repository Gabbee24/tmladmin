// import { User } from "@/models/User";
import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { mongooseConnect } from "@/utils/mongoose";
import clientPromise from "@/utils/mongodb";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    pages: {
        error: "/authen/dashboard/login"
    },
    adapter: MongoDBAdapter(clientPromise)
});

export { handler as GET, handler as POST }