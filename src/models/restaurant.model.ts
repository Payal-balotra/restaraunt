import mongoose from "mongoose";

// interface IRestaurant {
//   name : string,
//   description : string,
//   cuisine : string,
//   images : string[],
//   owner : Types.ObjectId,
//   address : string,
//   isActive : boolean

// }
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
  capacity: {
    type: Number,
    default: 15,
  },
});

restaurantSchema.index({ name: "text", description: "text", cuisine: "text" });

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
