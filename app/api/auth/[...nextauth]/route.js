// import { User } from "@/models/User";
import NextAuth, { getServerSession } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/utils/mongodb";

const adminEmails = ["oluwaseunprosper615@gmail.com"];

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET,
        }),
    ],
    pages: {
        error: "/"
    },
    adapter: MongoDBAdapter(clientPromise),
    callbacks:{
        async session({session,user, token}) {
            // const adminEmails = ["oluwaseunprosper615@gmail.com"];

            if(adminEmails.includes(session?.user.email)){
                return session;
            } else {
                return false;
            }
        },
    },
}

const handler = NextAuth(authOptions);

export async function isAdminRequest(request,NextResponse){
    const session = await getServerSession(request,response,authOptions);
    if(!adminEmails.includes(session?.user?.email)){
        throw 'not an admin'
    }
}

export { handler as GET, handler as POST }