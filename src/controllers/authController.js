const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const createUser = async (req, res) => {
  try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required." });
      }
      if (password.length < 6) {
        return res.status(400).json({ error: "Password must be at least 6 characters long." });
      }
  
      const existingUser = await User.findOne({ email:email });
      if (existingUser) {
        return res.status(409).json({ error: "User already exists." });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const newUser = await User.create({ email, password: hashedPassword });    
  
      return res.status(201).json({
        userId: newUser._id,
        email: newUser.email,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Server error" });
    }
};

const login = async (req, res) => {
    try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    const user = await User.findOne({ email:email });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user.userId }, process.env.JWT_SECRET, { expiresIn: "1h" });

    return res.status(200).json({
      token,
      user: { email: user.email, userId: user._id },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { createUser, login };