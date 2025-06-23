const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// GET /api/categories - fetch all categories
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error fetching categories' });
  }
});

// POST /api/categories - add a new category (optional)
router.post('/', async (req, res) => {
  const { name, icon, subcategories } = req.body;
  if (!name) return res.status(400).json({ msg: 'Name is required' });

  try {
    const newCategory = new Category({ name, icon, subcategories });
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error saving category' });
  }
});

module.exports = router;
