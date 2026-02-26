import mongoose, { Schema } from "mongoose";

const reviewSchema = Schema.create({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
  },
});

export const Review = mongoose.model("Review", reviewSchema);
