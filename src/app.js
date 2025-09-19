const express = require("express");
const app = express();

app.use(express.json());

app.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;
  return res.status(201).json({
    userId: "mock-id-123",
    email,
  });
});

module.exports = app;
