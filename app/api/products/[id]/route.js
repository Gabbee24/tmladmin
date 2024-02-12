import { NextResponse } from "next/server";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/utils/mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

export const GET =async (request,{params}) => {
    const session = await getServerSession(authOptions);
    const {id} = params;
    try{
        // if(session){

            await mongooseConnect();
            
            const product = await Product.findById(id);
            
            return new NextResponse(JSON.stringify(product), {status: 200 });
        // }else {
        //     return new NextResponse('Authentication Error', { status: 500 });
        // }
    } catch (err){
        return new NextResponse('Database Error', {status:500});
    }
};


export const DELETE = async (request,{params}) => {
    const session = await getServerSession(authOptions);
    const {id} = params;
    try{
        if(session){

            await mongooseConnect();
            
            await Product.findByIdAndDelete(id);
            
            return new NextResponse("Product has been deleted", {status: 200 });
        }else{
            return new NextResponse('Authentication Error', { status: 500 });
        }
    } catch (err){
        return new NextResponse('Database Error', {status:500});
 };
}; 

// export const PUT = async(request) => {
//     const {name, price, description, _id} = await request.json();
//     const updatedProduct = new Product({_id},{name, description, price})
//     try{
//         await mongooseConnect();

//         await updatedProduct.update();

//         return new NextResponse("product has been created", { status: 201 });
//     } catch (err){
//         return new NextResponse('Database Error', { status: 500 });
//     }
// }