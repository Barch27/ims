require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const inventoryRoutes = require('./routes/inventory');
const activityRoutes = require('./routes/activityLogs')
const roleRoutes = require('./routes/roles');
const lendingsRoutes = require('./routes/lendings');


const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to IMS MongoDB'))
  .catch(err => console.error('MongoDB error:', err));

app.use('/api/inventory', inventoryRoutes);
app.use('/', roleRoutes);
app.use('/api/activity-logs', activityRoutes);
app.use('/api/lendings', lendingsRoutes);


app.listen(process.env.PORT, () => {
  console.log(`IMS running on port ${process.env.PORT}`);
});





