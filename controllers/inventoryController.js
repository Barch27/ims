const InventorServices = require('../services/inventoryService');

exports.create = async (req, res) => {
  const user = req.user;
  const item =  await InventorServices.createItem(req.body, user);
  res.status(201).json(item);
};

exports.getAll = async (req, res) => {
//   const items = await InventoryItem.find();
  const items = InventorServices.getAllItem();
  res.json(items);
};

exports.getOne = async (req, res) => {
  try {
    const item = await InventorServices.getOneItem(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 

exports.update = async (req, res) => {
  try {
    const { name, quantity } = req.body;

    // Find and update
    const item = await InventoryService.updateItem(req.params.id, {name ,quantity} );

    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json(item);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};


exports.delete = async (req, res) => {
  try {
    const item = await InventorServices.deleteItem(req.params.id);
    console.log('deleted item', item);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }

    res.json({ message: 'Item deleted successfully', item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}