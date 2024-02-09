import { NextResponse } from "next/server";
import { mongooseConnect } from "@/utils/mongoose";
import { getServerSession } from "next-auth";
import { Order } from "@/models/Order";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (request) => {
    const session = await getServerSession(authOptions);
    // const url = new URL(request.url)
    // const name = url.searchParams.get("name");
    try {
        if (session) {

            await mongooseConnect();

            // const orders = await Order.find(name && { name });
            const orders = await Order.find().sort({createdAt:-1});

            return new NextResponse(JSON.stringify(orders), { status: 200 });
        } else {
            return new NextResponse('Authentication Error', { status: 500 });
        }
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};