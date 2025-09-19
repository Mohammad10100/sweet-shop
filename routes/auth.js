const express = require("express");
const router = express.Router();

router.post("/register", (req, res) => {
  const { email, password } = req.body;
  return res.status(201).json({
    userId: "mock-id-123",
    email,
  });
});

module.exports = router;
