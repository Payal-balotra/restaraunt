import mongoose from "mongoose";

const restarauntSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  cuisine: {
    type: String,
    required : true
  },
  images: {
    type: [String],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    immuatble : true,
    required : true
  },
  address: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default : false
  },
});

export const Restaraunt = mongoose.model("Restaraunt", restarauntSchema);
