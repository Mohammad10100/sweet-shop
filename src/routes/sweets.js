const express = require("express");
const Sweet = require("../models/Sweet");
const authMiddleware = require("../middleware/auth");
const { createSweet, getAllSweets, searchSweets } = require("../controllers/sweetsController");
const router = express.Router();

router.post("/", authMiddleware, createSweet);
router.get("/", authMiddleware, getAllSweets);
router.get("/search", authMiddleware, searchSweets);

module.exports = router;
