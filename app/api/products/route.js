import { NextResponse } from "next/server";
import { mongooseConnect } from "@/utils/mongoose";
import { Product } from "@/models/Product";

export const GET = async (request) => {
    const url = new URL(request.url)
    const name = url.searchParams.get("name");
    try {
        await mongooseConnect();

        // const products = await Product.find(name && { name });
        const products = await Product.find();

        return new NextResponse(JSON.stringify(products), { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};


export const POST = async (request) => {
    const body = await request.json();
    // const newProduct = new Product(body);
    try {
        await mongooseConnect();

        // await newProduct.save();

        await Product.create(body);

        return new NextResponse("product has been created", { status: 201 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};

export const PUT = async(request) => {
    const {name, price, description, _id} = await request.json();
    // const updatedProduct = new Product({_id},{name, description, price})
    // const updatedProduct = await Product.findByIdAndUpdate({_id},{name,description,price});
    try{
        await mongooseConnect();
        await Product.findByIdAndUpdate({_id},{name,description,price});

        // await updatedProduct.save();

        return new NextResponse("product has been created", { status: 201 });
    } catch (err){
        return new NextResponse('Database Error', { status: 500 });
    }
}