import ImageSlider from './ImageSlider';

function ProductCard({ product, onEdit, onDelete, onAddToCart }) {
  return (
    <div className="product-card">
      <ImageSlider images={product.images} />
      <div className="card-body">
        <h3>{product.name}</h3>
        <p className="card-price">₹{product.price}</p>
        <p className="card-category">{product.category}</p>
        <p className="card-description">{product.description}</p>
        <div className="card-actions">
          <button onClick={() => onEdit(product)}>Edit</button>
          <button onClick={() => onDelete(product._id)}>Delete</button>
          {onAddToCart && <button onClick={() => onAddToCart(product)}>Add to Cart</button>}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;