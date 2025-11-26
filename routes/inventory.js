const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/Inventory');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const inventoryValidator = require('../validators/inventoryValidator');
const inventoryController = require('../controllers/inventoryController');

// Create inventory item
router.post('/', authenticate, authorize(['STORE_MANAGER', 'ADMIN']), validate(inventoryValidator), inventoryController.create);

// Get inventory items
router.get('/', authenticate, authorize(['STAFF','STORE_MANAGER', 'ADMIN']), inventoryController.getAll );


// Get one inventory item by ID
router.get('/:id', authenticate, inventoryController.getOne);


// Update inventory item by ID
router.put('/:id', authenticate, authorize(['STORE_MANAGER','ADMIN']), inventoryController.update);

// Delete inventory item by ID
router.delete('/:id', authenticate, authorize(['ADMIN']), inventoryController.delete);


module.exports = router;
