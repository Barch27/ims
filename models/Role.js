const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // maps to UMS user ID (sub)
  role: { type: String, enum: ['NORMAL', 'STORE_MANAGER', 'ADMIN'], default: 'NORMAL' }
});

module.exports = mongoose.model('Role', roleSchema);
