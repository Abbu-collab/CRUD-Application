import { useCart } from "../context/CartContext";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  if (cartItems.length === 0) {
    return (
      <div className="page">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Your Cart</h1>
      <ul className="cart-list">
        {cartItems.map((item) => (
          <li key={item.product._id} className="cart-item">
            <div className="cart-item-details">
              <strong>{item.product.name}</strong>
              <p>
                ₹{item.product.price} x {item.quantity} = ₹
                {item.product.price * item.quantity}
              </p>
            </div>
            <div className="quantity-controls">
              <button onClick={() => updateQuantity(item.product._id, -1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item.product._id, 1)}>+</button>
              <button
                className="remove-button"
                onClick={() => removeFromCart(item.product._id)}
              >
                Remove
              </button>
              <button
                className="purchase-item-button"
                onClick={() => alert(`Purchased ${item.product.name} (${item.quantity})`)}
              >
                Purchase
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <h3>Total: ₹{total}</h3>
        <div className="cart-actions">
          <button className="clear-button" onClick={clearCart}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
