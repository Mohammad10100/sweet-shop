const express = require("express");
const Sweet = require("../models/Sweet");
const { authMiddleware, isAdmin } = require("../middleware/auth");
const { createSweet, getAllSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet, restockSweet } = require("../controllers/sweetsController");
const router = express.Router();

router.post("/", authMiddleware, createSweet);
router.get("/", authMiddleware, getAllSweets);
router.get("/search", authMiddleware, searchSweets);
router.put("/:id", authMiddleware, updateSweet);
router.delete("/:id", authMiddleware, isAdmin, deleteSweet);
router.post("/:id/purchase", authMiddleware, purchaseSweet);
router.post("/:id/restock", authMiddleware, isAdmin, restockSweet);

module.exports = router;
