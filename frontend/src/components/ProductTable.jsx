import {
  FaEdit,
  FaTrash,
  FaBoxOpen,
} from "react-icons/fa";

function ProductTable({ products, onEdit, onDelete }) {
  return (
    <div className="card shadow-card p-3">

      <h4 className="mb-3 text-primary">
        <FaBoxOpen className="me-2" />
        Product List
      </h4>

      <div className="table-responsive">

        <table className="table table-hover align-middle">

          <thead className="table-dark">

            <tr>
              <th>Product</th>
              <th>SKU</th>
              <th>Category</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Supplier</th>
              <th width="180">Action</th>
            </tr>

          </thead>

          <tbody>

            {products.length === 0 ? (

              <tr>
                <td
                  colSpan="7"
                  className="text-center text-muted"
                >
                  No Products Found
                </td>
              </tr>

            ) : (

              products.map((item) => (

                <tr key={item._id}>

                  <td>
                    <strong>{item.productName}</strong>
                  </td>

                  <td>{item.sku}</td>

                  <td>

                    <span className="badge bg-info">
                      {item.category}
                    </span>

                  </td>

                  <td>
                    ₹{item.price}
                  </td>

                  <td>

                    {Number(item.quantity) < 10 ? (

                      <span className="badge bg-danger">
                        {item.quantity} Low
                      </span>

                    ) : (

                      <span className="badge bg-success">
                        {item.quantity}
                      </span>

                    )}

                  </td>

                  <td>{item.supplier}</td>

                  <td>

                    <button
                      className="btn btn-warning btn-sm me-2"
                      onClick={() => onEdit(item)}
                    >
                      <FaEdit /> Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => onDelete(item._id)}
                    >
                      <FaTrash /> Delete
                    </button>

                  </td>

                </tr>

              ))

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}

export default ProductTable;