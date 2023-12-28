import { NextResponse } from "next/server";
import { mongooseConnect } from "@/utils/mongoose";
import { Post } from "@/models/Post";

export const GET = async (request) => {
    const url = new URL(request.url)
    const username = url.searchParams.get("username");
    try {
        await mongooseConnect();

        const posts = await Post.find(username && { username });

        return new NextResponse(JSON.stringify(posts), { status: 200 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};


export const POST = async (request) => {
    const body = await request.json();
    const newPost = new Post(body);
    try {
        await mongooseConnect();

        await newPost.save();

        return new NextResponse("Post has been created", { status: 201 });
    } catch (err) {
        return new NextResponse('Database Error', { status: 500 });
    }
};