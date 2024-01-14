import { NextResponse } from "next/server";
import { mongooseConnect } from "@/utils/mongoose";
import { Category } from "@/models/Category";

export const GET =async (request,{params}) => {
    const {id} = params;
    try{
        await mongooseConnect();

        const category = await Category.findById(id);

        return new NextResponse(JSON.stringify(category), {status: 200 });
    } catch (err){
        return new NextResponse('Database Error', {status:500});
    }
};


export const DELETE = async (request,{params}) => {
    const {id} = params;
    try{
        await mongooseConnect();

        await Category.findByIdAndDelete(id);

        return new NextResponse("Category has been deleted", {status: 200 });
    } catch (err){
        return new NextResponse('Database Error', {status:500});
 };
}; 

// export const PUT = async(request) => {
//     const {name, price, description, _id} = await request.json();
//     const updatedCategory = new Category({_id},{name, description, price})
//     try{
//         await mongooseConnect();

//         await updatedCategory.update();

//         return new NextResponse("Category has been created", { status: 201 });
//     } catch (err){
//         return new NextResponse('Database Error', { status: 500 });
//     }
// }