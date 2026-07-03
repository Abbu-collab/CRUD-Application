import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct } from "../services/productService";
import ProductList from "../components/ProductList";
import { useCart } from "../context/CartContext";

function ViewProducts() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { cartItems, addToCart, removeFromCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const data = await getAllProducts();
    setProducts(data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;

    try {
      await deleteProduct(id);
      alert("Product deleted successfully!");
      fetchProducts();
    } catch (error) {
      alert("Error deleting product: " + error.message);
    }
  };

  const handleEditClick = (product) => {
    navigate("/add-product", { state: { editingProduct: product } });
  };

  const handleCartToggle = (product) => {
    const isInCart = cartItems.some((item) => item.product._id === product._id);
    if (isInCart) {
      removeFromCart(product._id);
      alert(`${product.name} removed from cart!`);
    } else {
      addToCart(product);
      alert(`${product.name} added to cart!`);
    }
  };

  const filteredProducts = products.filter((product) => {
    const term = searchTerm.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term) ||
      (product.description && product.description.toLowerCase().includes(term))
    );
  });

  const cartIds = cartItems.map((item) => item.product._id);

  return (
    <div className="page">
      <h1>All Products</h1>
      <div className="search-bar-container">
        <input
          type="text"
          className="search-bar"
          placeholder="🔍 Search by name, category, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {filteredProducts.length === 0 && searchTerm && (
        <p className="no-results">No products found matching "{searchTerm}"</p>
      )}
      <ProductList
        products={filteredProducts}
        onDelete={handleDelete}
        onEdit={handleEditClick}
        onCartToggle={handleCartToggle}
        cartIds={cartIds}
      />
    </div>
  );
}

export default ViewProducts;
