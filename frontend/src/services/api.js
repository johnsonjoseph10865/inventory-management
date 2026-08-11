import axios from "axios";

const API = axios.create({
  baseURL: "https://inventory-management-backend-hokt.onrender.com",
});

// =====================================
// AUTHENTICATION
// =====================================

export const loginUser = (data) => {
  return API.post("/api/auth/login", data);
};

// =====================================
// GET PRODUCTS
// =====================================

export const getProducts = () => {
  const token = localStorage.getItem("token");

  return API.get("/api/products", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// =====================================
// ADD PRODUCT
// =====================================

export const addProduct = (data) => {
  const token = localStorage.getItem("token");

  return API.post("/api/products", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// =====================================
// UPDATE PRODUCT
// =====================================

export const updateProduct = (id, data) => {
  const token = localStorage.getItem("token");

  return API.put(`/api/products/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// =====================================
// DELETE PRODUCT
// =====================================

export const deleteProduct = (id) => {
  const token = localStorage.getItem("token");

  return API.delete(`/api/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export default API;