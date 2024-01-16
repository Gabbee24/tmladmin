import { NextResponse } from "next/server";
import { mongooseConnect } from "@/utils/mongoose";
import { Category } from "@/models/Category";

export const GET = async (request) => {
    // const url = new URL(request.url)
    // const name = url.searchParams.get("name");
    try {
        await mongooseConnect();

        // const Categories = await Category.find(name && { name });
        const Categories = await Category.find().populate("parentCategory");

        return new NextResponse(JSON.stringify(Categories), { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};

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
        
        return new NextResponse("Category has been created", { status: 201 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};

export const PUT = async(request) => {
    const {categoryName, parentCategory,properties, _id} = await request.json();
    // const updatedProduct = new Product({_id},{name, description, price})
    // const updatedProduct = await Product.findByIdAndUpdate({_id},{name,description,price});
    try{
        await mongooseConnect();
        await Category.findByIdAndUpdate({_id},{categoryName, parentCategory,properties});

        // await updatedProduct.save();

        return new NextResponse("Category has been created", { status: 201 });
    } catch (err){
        return new NextResponse('Database Error', { status: 500 });
    }
}