import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: String,
  },
  category: {
    type: String,
  },
  image: {
    type: String,

  },
  restaurant: {
    type: mongoose.Types.ObjectId,
    ref: "Restaraunt",
  },
  isAvailable: {
    type: Boolean,
  },
});

export const User = mongoose.model("User", userSchema);
