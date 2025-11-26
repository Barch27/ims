const InventoryItem = require('../models/Inventory')

exports.createItem = async (data, user) => {

    const total = req.body.quantityTotal ?? 0;

    const item = new InventoryItem({
        ...req.body,
        quantityTotal: total,
        quantityInStore: total,
        quantityInUse: 0,
        createdByUserId: user.id
    });

    return await item.save();

};

exports.getAllItem = async () => {
    return await InventoryItem.find();
};

exports.getOneItem = async (id) => {

    return await InventoryItem.findById(id);
}

exports.updateItem = async (id, data) => {
    return await InventoryItem.findByIdAndUpdate(
      id,
      { ...data, updatedAt: Date.now() },
      { new: true, runValidators: true }
    )
};

exports.deleteItem = async (id) => {
    return await InventoryItem.findByIdAndDelete(id);
}
