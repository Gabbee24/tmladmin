import mongoose, { Schema, models, model } from "mongoose";

const CategorySchema = new Schema({
    categoryName:{
        type: String,
        unique: true,
        required: true,
    },
},{timestamps: true});

export const Category = models?.Category || model("Category",CategorySchema);
