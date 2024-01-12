import multiparty from 'multiparty';
import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3';
import fs  from 'fs';
import mime from 'mime-types';
// import { isAdminRequest } from './auth/[...nextauth]';
import { mongooseConnect } from '@/utils/mongoose';

// const bucketName = 'gabriel-next-ecommerce';
const bucketName = 'gabriel-teaml';

export default async function handle(req,res){
    await mongooseConnect();
    // await isAdminRequest(req,res);

    const form = new multiparty.Form();
    const {fields,files} = await new Promise((resolve,reject) =>{
        form.parse(req,(err, fields, files) =>{
            if(err) reject(err);
            resolve({fields,files});
        });
    })
    console.log('length:',files.file.length);
    // console.log(fields);

    const client = new S3Client({
        region:'us-east-1',
        credentials:{
            accessKeyId: process.env.S3_ACCESS,
            secretAccessKey: process.env.S3_SECRET,
        },
    });
    const links = [];

    for(const file of files.file){
        const ext = file.originalFilename.split('.').pop();
        const newFilename = Date.now() + '.' + ext;
        // console.log({ext,file});
       await client.send(new PutObjectCommand({
            Bucket: bucketName,
            Key: newFilename,
            Body: fs.readFileSync(file.path),
            ACL:"public-read",
            ContentType: mime.lookup(file.path),
        }));
        const link = `https://${bucketName}.s3.amazonaws.com/${newFilename}`;
        links.push(link);
    }
    
    return res.json({links})

    // return promise.then(({fields, files}) => {
    //     res.status(200).json({ fields, files })
    //  })

    // return Promise.then(() => {
    //     res.status(200).json({ links })
    //  })
};

export const config = {
    api: {bodyParser: false}
};