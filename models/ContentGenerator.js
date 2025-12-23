const mongoose = require('mongoose');

const contentGeneratorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  features: [String],
  pros: [String],
  cons: [String],
  pricing: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  category: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('ContentGenerator', contentGeneratorSchema);