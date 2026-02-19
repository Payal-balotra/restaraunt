
import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
    user : {
         type: mongoose.Types.ObjectId,
         ref : "User"
    },
    items :[
        {
            menuItem : {
                type : mongoose.Types.ObjectId,
                ref : "Menu"
            },
            quantity : {
                type : Number,

            }

        }
    ]
})
export const Cart = mongoose.model("Cart", cartSchema);
