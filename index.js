require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const inventoryRoutes = require('./routes/inventory');
const roleRoutes = require('./routes/roles');
const ActivityLog = require('./models/ActivityLog');

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => {console.log('Connected to IMS MongoDB');

    (async () => {
      const logs = await ActivityLog.find().sort({ timestamp: -1 });
      console.log('Activity Logs:', logs);
    })();
  })
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/inventory', inventoryRoutes);
app.use('/', roleRoutes);

app.listen(process.env.PORT, () => {
  console.log(`IMS running on port ${process.env.PORT}`);
});





