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
  rating: Number,
  category: String
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

// Create one tool
router.post('/', async (req, res) => {
  const tool = new Tool({
    name: req.body.name,
    description: req.body.description,
    features: req.body.features,
    pros: req.body.pros,
    cons: req.body.cons,
    pricing: req.body.pricing,
    rating: req.body.rating,
    category: req.body.category
  });

  try {
    const newTool = await tool.save();
    res.status(201).json(newTool);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update one tool
router.patch('/:id', getTool, async (req, res) => {
  if (req.body.name != null) {
    res.tool.name = req.body.name;
  }
  if (req.body.description != null) {
    res.tool.description = req.body.description;
  }
  if (req.body.features != null) {
    res.tool.features = req.body.features;
  }
  if (req.body.pros != null) {
    res.tool.pros = req.body.pros;
  }
  if (req.body.cons != null) {
    res.tool.cons = req.body.cons;
  }
  if (req.body.pricing != null) {
    res.tool.pricing = req.body.pricing;
  }
  if (req.body.rating != null) {
    res.tool.rating = req.body.rating;
  }
  if (req.body.category != null) {
    res.tool.category = req.body.category;
  }

  try {
    const updatedTool = await res.tool.save();
    res.json(updatedTool);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete one tool
router.delete('/:id', getTool, async (req, res) => {
  try {
    await res.tool.remove();
    res.json({ message: 'Deleted Tool' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

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