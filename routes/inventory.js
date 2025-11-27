const express = require('express');
const router = express.Router();
const InventoryItem = require('../models/Inventory');
const { authenticate, authorize } = require('../middleware/auth');
const validate = require('../middleware/validate');
const inventoryValidator = require('../validators/inventoryValidator');
const inventoryController = require('../controllers/inventoryController');


// search inventory item by 
router.get('/search', 
    authenticate, 
    authorize(['STAFF','STORE_MANAGER','ADMIN']), 
    inventoryController.search);

// Get inventory items
router.get('/', 
    authenticate, 
    authorize(['STAFF','STORE_MANAGER', 'ADMIN']), 
    inventoryController.getAll );

// Create inventory item
router.post('/', 
    authenticate, 
    authorize(['STORE_MANAGER', 'ADMIN']), 
    validate(inventoryValidator), 
    inventoryController.create);

// Update inventory item by ID
router.put('/:id', 
    authenticate, 
    authorize(['STORE_MANAGER','ADMIN']), 
    inventoryController.update);

// Delete inventory item by ID
router.delete('/:id', 
    authenticate, 
    authorize(['ADMIN']), 
    inventoryController.delete);

// Get one inventory item by ID
router.get('/:id', 
    authenticate, 
    authorize(['STAFF','STORE_MANAGER','ADMIN']),
    inventoryController.getOne);

router.patch('/:id/restock',
  authenticate,
  authorize(['STORE_MANAGER','ADMIN']),
  inventoryController.restock
);

router.patch('/:id/issue',
  authenticate,
  authorize(['STAFF','STORE_MANAGER','ADMIN']),
  inventoryController.issue
);

router.get('/:id/transactions',
  authenticate,
  authorize(['ADMIN','STORE_MANAGER']),
  inventoryController.getTransactions
);




module.exports = router;
