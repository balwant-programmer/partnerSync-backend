import mongoose from "mongoose";

const adminAccountCreationSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    adminLogo: {
      type: String,
      default: "https://i.pravatar.cc/150?img=12",
    },
  },
  {
    strict: true,
    timestamps: true,
  }
);

const adminAcount = mongoose.model(
  "AdmiacountCreation",
  adminAccountCreationSchema
);

export default adminAcount;
