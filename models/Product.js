import mongoose, { Schema, models, model } from "mongoose";

const ProductSchema = new Schema({
    name:{
        type: String,
        unique: true,
        required: true,
    },
    price:{
        type: Number,
        unique: true,
        required: true,
    },
    description:{
        type: String,
        unique: true,
        required: true,
    },
    images:[{type:String}],
    category:{
        type: mongoose.Types.ObjectId,
        ref: 'Category',
    },
    productProperties:{type:Object},
    // images:{
    //     type: [String],
    // },
},{timestamps: true});

export const Product = models.Product || model("Product",ProductSchema);
