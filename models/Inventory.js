const { required } = require('joi');
const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  createdBy: { type: String, required: true },
  minStockLevel: { type: String, required:true}// userId from JWT
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);






