import jwt from "jsonwebtoken";
import adminAcount from "../model/admin-acount-model.js";
const JWT_SECRET = "dkskkdsddjdjjd";
const JWT_EXPIRATION_TIME = "1h";

export const generateToken = (userId) => {
  const payload = { userId };
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRATION_TIME });
};

export const veryToken = async (req, res, next) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({
        message: "You are not logged in!",
        success: false,
      });
    }
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded || !decoded.userId) {
      return res.status(403).json({ message: "Token is invalid or expired!" });
    }

    const admin = await adminAcount.findById(decoded.userId).lean();

    if (!admin) {
      return res.status(404).json({ message: "Admin not found!" });
    }
    req.adminId = admin._id;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
