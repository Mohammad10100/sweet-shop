const express = require("express");
const authRoutes = require("./routes/auth");
const sweetRoutes = require("./routes/sweets");
const app = express();
const cors = require("cors");

app.use(express.json());

const corsOptions = {
  // Allow all origins for development; no restrictions in production
    origin: process.env.CORS_ORIGIN || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};          
app.use(cors(corsOptions));

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

module.exports = app;
