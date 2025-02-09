import { Schema, Types, model } from "mongoose";

const ItemSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: Types.ObjectId,
        ref: "Category",
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true
    }
});

const Item = model("Item", ItemSchema); 
export default Item;