import express from 'express'
import { readAddictions } from '../controllers/addiction.controller.js';
const router = express.Router()

router.post("/", async (req, res) => {

});
router.get("/", readAddictions);
router.patch("/:addictionID", async (req, res) => {

});
router.delete("/:addictionID", async (req, res) => {

});

export default router