import mongoose from "mongoose";
const portnerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    partnerLogo: {
      type: String,
      default: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    },
    adminId: {
      type: mongoose.Types.ObjectId,
      ref: "AdmiacountCreation",
    },
  },
  {
    timestamps: true,
  }
);

const Portner = mongoose.model("Partner", portnerSchema);

export default Portner;
