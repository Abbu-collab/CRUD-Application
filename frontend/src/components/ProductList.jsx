import ProductCard from './ProductCard';

function ProductList({ products, onDelete, onEdit, onCartToggle, cartIds }) {
  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onEdit={onEdit}
          onDelete={onDelete}
          onCartToggle={onCartToggle}
          isInCart={cartIds.includes(product._id)}
        />
      ))}
    </div>
  );
}

export default ProductList;