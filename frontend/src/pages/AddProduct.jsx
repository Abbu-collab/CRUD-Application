import { useLocation, useNavigate } from "react-router-dom";
import ProductForm from "../components/ProductForm";

function AddProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const editingProduct = location.state?.editingProduct || null;

  const handleFormDone = () => {
    navigate("/view-products");
  };

  return (
    <div className="page">
      <h1>{editingProduct ? "Edit Product" : "Add Product"}</h1>
      <ProductForm
        editingProduct={editingProduct}
        onFormDone={handleFormDone}
      />
    </div>
  );
}

export default AddProduct;
