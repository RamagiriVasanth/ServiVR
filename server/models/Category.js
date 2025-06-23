const mongoose = require('mongoose');

const SubcategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: false },  // optional icon
});

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: false },
  subcategories: { type: [SubcategorySchema], default: [] },
});

module.exports = mongoose.model('Category', CategorySchema);
