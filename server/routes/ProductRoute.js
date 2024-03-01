import express from "express";
import {
  GetProducts,
  CheckOutProductHandler,
} from "../controllers/ProductHandler.js";

const router = express.Router();

router.get("/", GetProducts);

router.post("/checkout", CheckOutProductHandler);

export default router;
