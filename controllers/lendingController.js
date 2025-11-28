const lendingService = require('../services/lendingService');

// Create a new lending
exports.lend = async (req, res) => {
  try {
    const { employeeId, items, notes } = req.body;

    // Actor comes from JWT middleware (req.user)
    const actor = req.user;

    // Call service with IDs only
    const lending = await lendingService.createLending(
      { employeeId, items, notes },
      actor
    );

    res.status(201).json(lending);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all lendings
exports.getAllLendings = async (req, res) => {
  try {
    const lendings = await lendingService.getLendingItem(req.user);
    res.status(200).json(lendings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
