// import { NextResponse } from "next/server";
// import { mongooseConnect } from "@/utils/mongoose";
// import { Post } from "@/models/Post";

// export const GET = async (request) => {
//     const url = new URL(request.url)
//     const username = url.searchParams.get("username");
//     try {
//         await mongooseConnect();

//         const posts = await Post.find(username && { username });

//         return new NextResponse(JSON.stringify(posts), { status: 200 });
//     } catch (err) {
//         return new NextResponse('Database Error', { status: 500 });
//     }
// };


// export const POST = async (request) => {
//     const body = await request.json();
//     const newPost = new Post(body);
//     try {
//         await mongooseConnect();

//         await newPost.save();

//         return new NextResponse("Post has been created", { status: 201 });
//     } catch (err) {
//         return new NextResponse('Database Error', { status: 500 });
//     }
// };


import { NextResponse } from "next/server";
import multiparty from 'multiparty';
import { mongooseConnect } from "@/utils/mongoose";
import { Product } from "@/models/Product";
// import { resolve } from "styled-jsx/css";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from 'fs';
import mime from 'mime-types';

const bucketName = 'gabriel-teaml';

export const POST = async (request) => {
    await mongooseConnect();

    const body = await request.json();
    
    // const formData = await request.formData();

    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(request, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });

    console.log('length:', files.file.length);

    const client = new S3Client({
        region: 'us-east-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS,
            secretAccessKey: process.env.S3_SECRET,
        },
    });

    const links = [];

    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop();
        const newFilename = Date.now() + '.' + ext;
        await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFilename,
            Body: fs.readFileSync(file.path), 
            ACL: 'public-read',
            ContentType: mime.lookup(file.path),
        }));
        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
        links.push(link);
    }

    // return new NextResponse("image has been created", { status: 201 });
    return new NextResponse(JSON.stringify({links}), { status: 200 });
   

};

export const config1 = {
    api: { bodyParser: false }
};