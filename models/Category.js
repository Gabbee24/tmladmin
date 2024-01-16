import mongoose, { Schema, models, model } from "mongoose";

const CategorySchema = new Schema({
    categoryName:{
        type: String,
        unique: true,
        required: true,
    },
    parentCategory:{
        type:mongoose.Types.ObjectId, ref:"Category"
    },
    properties:[{type:Object}],
},{timestamps: true});

export const Category = models?.Category || model("Category",CategorySchema);
