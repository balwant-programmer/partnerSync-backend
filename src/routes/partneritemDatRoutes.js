import express from "express";
import {
  deletePartneritem,
  getPartnerAllitempriceFlowCharg,
  getpartneritemData,
  itemAdd,
  updatepartneritem,
} from "../Controller/PartnerItemConteroller.js";
import { veryToken } from "../utils/webToken.js";

const router = express.Router();

router.route("/partner-add-item/:partnerId").post(veryToken, itemAdd);
router.route("/get-item/:partnerId").get(veryToken, getpartneritemData);
router.route("/item-delete/:itemId").delete(veryToken, deletePartneritem);
router.route("/update-item/:itemId").put(veryToken, updatepartneritem);
router
  .route("/get-price-flowchart")
  .get(veryToken, getPartnerAllitempriceFlowCharg);
export default router;
