import { NextResponse } from "next/server";
import { mongooseConnect } from "@/utils/mongoose";
import { Category } from "@/models/Category";

export const POST = async (request) => {
    console.log('first section')
    const body = await request.json();
    const newCategory = new Category(body);
    console.log('passed new category section')
    try {
        await mongooseConnect();
        console.log('passed new mongoConnect section')
        
        await newCategory.save();
        console.log('passed new save Category section')
        
        return new NextResponse("Post has been created", { status: 201 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};