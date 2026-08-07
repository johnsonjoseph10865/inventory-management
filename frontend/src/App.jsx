import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import SearchBar from "./components/SearchBar";
import DashboardCards from "./components/DashboardCards";

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./services/api";

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [search, setSearch] = useState("");

  const loadProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddProduct = async (product) => {
    await addProduct(product);
    loadProducts();
  };

  const handleUpdateProduct = async (id, product) => {
    await updateProduct(id, product);
    setEditingProduct(null);
    loadProducts();
  };

  const handleDeleteProduct = async (id) => {
    if (!window.confirm("Delete this product?")) return;

    await deleteProduct(id);
    loadProducts();
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
  };

  const filteredProducts = products.filter((item) =>
    item.productName.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase()) ||
    item.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="main-bg">

      <div className="container py-4">

        <div className="header text-center mb-4">

          <h1>📦 Inventory Management System</h1>

          <p>
            Manage your inventory efficiently
          </p>

        </div>

        <DashboardCards products={products} />

        <ProductForm
          addProduct={handleAddProduct}
          updateProduct={handleUpdateProduct}
          editingProduct={editingProduct}
        />

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <ProductTable
          products={filteredProducts}
          onEdit={handleEditProduct}
          onDelete={handleDeleteProduct}
        />

      </div>

    </div>
  );
}

export default App;