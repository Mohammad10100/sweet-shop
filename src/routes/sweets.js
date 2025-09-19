const express = require("express");
const Sweet = require("../models/Sweet");
const auth = require("../middleware/auth");

const router = express.Router();

// POST /api/sweets
router.post("/", auth, async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    const sweet = new Sweet({ name, category, price, quantity });
    await sweet.save();
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
