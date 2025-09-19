const mongoose = require("mongoose");

const sweetSchema = new mongoose.Schema({
  sweetId: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, default: 0 },
});

module.exports = mongoose.model("Sweet", sweetSchema);
