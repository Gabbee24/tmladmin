import { NextResponse } from "next/server";
import { mongooseConnect } from "@/utils/mongoose";
import { Category } from "@/models/Category";
import { getServerSession } from "next-auth";
import { authOptions, isAdminRequest } from "../auth/[...nextauth]/route";
import { getSession } from "next-auth/react";


export const GET = async (request) => {
    // const url = new URL(request.url)
    // const name = url.searchParams.get("name");
    const session = await getServerSession(authOptions);
    try {
        if(session){
            
            await mongooseConnect();
            // await isAdminRequest(request,response);
            // await getServerSession(request,NextResponse,authOptions);
            // await getSession(authOptions);
            
            // const Categories = await Category.find(name && { name });
            const Categories = await Category.find().populate("parentCategory");
            
            return new NextResponse(JSON.stringify(Categories), { status: 200 });
        } else {
            return new NextResponse('Authentication Error', { status: 500 });
        }
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};

export const POST = async (request) => {
    const session = await getServerSession(authOptions);
    console.log('first section')
    const body = await request.json();
    const newCategory = new Category(body);
    console.log('passed new category section')
    try {
        if(session){

            await mongooseConnect();
            console.log('passed new mongoConnect section')
            
            await newCategory.save();
            console.log('passed new save Category section')
            
            return new NextResponse("Category has been created", { status: 201 });
        }else{
            return new NextResponse('Authentication Error', { status: 500 });
        }
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};

export const PUT = async (request) => {
    const session = await getServerSession(authOptions);
    const { categoryName, parentCategory, properties, _id } = await request.json();
    // const updatedProduct = new Product({_id},{name, description, price})
    // const updatedProduct = await Product.findByIdAndUpdate({_id},{name,description,price});
    try {
        if(session){

            await mongooseConnect();
            await Category.findByIdAndUpdate({ _id }, { categoryName, parentCategory, properties });
            
            // await updatedProduct.save();
            
            return new NextResponse("Category has been created", { status: 201 });
        }else{
            return new NextResponse('Authentication Error', { status: 500 });
        }
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
}