import express from "express"
import {  readQuits, createQuit, updateQuit, deleteQuit } from "../controllers/quit.controller.js";

const router = express.Router()

router.get('/', readQuits);

router.post('/', createQuit);

router.patch('/:quitID', updateQuit);

router.delete('/:quitID', deleteQuit);

export default router