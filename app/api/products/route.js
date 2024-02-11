import { NextResponse } from "next/server";
import { mongooseConnect } from "@/utils/mongoose";
import { Product } from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export const GET = async (request) => {
    const session = await getServerSession(authOptions);
    // const url = new URL(request.url)
    // const name = url.searchParams.get("name");
    try {
        if (session) {

            await mongooseConnect();

            // const products = await Product.find(name && { name });
            const products = await Product.find();

            return new NextResponse(JSON.stringify(products), { status: 200 });
        } else {
            return new NextResponse('Authentication Error', { status: 500 });
        }
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};


export const POST = async (request) => {
    const session = await getServerSession(authOptions);
    const body = await request.json();
    // const newProduct = new Product(body);
    try {
        if (session) {

            await mongooseConnect();

            // await newProduct.save();

            await Product.create(body);

            return new NextResponse("product has been created", { status: 201 });
        } else {
            return new NextResponse('Authentication Error', { status: 500 });
        }
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};

export const PUT = async (request) => {
    const session = await getServerSession(authOptions);
    const { name, price, description, quantity, images, priceDrop, category, productProperties, _id } = await request.json();
    // const updatedProduct = new Product({_id},{name, description, price})
    // const updatedProduct = await Product.findByIdAndUpdate({_id},{name,description,price});
    try {
        if (session) {

            await mongooseConnect();
            await Product.findByIdAndUpdate({ _id }, { name, description, price, quantity, images, priceDrop, category, productProperties });

            // await updatedProduct.save();

            return new NextResponse("product has been created", { status: 201 });
        } else {
            return new NextResponse('Authentication Error', { status: 500 });
        }
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
}