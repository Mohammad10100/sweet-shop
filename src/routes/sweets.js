const express = require("express");
const Sweet = require("../models/Sweet");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// POST /api/sweets
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    const sweet = new Sweet({ name, category, price, quantity });
    await sweet.save();
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET /api/sweets
router.get("/", authMiddleware, async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
}); 

module.exports = router;
