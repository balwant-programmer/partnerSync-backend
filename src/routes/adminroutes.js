import express from "express";

import {
  adminLogout,
  adminNameChange,
  getAdmin,
  sendAdminOtp,
  verifyAdminOtp,
} from "../Controller/adminController.js";
import { veryToken } from "../utils/webToken.js";

const router = express.Router();

// @route   POST /api/admin/send-otp
// @desc    Send OTP to admin email
router.route("/send-otp").post(sendAdminOtp);
router.route("/verify-otp").post(verifyAdminOtp);
router.route("/get-admin").get(veryToken, getAdmin);
router.route("/name-admin-change").put(veryToken, adminNameChange);
router.route("/logout").put(veryToken, adminLogout);

// You can add more admin-related routes here:
// e.g., verify OTP, create admin, login, etc.

// router.post("/verify-otp", verifyAdminOtp);
// router.post("/register", createAdmin);
// router.post("/login", loginAdmin);

export default router;
