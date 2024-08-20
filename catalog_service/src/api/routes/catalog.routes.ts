import express from "express";
import { product } from "../controller/catalog.controller";

const router = express.Router()

//endpoints
router.post("/product",product)

export default router