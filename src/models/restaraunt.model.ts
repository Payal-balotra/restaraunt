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
  },
  images: {
    type: [String],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  address: {
    type: String,
  },
  isActive: {
    type: Boolean,
  },
});

export const Restaraunt = mongoose.model("Restaraunt", restarauntSchema);
