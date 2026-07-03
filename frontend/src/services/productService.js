import axios from "axios";

const envApiUrl = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, "");
const apiBase =
  envApiUrl ||
  (import.meta.env.DEV && typeof window !== "undefined"
    ? window.location.origin
    : "https://crud-application-yhki.onrender.com");
const API_URL = `${apiBase}/api/products`;
const UPLOAD_URL = `${apiBase}/api/upload`;

export const getAllProducts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createProduct = async (productData) => {
  const response = await axios.post(API_URL, productData);
  return response.data;
};

export const updateProduct = async (id, productData) => {
  const response = await axios.put(`${API_URL}/${id}`, productData);
  return response.data;
};

export const deleteProduct = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};

export const uploadImages = async (formData) => {
  const response = await axios.post(UPLOAD_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data; // array of urls
};
