const InventorServices = require('../services/inventoryService');

exports.create = async (req, res) => {
  const user = req.user;
  const item =  await InventorServices.createItem(req.body, user);
  res.status(201).json(item);
};

exports.getAll = async (req, res) => {
//   const items = await InventoryItem.find();  
  const user = req.user;
  const items = InventorServices.getAllItem(user);
  res.json(items);
};

exports.getOne = async (req, res) => {
  try {
    const user = req.user;
    const item = await InventorServices.getOneItem(req.params.id, user);
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}; 

exports.update = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const user = req.user;

    // Find and update
    const item = await InventorServices.updateItem(req.params.id, {name ,quantity}, user);

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
    const user = req.user;
    const item = await InventorServices.deleteItem(req.params.id, user);
    

    res.json({ message: 'Item deleted successfully', item });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};