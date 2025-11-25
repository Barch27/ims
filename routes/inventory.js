const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/Inventory');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const inventoryValidator = require('../validators/inventoryValidator');

// Create inventory item
router.post('/', authenticate, authorize(['STORE_MANAGER', 'ADMIN']), validate(inventoryValidator), authorize(['ADMIN','STORE_MANAGER']), async (req, res) => {
  const user = req.user;
  const total = req.body.quantityTotal ?? 0;

  const item = new InventoryItem({
    ...req.body,
    quantityTotal: total,
    quantityInStore: total,
    quantityInUse: 0,
    createdByUserId: user.id
  });

  await item.save();
  res.status(201).json(item);
});

// Get inventory items
router.get('/', authenticate, authorize(['STAFF','STORE_MANAGER', 'ADMIN']), async (req, res) => {
  const items = await InventoryItem.find();
  res.json(items);
});


// Get one inventory item by ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    const item = await InventoryItem.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Update inventory item by ID
router.put('/:id', authenticate, authorize(['STORE_MANAGER','ADMIN']), async (req, res) => {
  try {
    const { name, quantity } = req.body;

    // Find and update
    const item = await InventoryItem.findByIdAndUpdate(
      req.params.id,
      { name, quantity, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete inventory item by ID
router.delete('/:id', authenticate, authorize(['ADMIN']), async (req, res) => {
  try {
    const item = await InventoryItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully', item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
