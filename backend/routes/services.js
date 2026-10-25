const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');

// GET all active services (public - for users)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    console.error('Get services error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// GET all services (admin)
router.get('/all', auth, async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });
    res.json(services);
  } catch (err) {
    console.error('Get all services error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// POST add new service (admin)
router.post('/', auth, async (req, res) => {
  try {
    console.log('Adding service:', req.body.name);
    const { name, description, price, duration, category, image, isActive } = req.body;

    if (!name || !price) {
      return res.status(400).json({ message: 'Name and price are required' });
    }

    const service = new Service({
      name:        name.trim(),
      description: description || '',
      price:       Number(price),
      duration:    duration || '',
      category:    category || '',
      image:       image || '',
      isActive:    isActive !== undefined ? isActive : true
    });

    await service.save();
    console.log('✅ Service added:', service.name);
    res.status(201).json(service);
  } catch (err) {
    console.error('Add service error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// PUT update service (admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!service) return res.status(404).json({ message: 'Service not found' });
    console.log('✅ Service updated:', service.name);
    res.json(service);
  } catch (err) {
    console.error('Update service error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

// DELETE service (admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });
    console.log('✅ Service deleted:', service.name);
    res.json({ message: 'Service deleted successfully' });
  } catch (err) {
    console.error('Delete service error:', err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;