const ActivityLog = require('../models/ActivityLog');

exports.getLogs = async (req, res) => {
  try {
    const { userId, role, action, startDate, endDate, limit, skip } = req.query;
    const query = {};

    if (userId) query.userId = userId;
    if (role) query.role = role;
    if (action) query.action = action;

    if (startDate || endDate) {
      query.timestamp = {};
      if (startDate) query.timestamp.$gte = new Date(startDate);
      if (endDate) query.timestamp.$lte = new Date(endDate);
    }

    const logs = await ActivityLog.find(query)
      .skip(parseInt(skip) || 0)
      .limit(parseInt(limit) || 50)
      .sort('-timestamp');

    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

