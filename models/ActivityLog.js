const mongoose = require('mongoose');


const activityLogSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  role: { type: String, required: true },
  action: { 
    type: String, 
    enum: ['CREATE','READ','UPDATE','DELETE','RESTOCK','LENDING_CREATE','ITEM_ISSUED'], 
    required: true 
  },
  entity: { type: String, enum: ['inventory','lendings'], required: true },
  entityId: { type: mongoose.Schema.Types.ObjectId }, // can be itemId or lendingId
  timestamp: { type: Date, default: Date.now },
  details: { type: Object }
});

module.exports = mongoose.model('ActivityLog', activityLogSchema);

