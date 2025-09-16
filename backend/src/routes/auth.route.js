import express from "express";
import {
  signup,
  signin,
  signout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.midleware.js";
const router = express.Router();
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user)
);
export default router;
