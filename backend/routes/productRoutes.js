const express = require("express");

const router = express.Router();

const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const {
  protect,
  authorize,
} = require("../middleware/authMiddleware");

// =====================================
// GET ALL PRODUCTS
// Admin + Staff + Viewer
// =====================================

router.get(
  "/",
  protect,
  authorize("admin", "staff", "viewer"),
  getProducts
);

// =====================================
// ADD PRODUCT
// Admin + Staff
// =====================================

router.post(
  "/",
  protect,
  authorize("admin", "staff"),
  addProduct
);

// =====================================
// UPDATE PRODUCT
// Admin + Staff
// =====================================

router.put(
  "/:id",
  protect,
  authorize("admin", "staff"),
  updateProduct
);

// =====================================
// DELETE PRODUCT
// Admin only
// =====================================

router.delete(
  "/:id",
  protect,
  authorize("admin"),
  deleteProduct
);

module.exports = router;