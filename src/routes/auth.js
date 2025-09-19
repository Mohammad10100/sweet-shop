const express = require("express");
const router = express.Router();

// temporary in-memory "database" for demo
const users = [{ email: "test@example.com", password: "password123", userId: "mock-id-123" }];


router.post("/register", (req, res) => {
  const { email, password } = req.body;
  return res.status(201).json({
    userId: "mock-id-123",
    email,
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // find user in the mock database
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) return res.status(401).json({ error: "Invalid credentials" });

  return res.status(200).json({
    token: "mock-jwt-token-123",
  });
});


module.exports = router;
