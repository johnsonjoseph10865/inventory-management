import { useState } from "react";

import {
  FaBox,
  FaEdit,
  FaTrash,
  FaTimes,
} from "react-icons/fa";

function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const defaultImage =
    "https://via.placeholder.com/300x300?text=No+Image";

  return (
    <>
      <div className="inventory-container">

        <div className="inventory-header">

          <div>
            <h2>
              <FaBox /> Product Inventory
            </h2>

            <p>
              {products.length} products in inventory
            </p>
          </div>

        </div>

        <div className="product-table-wrapper">

          <table className="product-table">

            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Supplier</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>

              {products.length === 0 ? (

                <tr>
                  <td
                    colSpan="6"
                    className="no-products"
                  >
                    No products available
                  </td>
                </tr>

              ) : (

                products.map((product) => (

                  <tr key={product._id}>

                    {/* PRODUCT */}
                    <td>

                      <div
                        className="product-cell"
                        onClick={() =>
                          setSelectedProduct(product)
                        }
                      >

                        <img
                          src={
                            product.image ||
                            defaultImage
                          }
                          alt={product.productName}
                          className="product-thumbnail"
                          onError={(e) => {
                            e.target.src =
                              defaultImage;
                          }}
                        />

                        <span className="product-name">
                          {product.productName}
                        </span>

                      </div>

                    </td>

                    {/* CATEGORY */}
                    <td>

                      <span className="category-badge">
                        {product.category}
                      </span>

                    </td>

                    {/* PRICE */}
                    <td className="price-cell">

                      ₹{" "}
                      {Number(
                        product.price
                      ).toLocaleString("en-IN")}

                    </td>

                    {/* QUANTITY */}
                    <td>

                      <span
                        className={
                          product.quantity <= 10
                            ? "quantity-badge low-stock"
                            : "quantity-badge"
                        }
                      >
                        {product.quantity}
                      </span>

                    </td>

                    {/* SUPPLIER */}
                    <td>
                      {product.supplier}
                    </td>

                    {/* ACTION */}
                    <td>

                      <div className="action-buttons">

                        {onEdit && (
                          <button
                            className="edit-btn"
                            onClick={() =>
                              onEdit(product)
                            }
                          >
                            <FaEdit />
                            Edit
                          </button>
                        )}

                        {onDelete && (
                          <button
                            className="delete-btn"
                            onClick={() =>
                              onDelete(product._id)
                            }
                          >
                            <FaTrash />
                            Delete
                          </button>
                        )}

                      </div>

                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

        <p className="click-product-hint">
          💡 Click a product to view its details
        </p>

      </div>

      {/* ================================= */}
      {/* PRODUCT DETAILS MODAL */}
      {/* ================================= */}

      {selectedProduct && (

        <div
          className="product-modal-overlay"
          onClick={() =>
            setSelectedProduct(null)
          }
        >

          <div
            className="product-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            <button
              className="modal-close-btn"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              <FaTimes />
            </button>

            {/* IMAGE */}

            <div className="modal-image-container">

              <img
                src={
                  selectedProduct.image ||
                  defaultImage
                }
                alt={
                  selectedProduct.productName
                }
                className="modal-product-image"
                onError={(e) => {
                  e.target.src =
                    defaultImage;
                }}
              />

            </div>

            {/* DETAILS */}

            <div className="modal-product-details">

              <h2>
                {selectedProduct.productName}
              </h2>

              <span className="modal-category">
                {selectedProduct.category}
              </span>

              <div className="modal-info-grid">

                <div>
                  <small>Price</small>
                  <strong>
                    ₹{" "}
                    {Number(
                      selectedProduct.price
                    ).toLocaleString("en-IN")}
                  </strong>
                </div>

                <div>
                  <small>Quantity</small>
                  <strong>
                    {selectedProduct.quantity}
                  </strong>
                </div>

                <div>
                  <small>Supplier</small>
                  <strong>
                    {selectedProduct.supplier}
                  </strong>
                </div>

              </div>

              <div className="description-section">

                <h4>Description</h4>

                <p>
                  {selectedProduct.description ||
                    "No description available."}
                </p>

              </div>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default ProductTable;