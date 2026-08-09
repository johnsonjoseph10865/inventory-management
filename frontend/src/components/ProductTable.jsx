import {
  FaBox,
  FaEdit,
  FaTrash,
  FaExclamationTriangle,
} from "react-icons/fa";

function ProductTable({
  products,
  onEdit,
  onDelete,
}) {
  return (
    <div className="inventory-section">

      {/* ================================
          HEADER
      ================================= */}

      <div className="inventory-header">
        <div>
          <div className="inventory-title">
            <FaBox />
            <h2>Product Inventory</h2>
          </div>

          <p>
            {products.length}{" "}
            {products.length === 1
              ? "product"
              : "products"}{" "}
            in inventory
          </p>
        </div>
      </div>

      {/* ================================
          EMPTY STATE
      ================================= */}

      {products.length === 0 ? (
        <div className="empty-inventory">
          <FaBox />
          <h3>No Products Found</h3>
          <p>
            Add your first product to the inventory.
          </p>
        </div>
      ) : (

        /* ================================
           TABLE
        ================================= */

        <div className="table-wrapper">

          <table className="inventory-table">

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

              {products.map((product) => (

                <tr key={product._id}>

                  {/* PRODUCT */}

                  <td>
                    <div className="product-name-cell">
                      <div className="product-icon">
                        <FaBox />
                      </div>

                      <span>
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

                  <td>
                    <span className="price-cell">
                      ₹{" "}
                      {Number(
                        product.price || 0
                      ).toLocaleString("en-IN")}
                    </span>
                  </td>

                  {/* QUANTITY */}

                  <td>
                    {Number(product.quantity) <= 5 ? (
                      <span className="quantity-low">
                        <FaExclamationTriangle />
                        {product.quantity}
                      </span>
                    ) : (
                      <span className="quantity-normal">
                        {product.quantity}
                      </span>
                    )}
                  </td>

                  {/* SUPPLIER */}

                  <td>
                    <span className="supplier-cell">
                      {product.supplier}
                    </span>
                  </td>

                  {/* ACTION */}

                  <td>
                    <div className="action-buttons">

                      {onEdit && (
                        <button
                          type="button"
                          className="edit-btn"
                          onClick={() =>
                            onEdit(product)
                          }
                          title="Edit Product"
                        >
                          <FaEdit />
                          <span>Edit</span>
                        </button>
                      )}

                      {onDelete && (
                        <button
                          type="button"
                          className="delete-btn"
                          onClick={() =>
                            onDelete(product._id)
                          }
                          title="Delete Product"
                        >
                          <FaTrash />
                          <span>Delete</span>
                        </button>
                      )}

                      {!onEdit && !onDelete && (
                        <span className="view-only">
                          View Only
                        </span>
                      )}

                    </div>
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>
      )}

    </div>
  );
}

export default ProductTable;