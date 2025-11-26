const ActivityLog = require('../models/ActivityLog');


async function logActivity({userId, role, action, itemId, details }){
    try {
        await ActivityLog.create({ userId, role, action, itemId, details });
    } catch (err) {
        console.error('Activity logginf=g failed:', err.message);
    }
}

module.exports = logActivity;