const { required } = require('joi');
const mongoose = require('mongoose');

const stockTransactionSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'InventoryItem' },
  type: { type: String, enum: ['RESTOCK','ISSUE'], required: true },
  quantityChange: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('StockTransaction', stockTransactionSchema);
