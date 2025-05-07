import Portner from "../model/portner-Model.js";
import cloudinaryUploadImage from "../utils/Cloodinary.js";
export const partnerCreate = async (req, res) => {
  try {
    const { name, email } = req.body;
    const adminId = req.adminId;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }
    const existing = await Portner.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const newPortner = await Portner.create({ name, email, adminId });
    return res.status(201).json({
      message: "Portner created successfully",
      portner: newPortner,
    });
  } catch (error) {
    console.error("Error creating portner:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getPartner = async (req, res) => {
  try {
    const adminId = req.adminId;
    const partners = await Portner.find({ adminId: adminId });
    return res.status(200).json({ success: true, data: partners });
  } catch (error) {
    console.error("Error fetching partners:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};
export const pertnerDelete = async (req, res) => {
  try {
    const pertnerId = req.params;
    const detData = await Portner.deleteOne({ _id: pertnerId.partnerId });
    if (detData.deletedCount === 1) {
      return res
        .status(200)
        .json({ success: true, message: "Deleted Success ! partner " });
    }
  } catch (error) {
    console.error("Error fetching partners:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const pertnerUpdate = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const { email, name } = req.body;
    const file = req.file;
    let updateData = { email, name };

    if (file) {
      const uploadResult = await cloudinaryUploadImage(file.buffer);
      updateData.partnerLogo = uploadResult.secure_url;
    }
    const updatedPartner = await Portner.findByIdAndUpdate(
      partnerId,
      updateData,
      { new: true }
    );

    if (!updatedPartner) {
      return res
        .status(404)
        .json({ success: false, message: "Partner not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Partner updated successfully",
      data: updatedPartner,
    });
  } catch (error) {
    console.error("Error updating partner:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error", error });
  }
};
