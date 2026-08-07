import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/products",
});

// Get Products
export const getProducts = () => API.get("/");

// Add Product
export const addProduct = (data) => API.post("/", data);

// Update Product
export const updateProduct = (id, data) =>
  API.put(`/${id}`, data);

// Delete Product
export const deleteProduct = (id) =>
  API.delete(`/${id}`);