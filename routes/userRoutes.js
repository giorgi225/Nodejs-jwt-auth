import express from "express";
import { authenticate } from "../imports.js";

const router = express.Router();

router.get("/", authenticate, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

export default router;
