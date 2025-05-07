import express from "express";
import {
  getPartner,
  partnerCreate,
  pertnerDelete,
  pertnerUpdate,
} from "../Controller/RoomprtnerMebercontroller.js";
import { veryToken } from "../utils/webToken.js";
import { upload } from "../utils/multer.js";
const router = express.Router();

router.route("/create-account").post(veryToken, partnerCreate);
router.route("/get-partner").get(veryToken, getPartner);
router.route("/delete-partner/:partnerId").delete(veryToken, pertnerDelete);
router
  .route("/update-partner/:partnerId")
  .put(veryToken, upload.single("partnerlogo"), pertnerUpdate);
export default router;
