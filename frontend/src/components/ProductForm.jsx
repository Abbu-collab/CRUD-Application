import { useState, useEffect } from "react";
import {
  createProduct,
  updateProduct,
  uploadImages,
} from "../services/productService";

function ProductForm({ editingProduct, onFormDone }) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState("");
  const [selectedFiles, setSelectedFiles] = useState(null);

  useEffect(() => {
    if (editingProduct) {
      setName(editingProduct.name);
      setPrice(editingProduct.price);
      setCategory(editingProduct.category);
      setDescription(editingProduct.description || "");
      setImages((editingProduct.images || []).join(", "));
      setSelectedFiles(null);
    } else {
      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setImages("");
      setSelectedFiles(null);
    }
  }, [editingProduct]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !price || !category.trim()) {
      alert(
        "Please fill in Name, Price, and Category — these fields are required.",
      );
      return;
    }

    if (Number(price) <= 0) {
      alert("Price must be a positive number.");
      return;
    }

    try {
      const imageArray = images
        .split(",")
        .map((url) => {
          const t = url.trim();
          if (!t) return "";
          // keep absolute or data URLs as-is
          if (
            t.startsWith("http://") ||
            t.startsWith("https://") ||
            t.startsWith("data:") ||
            t.startsWith("//") ||
            t.startsWith("/")
          ) {
            return t;
          }
          // If user provided 'www.example.com/..' or bare domain, assume https
          if (/^www\./i.test(t) || /^[a-z0-9.-]+\.[a-z]{2,}/i.test(t)) {
            return "https://" + t;
          }
          return t;
        })
        .filter((url) => url.length > 0);

      let uploadedUrls = [];
      if (selectedFiles && selectedFiles.length > 0) {
        const formData = new FormData();
        for (let i = 0; i < selectedFiles.length; i++) {
          formData.append("images", selectedFiles[i]);
        }
        uploadedUrls = await uploadImages(formData);
        if (!uploadedUrls || uploadedUrls.length === 0) {
          alert(
            "Image upload failed or returned no URLs. Product not updated with local images.",
          );
        }
      }

      const combinedImages = [...uploadedUrls, ...imageArray];

      const productData = {
        name,
        price: Number(price),
        category,
        description,
        images: combinedImages,
      };

      if (editingProduct) {
        await updateProduct(editingProduct._id, productData);
        alert("Product updated successfully!");
      } else {
        await createProduct(productData);
        alert("Product added successfully!");
      }

      onFormDone();
    } catch (error) {
      const serverMessage = error?.response?.data?.message;
      alert("Error saving product: " + (serverMessage || error.message));
    }
  };

  const handleFileChange = (e) => {
    setSelectedFiles(e.target.files);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Product Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label>Price:</label>
        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <label>Category:</label>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
      </div>

      <div>
        <label>Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label>Image URL:</label>
        <textarea
          value={images}
          onChange={(e) => setImages(e.target.value)}
          placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
        />
      </div>

      <div>
        <label>Or upload local images:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
      </div>

      <button type="submit">
        {editingProduct ? "Update Product" : "Add Product"}
      </button>
    </form>
  );
}

export default ProductForm;
