import { useState, useEffect } from "react";
import {
  FaBoxOpen,
  FaTag,
  FaLayerGroup,
  FaRupeeSign,
  FaWarehouse,
  FaTruck,
  FaFileAlt,
  FaPlusCircle,
  FaSave,
  FaTimes,
} from "react-icons/fa";

function ProductForm({
  addProduct,
  updateProduct,
  editingProduct,
}) {
  const initialState = {
    productName: "",
    sku: "",
    category: "",
    price: "",
    quantity: "",
    supplier: "",
    description: "",
  };

  const [formData, setFormData] = useState(initialState);

  useEffect(() => {
    if (editingProduct) {
      setFormData(editingProduct);
    } else {
      setFormData(initialState);
    }
  }, [editingProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingProduct) {
      updateProduct(editingProduct._id, formData);
    } else {
      addProduct(formData);
    }

    setFormData(initialState);
  };

  const clearForm = () => {
    setFormData(initialState);
    window.location.reload();
  };

  return (
    <div className="card shadow-card p-4 mb-4">

      <h3 className="text-primary mb-4">

        {editingProduct ? (
          <>
            <FaSave className="me-2" />
            Update Product
          </>
        ) : (
          <>
            <FaPlusCircle className="me-2" />
            Add Product
          </>
        )}

      </h3>

      <form onSubmit={handleSubmit}>

        <div className="row">

          <div className="col-md-6 mb-3">

            <label className="form-label">
              <FaBoxOpen className="me-2" />
              Product Name
            </label>

            <input
              type="text"
              className="form-control"
              name="productName"
              value={formData.productName}
              onChange={handleChange}
              placeholder="Enter Product Name"
              required
            />

          </div>

          <div className="col-md-6 mb-3">

            <label className="form-label">
              <FaTag className="me-2" />
              SKU
            </label>

            <input
              type="text"
              className="form-control"
              name="sku"
              value={formData.sku}
              onChange={handleChange}
              placeholder="Enter SKU"
              required
            />

          </div>

          <div className="col-md-6 mb-3">

            <label className="form-label">
              <FaLayerGroup className="me-2" />
              Category
            </label>

            <input
              type="text"
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Category"
              required
            />

          </div>

          <div className="col-md-6 mb-3">

            <label className="form-label">
              <FaRupeeSign className="me-2" />
              Price
            </label>

            <input
              type="number"
              className="form-control"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />

          </div>

          <div className="col-md-6 mb-3">

            <label className="form-label">
              <FaWarehouse className="me-2" />
              Quantity
            </label>

            <input
              type="number"
              className="form-control"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="Quantity"
              required
            />

          </div>

          <div className="col-md-6 mb-3">

            <label className="form-label">
              <FaTruck className="me-2" />
              Supplier
            </label>

            <input
              type="text"
              className="form-control"
              name="supplier"
              value={formData.supplier}
              onChange={handleChange}
              placeholder="Supplier"
              required
            />

          </div>

          <div className="col-md-12 mb-3">

            <label className="form-label">
              <FaFileAlt className="me-2" />
              Description
            </label>

            <textarea
              rows="4"
              className="form-control"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter Product Description"
            />

          </div>

        </div>

        <div className="d-flex gap-2">

          <button className="btn btn-primary">

            {editingProduct ? (
              <>
                <FaSave className="me-2" />
                Update Product
              </>
            ) : (
              <>
                <FaPlusCircle className="me-2" />
                Add Product
              </>
            )}

          </button>

          <button
            type="button"
            className="btn btn-secondary"
            onClick={clearForm}
          >
            <FaTimes className="me-2" />
            Clear
          </button>

        </div>

      </form>

    </div>
  );
}

export default ProductForm;