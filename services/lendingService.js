const Lending = require('../models/Lending');
const LendingItem = require('../models/LendingItem');
const InventoryStock = require('../models/Inventory');
const logActivity = require('../models/ActivityLog');

exports.getLendingItem = async (user) => {
  const lendings = await Lending.find().lean();

  for (const lending of lendings) {
    lending.items = await LendingItem.find({ lendingId: lending._id })
      .populate('itemId', 'name category serialNumber')
      .lean();
  }

  await logActivity({
    userId: user.id,
    role: user.role,
    action: 'GETALLITEM',
    itemId: null,
    details: { count: lendings.length }
  });

  return lendings;
};


exports.createLending = async ({ employeeId, items, notes }, actor) => {
  const lending = await Lending.create({
    employeeId,          // string from request
    createdBy: actor.id, // string from JWT token
    notes,
    lentAt: new Date()
  });

  for (const { itemId, quantity } of items) {
    const item = await InventoryStock.findById(itemId);
    if (!item || item.quantity < quantity) {
      throw new Error(`Insufficient stock for item ${itemId}`);
    }

    item.quantity -= quantity;
    await item.save();

    await LendingItem.create({
      lendingId: lending._id, // ObjectId reference
      itemId,                 // ObjectId reference
      quantity
    });

    await logActivity.create({
      userId: actor.id,
      role: actor.role,
      action: 'ITEM_ISSUED',
      entity: 'inventoryItems',
      entityId: itemId,
      details: { quantity, lendingId: lending._id }
    });
  }

  await logActivity.create({
    userId: actor.id,
    role: actor.role,
    action: 'LENDING_CREATE',
    entity: 'lendings',
    entityId: lending._id,
    details: { employeeId, itemCount: items.length }
  });

  return lending;
};

