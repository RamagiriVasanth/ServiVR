const express = require('express');
const router = express.Router();
const Service = require('../models/Service');  // Import the model

// GET /api/services - get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error fetching services' });
  }
});

// POST /api/services - add a new service
router.post('/', async (req, res) => {
  const { category, name, description, price } = req.body;

  if (!category || !name) {
    return res.status(400).json({ msg: 'Category and name are required' });
  }

  try {
    const newService = new Service({ category, name, description, price });
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error saving service' });
  }
});

// (Optional) DELETE /api/services/:id - delete a service
router.delete('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ msg: 'Service not found' });

    await service.remove();
    res.json({ msg: 'Service removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error deleting service' });
  }
});

module.exports = router;
