import {
  FaBoxes,
  FaLayerGroup,
  FaExclamationTriangle,
} from "react-icons/fa";

function DashboardCards({ products }) {
  const totalProducts = products.length;

  const totalCategories = [
    ...new Set(products.map((item) => item.category)),
  ].length;

  const lowStock = products.filter(
    (item) => Number(item.quantity) < 10
  ).length;

  return (
    <div className="row mb-4">

      <div className="col-md-4 mb-3">

        <div
          className="card text-white shadow-card"
          style={{
            background:
              "linear-gradient(135deg,#2563eb,#4f46e5)",
          }}
        >

          <div className="card-body text-center">

            <FaBoxes size={45} />

            <h5 className="mt-3">
              Total Products
            </h5>

            <h2>{totalProducts}</h2>

          </div>

        </div>

      </div>

      <div className="col-md-4 mb-3">

        <div
          className="card text-white shadow-card"
          style={{
            background:
              "linear-gradient(135deg,#16a34a,#22c55e)",
          }}
        >

          <div className="card-body text-center">

            <FaLayerGroup size={45} />

            <h5 className="mt-3">
              Categories
            </h5>

            <h2>{totalCategories}</h2>

          </div>

        </div>

      </div>

      <div className="col-md-4 mb-3">

        <div
          className="card text-white shadow-card"
          style={{
            background:
              "linear-gradient(135deg,#dc2626,#ef4444)",
          }}
        >

          <div className="card-body text-center">

            <FaExclamationTriangle size={45} />

            <h5 className="mt-3">
              Low Stock
            </h5>

            <h2>{lowStock}</h2>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DashboardCards;