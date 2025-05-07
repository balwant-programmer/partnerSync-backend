import adminAcount from "../model/admin-acount-model.js";
import AdminOtp from "../model/admin-otp-model.js";
import sendEmail from "../utils/sendEmail.js";
import { generateToken } from "../utils/webToken.js";

export const sendAdminOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const expiresAt = new Date(Date.now() + 60 * 1000);

  try {
    await AdminOtp.deleteMany({ email });

    await AdminOtp.create({ email, otp, expiresAt });

    await sendEmail(
      email,
      "Your OTP for Admin Account",
      `Your OTP is ${otp}. It will expire in 1 minute.`
    );

    return res.status(200).json({ message: "OTP sent successfully!" });
  } catch (err) {
    console.error("Error sending OTP:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verifyAdminOtp = async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }
  try {
    const record = await AdminOtp.findOne({ email });
    if (!record) {
      return res.status(400).json({ message: "No OTP found for this email" });
    }
    if (parseInt(record.otp) === parseInt(otp)) {
      await AdminOtp.deleteOne({ email });

      const record = await adminAcount.findOne({ email });
      if (record) {
        const token = generateToken(record._id);
        res.cookie("token", token, {
          httOnly: true,
          secure: process.env.NODE_ENV === "production",
          samesite: "none",
          maxAge: 2 * 60 * 60 * 1000,
        });
      } else {
        const name = email.split("@")[0];
        const createAdmin = new adminAcount({
          email,
          name,
        });
        await createAdmin.save();
        const token = generateToken(createAdmin._id);
        res.cookie("token", token, {
          httOnly: true,
          secure: true,
          samesite: "none",
          maxAge: 2 * 60 * 60 * 1000,
        });
        return res
          .status(200)
          .json({ message: "Account Created Successfully !", success: true });
      }
      return res.status(200).json({ message: "OTP verified successfully!" });
    } else {
      return res.status(500).json({ message: "Invalid Otp!" });
    }
  } catch (err) {
    console.error("OTP verification error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAdmin = async (req, res) => {
  try {
    const adminId = req.adminId;
    const admin = await adminAcount.findOne({ _id: adminId }).lean();
    if (!admin) {
      return res
        .status(404)
        .json({ message: "not Found Admin !", success: false });
    }

    return res.status(200).json({ message: "admin Info", admin });
  } catch (err) {
    console.error("OTP verification error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminNameChange = async (req, res) => {
  try {
    const adminId = req.adminId;

    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const admin = await adminAcount.findOne({ _id: adminId });
    if (!name) {
      return res.status(400).json({ message: "admin not Login" });
    }
    admin.name = name;
    await admin.save();
    return res.status(200).json({ message: "Name updated successfully" });
  } catch (error) {
    console.error("Error updating admin name:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const adminLogout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httOnly: true,
      secure: true,
      samesite: "none",
    });

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
