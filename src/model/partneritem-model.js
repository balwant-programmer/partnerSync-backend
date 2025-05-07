import mongoose from "mongoose";

const partnerItemSchema = new mongoose.Schema(
  {
    price: {
      type: Number,
      required: true,
    },
    item: {
      type: String,
      required: true,
    },
    partnerId: {
      type: mongoose.Types.ObjectId,
      ref: "Partner",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const PartnerItem = mongoose.model("PartnerItem", partnerItemSchema);

export default PartnerItem;
