const InventoryItem = require('../models/Inventory');
const logActivity = require('../utils/logger');

exports.createItem = async (data, user) => {

    const total = req.body.quantityTotal ?? 0;

    const item = new InventoryItem({
        ...data,
        quantityTotal: total,
        quantityInStore: total,
        quantityInUse: 0,
        createdByUserId: user.id
    });

    await item.save();

    await logActivity({
        userId: user.id,
        role: user.role,
        action: 'CREATE',
        itemId: item._id,
        details: { name: item.name, sku: item.sku}
    });



    return item;

};

exports.getAllItem = async (user) => {
    const item = await InventoryItem.find();

    await logActivity({
        userId: user.id,
        role: user.role,
        action: 'GETALLITEM',
        itemId: null,
        details: { count: item.length}
    });


    return item;



};

exports.getOneItem = async (id, user) => {

    const item = await InventoryItem.findById(id);

    await logActivity({
        userId: user.id,
        role: user.role,
        action: 'GETONEITEM',
        itemId: item._id,
        details: { name: item.name, sku: item.sku}
    });


    return item;

}

exports.updateItem = async (id, data, user) => {
    const item = await InventoryItem.findByIdAndUpdate(
      id,
      { ...data, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )

    if (!item) return res.status(404).json({ error: 'Item not found' });

    await logActivity({
        userId: user.id,
        role: user.role,
        action: 'UPDATE',
        itemId: item._id,
        details: {
            before: { name: item.name, quantity: item.quantity },
            after: data
        }
     });



    return item;
};

exports.deleteItem = async (id, user) => {

    const item = await InventoryItem.findByIdAndDelete(id);

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    await logActivity({
        userId: user.id,
        role: user.role,
        action: 'DELETE',
        itemId: item._id,
        details: { name: item.name, sku: item.sku}
     });

    return item;
};

exports.searchItems = async (filters, user) => {
    const query = {};

   
    if (filters.name) {
        query.name = { $regex: filters.name, $options: 'i'};
    }
    if (filters.sku) {
        query.sku = filters.sku;
    }
    if (filters.category) {
        query.category = filters.category;
    }


    if (filters.minQuantity || filters.maxQuanity) {
        query.quantity = {};
        if (filters.minQuantity) query.quantity.$gte = filters.minQuantity;
        if (filters.maxQuanity) query.quantity.$lte = filters.maxQuanity;
    }

    if (filters.startDate || filters.endDate) {
    query.createdAt = {};
    if (filters.startDate) query.createdAt.$gte = new Date(filters.startDate);
    if (filters.endDate) query.createdAt.$lte = new Date(filters.endDate);
    }

    // Pagination & sorting
    const limit = parseInt(filters.limit) || 20;
    const skip = parseInt(filters.skip) || 0;
    const sort = filters.sort || '-createdAt'; // default: newest first

    const items = await InventoryItem.find(query)
        .skip(skip)
        .limit(limit)
        .sort(sort);

    return items;
};