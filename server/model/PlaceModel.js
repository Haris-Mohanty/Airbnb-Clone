import mongoose from "mongoose";

const placeSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: User,
    },
    title: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    photos: [
      {
        type: String,
        required: true,
      },
    ],
    description: {
      type: String,
      required: true,
    },
    perks: [
      {
        type: String,
        required: true,
      },
    ],
    extraInfo: {
      type: String,
      required: true,
    },
    checkIn: {
      type: Number,
      required: true,
    },
    checkOut: {
      type: Number,
      required: true,
    },
    maxGuests: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Place", placeSchema);
