import PartnerItem from "../model/partneritem-model.js";
import { sendItemAddedEmail } from "../utils/sendItemAddedEmail.js";

export const itemAdd = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const { item, price } = req.body;
    if (!partnerId || !item || !price) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newItem = new PartnerItem({
      partnerId,
      item,
      price,
    });

    const savedItem = await newItem.save();
    const partner = await PartnerItem.findOne({
      partnerId: newItem.partnerId,
    }).populate("partnerId");
    if (partner?.partnerId?.email) {
      await sendItemAddedEmail({
        to: partner.partnerId.email,
        item: savedItem.item,
        price: savedItem.price,
        name: partner.partnerId.name,
        partnerId: partner.partnerId._id,
      });
    }
    res.status(201).json({
      message: "Item added and email sent successfully",
      data: savedItem,
    });
  } catch (error) {
    console.error("Error adding item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// --fetch user item Data.....

export const getpartneritemData = async (req, res) => {
  try {
    const { partnerId } = req.params;

    const items = await PartnerItem.find({ partnerId });
    res.status(200).json(items);
  } catch (error) {
    console.error("Error getting partner items:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deletePartneritem = async (req, res) => {
  try {
    const { itemId } = req.params;
    console.log("itemId");

    const result = await PartnerItem.deleteOne({ _id: itemId });

    if (result.deletedCount === 1) {
      res.status(200).json({ message: "Deleted successfully!", success: true });
    } else {
      res.status(404).json({ message: "Item not found", success: false });
    }
  } catch (error) {
    console.error("Error deleting partner item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updatepartneritem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { item, price } = req.body;

    if (!item || !price) {
      return res.status(400).json({ message: "Item and price are required." });
    }

    const updatedItem = await PartnerItem.findByIdAndUpdate(
      itemId,
      { item, price },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found." });
    }
    res
      .status(200)
      .json({ message: "Item updated successfully", item: updatedItem });
  } catch (error) {
    console.error("Error updating partner item:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getPartnerAllitempriceFlowCharg = async (req, res) => {
  try {
    const finditem = await PartnerItem.find({}).select("price").populate({
      path: "partnerId",
      select: "name",
    });
    const data = finditem.map(({ price, partnerId }) => {
      return { total: `${price}`, name: partnerId.name };
    });
    return res
      .status(200)
      .json({ message: "fetch success !", success: true, data });
  } catch (error) {
    console.error("Error server partner item:", error);
    res.status(500).json({ message: "Server error" });
  }
};
