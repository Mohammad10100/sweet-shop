const express = require("express");
const authRoutes = require("./routes/auth");
const sweetRoutes = require("./routes/sweets");
const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/sweets", sweetRoutes);

module.exports = app;
