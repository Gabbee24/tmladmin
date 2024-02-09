// const { Schema } = require("mongoose");
import { Schema, model, models } from "mongoose";

const OrderSchema = new Schema({
    line_items:Object,
    name:String,
    email:String,
    phone:Number,
    address:String,
    city:String,
    state:String,
    code:String,
    country:String,
    paid:Boolean,
}, {
    timestamps: true,
});

export const Order = models?.Order || model('Order', OrderSchema);