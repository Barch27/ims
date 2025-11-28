const mongoose = require('mongoose');

const lendingItemSchema = new mongoose.Schema({
  lendingId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lending', required: true },
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Inventory', required: true },
  quantity: { type: Number, required: true, min: 1 },
  returnedQuantity: { type: Number, default: 0 },
  status: { type: String, enum: ['ACTIVE', 'RETURNED', 'PARTIAL'], default: 'ACTIVE' }
}, { timestamps: true });

module.exports = mongoose.model('LendingItem', lendingItemSchema);

