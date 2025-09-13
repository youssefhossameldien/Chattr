import express from "express";
const router = express.Router();
router.get("/signup", (req, res) => {
  res.send("Signup endpoint");
});
router.get("/signin", (req, res) => {
  res.send("Signin endpoint");
});
router.get("/signout", (req, res) => {
  res.send("Signout endpoint");
});
export default router;
