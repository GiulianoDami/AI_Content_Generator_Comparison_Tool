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
    res.status(500).send(err.message);
  }
});

// Get a single tool by name
router.get('/:name', async (req, res) => {
  try {
    const tool = await Tool.findOne({ name: req.params.name });
    if (!tool) return res.status(404).send('Tool not found');
    res.json(tool);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;