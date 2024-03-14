import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const config = {
  headers: {
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
};

export const registerAPI = (data) => API.post("/api/user/create", data);

export const loginAPI = (data) => API.post("/api/user/login", data);

export const createProductAPI = (formData) =>
  API.post("/api/product/create_product", formData, config);

export const getAllProductsAPI = () => API.get("/api/product/get_products");

export const getSingleProductAPI = (id) =>
  API.get(`/api/product/get_product/${id}`);

export const updateProductAPI = (id, formData) =>
  API.put(`/api/product/update_product/${id}`, formData, config);

export const deleteProductAPI = (id) =>
  API.delete(`/api/product/delete_product/${id}`, config);

  export const forgotPasswordApi = (data) =>API.post("/api/user/forgot/password", data);
  export const resetPasswordApi = (data, token) =>API.put(`/api/user/password/reset/${token}`, data);