const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Tool = mongoose.model('Tool', new mongoose.Schema({
  name: String,
  description: String,
  features: [String],
  pros: [String],
  cons: [String],
  pricing: String,
  rating: Number
}));

// Get all tools
router.get('/', async (req, res) => {
  try {
    const tools = await Tool.find().sort({ rating: -1 });
    res.json(tools);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one tool
router.get('/:id', getTool, (req, res) => {
  res.json(res.tool);
});

// Middleware to get a tool by ID
async function getTool(req, res, next) {
  let tool;
  try {
    tool = await Tool.findById(req.params.id);
    if (tool == null) {
      return res.status(404).json({ message: 'Cannot find tool' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.tool = tool;
  next();
}

module.exports = router;