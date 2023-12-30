import { NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/utils/mongoose";

export const GET =async (request,{params}) => {
    const {id} = params;
    try{
        await mongooseConnect();

        const product = await Product.findById(id);

        return new NextResponse(JSON.stringify(product), {status: 200 });
    } catch (err){
        return new NextResponse('Database Error', {status:500});
    }
};


export const DELETE = async (request,{params}) => {
    const {id} = params;
    try{
        await mongooseConnect();

        await Product.findByIdAndDelete(id);

        return new NextResponse("Product has been deleted", {status: 200 });
    } catch (err){
        return new NextResponse('Database Error', {status:500});
    }
}; 