import express from "express";
import { User } from "./models.js";
import { generateToken } from "./utils.js";

const router = express.Router();

// REGISTER
router.post("/register", async (req, res) => {
  const user = await User.create(req.body);
  res.json(user);
});

// LOGIN
router.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user || user.password !== req.body.password) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  res.json({
    token: generateToken(user._id),
  });
});

export default router;