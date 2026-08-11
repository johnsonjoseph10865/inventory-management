import { useEffect, useState } from "react";

import {
  FaBox,
  FaTags,
  FaRupeeSign,
  FaHashtag,
  FaTruck,
  FaAlignLeft,
  FaImage,
  FaPlus,
  FaEdit,
  FaTimes,
} from "react-icons/fa";

function ProductForm({
  addProduct,
  updateProduct,
  editingProduct,
  onCancel,
}) {
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
    supplier: "",
    description: "",
    image: "",
  });

  // Load product data when editing
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        productName: editingProduct.productName || "",
        category: editingProduct.category || "",
        price: editingProduct.price ?? "",
        quantity: editingProduct.quantity ?? "",
        supplier: editingProduct.supplier || "",
        description: editingProduct.description || "",
        image: editingProduct.image || "",
      });
    } else {
      setFormData({
        productName: "",
        category: "",
        price: "",
        quantity: "",
        supplier: "",
        description: "",
        image: "",
      });
    }
  }, [editingProduct]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // Clear form
  const clearForm = () => {
    setFormData({
      productName: "",
      category: "",
      price: "",
      quantity: "",
      supplier: "",
      description: "",
      image: "",
    });
  };

  // Cancel editing
  const handleCancel = () => {
    clearForm();

    if (onCancel) {
      onCancel();
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.productName.trim() ||
      !formData.category.trim() ||
      !formData.supplier.trim()
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (Number(formData.price) < 0) {
      alert("Price cannot be negative.");
      return;
    }

    if (Number(formData.quantity) < 0) {
      alert("Quantity cannot be negative.");
      return;
    }

    try {
      const productData = {
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
      };

      if (editingProduct) {
        await updateProduct(
          editingProduct._id,
          productData
        );
      } else {
        await addProduct(productData);
      }

      clearForm();
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <div className="product-form-card">

      {/* HEADER */}
      <div className="product-form-header">

        <div className="form-title-icon">
          {editingProduct ? <FaEdit /> : <FaPlus />}
        </div>

        <div>
          <h2>
            {editingProduct
              ? "Edit Product"
              : "Add Product"}
          </h2>

          <p>
            {editingProduct
              ? "Update the product information"
              : "Enter details to add a new product"}
          </p>
        </div>

      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>

        <div className="form-grid">

          {/* PRODUCT NAME */}
          <div className="form-group">

            <label htmlFor="productName">
              <FaBox />
              Product Name
            </label>

            <input
              id="productName"
              type="text"
              name="productName"
              placeholder="Enter product name"
              value={formData.productName}
              onChange={handleChange}
              required
            />

          </div>

          {/* CATEGORY */}
          <div className="form-group">

            <label htmlFor="category">
              <FaTags />
              Category
            </label>

            <input
              id="category"
              type="text"
              name="category"
              placeholder="Enter category"
              value={formData.category}
              onChange={handleChange}
              required
            />

          </div>

          {/* PRICE */}
          <div className="form-group">

            <label htmlFor="price">
              <FaRupeeSign />
              Price
            </label>

            <input
              id="price"
              type="number"
              name="price"
              placeholder="Enter price"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
            />

          </div>

          {/* QUANTITY */}
          <div className="form-group">

            <label htmlFor="quantity">
              <FaHashtag />
              Quantity
            </label>

            <input
              id="quantity"
              type="number"
              name="quantity"
              placeholder="Enter quantity"
              min="0"
              step="1"
              value={formData.quantity}
              onChange={handleChange}
              required
            />

          </div>

          {/* SUPPLIER */}
          <div className="form-group">

            <label htmlFor="supplier">
              <FaTruck />
              Supplier
            </label>

            <input
              id="supplier"
              type="text"
              name="supplier"
              placeholder="Enter supplier"
              value={formData.supplier}
              onChange={handleChange}
              required
            />

          </div>

          {/* IMAGE URL */}
          <div className="form-group">

            <label htmlFor="image">
              <FaImage />
              Product Image URL
            </label>

            <input
              id="image"
              type="url"
              name="image"
              placeholder="https://example.com/product.jpg"
              value={formData.image}
              onChange={handleChange}
            />

          </div>

          {/* IMAGE PREVIEW */}
          {formData.image && (
            <div className="image-preview">
              <img
                src={formData.image}
                alt="Product Preview"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
          )}

          {/* DESCRIPTION */}
          <div className="form-group full-width">

            <label htmlFor="description">
              <FaAlignLeft />
              Description
            </label>

            <textarea
              id="description"
              name="description"
              rows="4"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleChange}
            />

          </div>

        </div>

        {/* BUTTONS */}
        <div className="form-actions">

          <button
            type="submit"
            className="primary-btn"
          >
            {editingProduct ? (
              <>
                <FaEdit />
                Update Product
              </>
            ) : (
              <>
                <FaPlus />
                Add Product
              </>
            )}
          </button>

          {editingProduct && (
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
            >
              <FaTimes />
              Cancel
            </button>
          )}

        </div>

      </form>

    </div>
  );
}

export default ProductForm;