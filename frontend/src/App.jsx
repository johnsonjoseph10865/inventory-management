import { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import ProductForm from "./components/ProductForm";
import ProductTable from "./components/ProductTable";
import DashboardCards from "./components/DashboardCards";

import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "./services/api";

function App() {
  const [user, setUser] = useState(null);
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // =====================================
  // CHECK LOGIN
  // =====================================

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (savedUser && token) {
      try {
        const parsedUser = JSON.parse(savedUser);

        // Only allow valid roles
        if (
          parsedUser.role === "admin" ||
          parsedUser.role === "staff" ||
          parsedUser.role === "viewer"
        ) {
          setUser(parsedUser);
        } else {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error("Invalid saved user:", error);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    }
  }, []);

  // =====================================
  // LOAD PRODUCTS
  // =====================================

  const loadProducts = async () => {
    try {
      const res = await getProducts();

      setProducts(res.data.data || []);
    } catch (error) {
      console.error("Error loading products:", error);

      if (error.response?.status === 401) {
        handleLogout();
      }
    }
  };

  // =====================================
  // LOAD PRODUCTS AFTER LOGIN
  // =====================================

  useEffect(() => {
    if (user) {
      loadProducts();
    }
  }, [user]);

  // =====================================
  // LOGIN
  // =====================================

  const handleLogin = (loggedInUser) => {
    setUser(loggedInUser);
  };

  // =====================================
  // LOGOUT
  // =====================================

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setUser(null);
    setProducts([]);
    setEditingProduct(null);
  };

  // =====================================
  // ROLE PERMISSIONS
  // =====================================

  const isAdmin = user?.role === "admin";
  const isStaff = user?.role === "staff";
  const isViewer = user?.role === "viewer";

  // Admin + Staff
  const canAdd = isAdmin || isStaff;
  const canEdit = isAdmin || isStaff;

  // Admin only
  const canDelete = isAdmin;

  // =====================================
  // ADD PRODUCT
  // =====================================

  const handleAddProduct = async (product) => {
    // Extra security check
    if (!canAdd) {
      alert("You do not have permission to add products.");
      return;
    }

    try {
      await addProduct(product);

      await loadProducts();
    } catch (error) {
      console.error("Error adding product:", error);

      alert(
        error.response?.data?.message ||
          "Unable to add product"
      );
    }
  };

  // =====================================
  // UPDATE PRODUCT
  // =====================================

  const handleUpdateProduct = async (id, product) => {
    // Extra security check
    if (!canEdit) {
      alert("You do not have permission to edit products.");
      return;
    }

    try {
      await updateProduct(id, product);

      setEditingProduct(null);

      await loadProducts();
    } catch (error) {
      console.error("Error updating product:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update product"
      );
    }
  };

  // =====================================
  // DELETE PRODUCT
  // =====================================

  const handleDeleteProduct = async (id) => {
    // Admin only
    if (!canDelete) {
      alert("Only administrators can delete products.");
      return;
    }

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteProduct(id);

      await loadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete product"
      );
    }
  };

  // =====================================
  // EDIT PRODUCT
  // =====================================

  const handleEditProduct = (product) => {
    if (!canEdit) {
      alert("You do not have permission to edit products.");
      return;
    }

    setEditingProduct(product);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =====================================
  // LOGIN SCREEN
  // =====================================

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  // =====================================
  // DASHBOARD
  // =====================================

  return (
    <div className="app-container">

      {/* =================================
          HEADER
      ================================= */}

      <header className="dashboard-header">

        <div>
          <h1>Inventory Management System</h1>

          <p>
            Manage your products efficiently
          </p>
        </div>

        {/* USER INFORMATION */}

        <div className="user-section">

          <div className="user-info">

            <strong>
              {user.name}
            </strong>

            <span>
              {user.role.toUpperCase()}
            </span>

          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        </div>

      </header>

      {/* =================================
          ROLE INFORMATION
      ================================= */}

      <div className="role-banner">

        <span>
          Logged in as:
        </span>

        <strong>
          {user.role.toUpperCase()}
        </strong>

        {isAdmin && (
          <span>
            — Full Access
          </span>
        )}

        {isStaff && (
          <span>
            — Staff Access
          </span>
        )}

        {isViewer && (
          <span>
            — View Only
          </span>
        )}

      </div>

      {/* =================================
          DASHBOARD CARDS
      ================================= */}

      <DashboardCards
        products={products}
      />

      {/* =================================
          PRODUCT FORM
          ADMIN + STAFF ONLY
      ================================= */}

      {canAdd && (
        <ProductForm
  addProduct={handleAddProduct}
  updateProduct={handleUpdateProduct}
  editingProduct={editingProduct}
  onCancel={() => setEditingProduct(null)}
/>
      )}

      {/* =================================
          VIEWER MESSAGE
      ================================= */}

      {isViewer && (
        <div className="viewer-message">
          <strong>View Only Mode</strong>
          <p>
            You can view inventory information,
            but you cannot add, edit, or delete products.
          </p>
        </div>
      )}

      {/* =================================
          PRODUCT TABLE
      ================================= */}

      <ProductTable
        products={products}

        onEdit={
          canEdit
            ? handleEditProduct
            : undefined
        }

        onDelete={
          canDelete
            ? handleDeleteProduct
            : undefined
        }
      />

    </div>
  );
}

export default App;