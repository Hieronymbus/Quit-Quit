import express from "express";
import { createRegister, createLogin, createLogout, readUser, updateUser, deleteUser} from "../controllers/user.controller.js";
import { authCookieMiddleware } from "../server.js";
const router = express.Router();

router.post("/register", createRegister);
router.post("/login", createLogin);
router.post('/logout', createLogout);
router.get("/", authCookieMiddleware, readUser);
router.put("/:id", authCookieMiddleware , updateUser );
router.delete("/:id", authCookieMiddleware , deleteUser);

export default router;