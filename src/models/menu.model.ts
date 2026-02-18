import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaraunt",
    required: true,
  },
  isAvailable: {
    type: Boolean,
    required: true,
  },
});

export const Menu = mongoose.model("Menu", userSchema);
