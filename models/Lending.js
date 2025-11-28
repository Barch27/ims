const mongoose = require('mongoose');

const lendingSchema = new mongoose.Schema({
  employeeId: { type: String, required: true },   // UMS user ID
  createdBy: { type: String, required: true },    // UMS user ID
  notes: String,
  status: { type: String, enum: ['ACTIVE','RETURNED','PARTIAL'], default: 'ACTIVE' },
  lentAt: { type: Date, default: Date.now },
  returnedAt: Date
}, { timestamps: true });


module.exports = mongoose.model('Lending', lendingSchema);

