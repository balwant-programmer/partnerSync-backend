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

router.route("/send-otp").post(sendAdminOtp);
router.route("/verify-otp").post(verifyAdminOtp);
router.route("/get-admin").get(veryToken, getAdmin);
router.route("/name-admin-change").put(veryToken, adminNameChange);
router.route("/logout").put(veryToken, adminLogout);

export default router;
