
const mongoose = require('mongoose');
const Role = require('./models/Role');
require('dotenv').config();

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    // Replace this with the UMS user ID (_id from MongoDB or "sub" claim in JWT)
    const adminId = "6924622b23323249ac8ccd2d"; 

    const exists = await Role.findOne({ userId: adminId });
    if (!exists) {
      await Role.create({ userId: adminId, role: "ADMIN" });
      console.log("Seeded Admin role for user:", adminId);
    } else {
      console.log("Admin role already exists for user:", adminId);
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error("Error seeding admin:", err);
  }
}

seedAdmin();
