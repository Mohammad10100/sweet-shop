const Sweet = require("../models/Sweet");

const createSweet = async (req, res) => {
  try {
    const { name, category, price, quantity } = req.body;
    const sweet = new Sweet({ name, category, price, quantity });
    await sweet.save();
    res.status(201).json(sweet);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAllSweets = async (req, res) => {
  try {
    const sweets = await Sweet.find();
    res.status(200).json(sweets);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const searchSweets = async (req, res) => {
  try {
    const { name, category, minPrice, maxPrice } = req.query;
    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" };
    if (category) filter.category = { $regex: category, $options: "i" };
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const sweets = await Sweet.find(filter);
    res.status(200).json(sweets);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

const updateSweet = async (req, res) => {
  try {
    const { id } = req.params;
    const sweet = await Sweet.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!sweet) {
      return res.status(404).json({ error: "Sweet not found" });
    }

    res.status(200).json(sweet);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const deleteSweet = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ error: "Forbidden: Admins only" });
    }

    const sweet = await Sweet.findByIdAndDelete(req.params.id);
    if (!sweet) return res.status(404).json({ error: "Sweet not found" });

    res.status(200).json({ message: "Sweet deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};


const purchaseSweet = async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity <= 0) {
    return res.status(400).json({ error: "Quantity must be greater than 0" });
  }

  try {
    // Atomic update: decrement quantity only if enough stock exists
    const sweet = await Sweet.findOneAndUpdate(
      { _id: id, quantity: { $gte: quantity } },
      { $inc: { quantity: -quantity } },
      { new: true } // return updated document
    );

    if (!sweet) return res.status(400).json({ error: "Insufficient quantity" });

    res.status(200).json({ message: "Purchase successful", sweet });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = { createSweet, getAllSweets, searchSweets, updateSweet, deleteSweet, purchaseSweet };