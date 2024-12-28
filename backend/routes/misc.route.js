import express from "express";
import { createQuote } from "../controllers/misc.controller.js";

const router = express.Router();

router.get("/quote", createQuote)

export default router