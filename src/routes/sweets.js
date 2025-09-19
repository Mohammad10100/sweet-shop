const express = require("express");
const Sweet = require("../models/Sweet");
const authMiddleware = require("../middleware/auth");
const { createSweet, getAllSweets, searchSweets, updateSweet } = require("../controllers/sweetsController");
const router = express.Router();

router.post("/", authMiddleware, createSweet);
router.get("/", authMiddleware, getAllSweets);
router.get("/search", authMiddleware, searchSweets);
router.put("/:id", authMiddleware, updateSweet);

module.exports = router;
