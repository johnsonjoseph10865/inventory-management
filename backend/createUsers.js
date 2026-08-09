const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

require("dotenv").config();

const User = require("./models/User");

const createUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

    // =====================================
    // STAFF USER
    // =====================================

    const existingStaff = await User.findOne({
      username: "staff",
    });

    if (!existingStaff) {
      const staffPassword = await bcrypt.hash(
        "staff123",
        10
      );

      const staff = new User({
        name: "Inventory Staff",
        username: "staff",
        password: staffPassword,
        role: "staff",
      });

      await staff.save();

      console.log("✅ Staff account created");
    } else {
      console.log("⚠️ Staff account already exists");
    }

    // =====================================
    // VIEWER USER
    // =====================================

    const existingViewer = await User.findOne({
      username: "viewer",
    });

    if (!existingViewer) {
      const viewerPassword = await bcrypt.hash(
        "viewer123",
        10
      );

      const viewer = new User({
        name: "Inventory Viewer",
        username: "viewer",
        password: viewerPassword,
        role: "viewer",
      });

      await viewer.save();

      console.log("✅ Viewer account created");
    } else {
      console.log("⚠️ Viewer account already exists");
    }

    // =====================================
    // LOGIN DETAILS
    // =====================================

    console.log("");
    console.log("=================================");
    console.log("       USER ACCOUNTS");
    console.log("=================================");
    console.log("Admin  → admin / admin123");
    console.log("Staff  → staff / staff123");
    console.log("Viewer → viewer / viewer123");
    console.log("=================================");

    process.exit(0);

  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

createUsers();