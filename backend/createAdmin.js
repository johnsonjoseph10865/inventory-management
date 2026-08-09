const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const User = require("./models/User");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

    // Check whether admin already exists
    const existingAdmin = await User.findOne({
      username: "admin",
    });

    if (existingAdmin) {
      console.log("⚠️ Admin user already exists");
      process.exit(0);
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(
      "admin123",
      10
    );

    // Create admin
    const admin = new User({
      name: "System Administrator",
      username: "admin",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    console.log("✅ Admin account created successfully!");
    console.log("--------------------------------");
    console.log("Username: admin");
    console.log("Password: admin123");
    console.log("Role: admin");
    console.log("--------------------------------");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createAdmin();