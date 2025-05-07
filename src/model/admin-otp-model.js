import mongoose from "mongoose";

const adminOtpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

adminOtpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const AdminOtp = mongoose.model("AdminOtp", adminOtpSchema);

export default AdminOtp;
