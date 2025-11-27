const express = require('express');
const router = express.Router();
const activityLogController = require('../controllers/activityLogController');
const { authenticate, authorize } = require('../middleware/auth');

// Only ADMIN should query logs
router.get(
  '/',
  authenticate,
  authorize(['ADMIN']),
  activityLogController.getLogs
);


module.exports = router;
