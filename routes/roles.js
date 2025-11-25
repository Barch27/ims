const express = require('express');
const Role = require('../models/Role');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();


router.post('/roles', authenticate, authorize(['ADMIN']), async (req, res) => {
  const { userId, role } = req.body;
  const roleDoc = await Role.findOneAndUpdate(
    { userId },
    { role },
    { upsert: true, new: true }
  );
  res.json({ message: 'Role assigned', role: roleDoc });
});

module.exports = router;
