import axios from "axios";

const API_URL = "http://localhost:5000/api/products";
const BASE_URL = API_URL.replace("/api/products", "");

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
  const response = await axios.post(`${BASE_URL}/api/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data; // array of urls
};
