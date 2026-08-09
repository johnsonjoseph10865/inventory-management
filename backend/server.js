const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

// ==============================
// Middleware
// ==============================

app.use(cors());
app.use(express.json());

// ==============================
// Routes
// ==============================

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// ==============================
// Test Route
// ==============================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Inventory Management System API is running",
  });
});

// ==============================
// Connect to MongoDB
// ==============================

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected");
  })
  .catch((err) => {
    console.error(
      "❌ MongoDB Connection Error:",
      err
    );
  });

// ==============================
// Start Server
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `🚀 Server running on http://localhost:${PORT}`
  );
});