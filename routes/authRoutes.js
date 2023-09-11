import express from "express";
import { registerRules, ValidateRegister, loginRules, ValidateLogin } from "../imports.js"; // middleware
import { HandleRegister, HandleLogin, HandleLogout } from "../imports.js";
const router = express.Router();

router.post("/login", loginRules, ValidateLogin, HandleLogin);

router.post("/register", registerRules, ValidateRegister, HandleRegister);

router.post("/logout", HandleLogout);

export default router;
