import express from 'express'
import { readAddictions } from '../controllers/addiction.controller.js';
const router = express.Router()

router.post("/", async (req, res) => {

});
router.get("/api/addiction", readAddictions);
router.patch("/api/addiction/:addictionID", async (req, res) => {

});
router.delete("/api/addiction/:addictionID", async (req, res) => {

});

export default router