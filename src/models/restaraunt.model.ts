import mongoose from "mongoose";

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  cuisine: {
    type: String,
    required: true,
  },
  images: {
    type: [String],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    immuatble: true,
    required: true,
  },
  address: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: false,
  },
});

restaurantSchema.index({ name: "text", description: "text", cuisine: "text" });

export const Restaraunt = mongoose.model("Restaraunt", restaurantSchema);
