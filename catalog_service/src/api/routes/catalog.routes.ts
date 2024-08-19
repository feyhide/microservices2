import express from "express";
import { product } from "../controller/catalog.controller.js";

const router = express.Router()

//endpoints
router.post("/product",product)

export default router