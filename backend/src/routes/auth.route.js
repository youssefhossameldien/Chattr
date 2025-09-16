import express from "express";
import {
  signup,
  signin,
  signout,
  updateProfile,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.midleware.js";
import { arcjetProtection } from "../middleware/arcjet.middleware.js";
const router = express.Router();
router.use(arcjetProtection); /// should be commented in development , as it blocks postman
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/signout", signout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, (req, res) =>
  res.status(200).json(req.user)
);
export default router;
