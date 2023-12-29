import { NextResponse } from "next/server";
import { mongooseConnect } from "@/utils/mongoose";
import { Product } from "@/models/Product";

export const GET = async (request) => {
    const url = new URL(request.url)
    const name = url.searchParams.get("name");
    try {
        await mongooseConnect();

        const products = await Product.find(name && { name });

        return new NextResponse(JSON.stringify(products), { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};


export const POST = async (request) => {
    const body = await request.json();
    const newProduct = new Product(body);
    try {
        await mongooseConnect();

        await newProduct.save();

        return new NextResponse("product has been created", { status: 201 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};