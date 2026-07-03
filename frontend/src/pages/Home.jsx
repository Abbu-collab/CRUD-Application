function Home() {
  return (
    <div className="home-container">
      <div className="page banner">
        <h1>Welcome to ProductHub</h1>
        <p>Your one-stop solution for managing products with ease - add, update, delete, and browse products in real time.</p>
      </div>

      <div className="home-cards-section">
        <div className="home-card">
          <div className="home-card-icon">📦</div>
          <h3>Manage Products</h3>
          <p>Easily add, edit, and delete products from your inventory. Keep your product catalog up to date with just a few clicks.</p>
        </div>

        <div className="home-card">
          <div className="home-card-icon">🖼️</div>
          <h3>Upload Images</h3>
          <p>Add multiple images to each product. Upload local files or use online URLs to showcase your products beautifully.</p>
        </div>

        <div className="home-card">
          <div className="home-card-icon">🛒</div>
          <h3>Smart Shopping</h3>
          <p>Browse products, add items to your cart, and manage your purchases efficiently with our intuitive interface.</p>
        </div>

        <div className="home-card">
          <div className="home-card-icon">⚡</div>
          <h3>Real-time Updates</h3>
          <p>All changes are reflected instantly across the platform. Experience seamless synchronization in real time.</p>
        </div>

        <div className="home-card">
          <div className="home-card-icon">🔍</div>
          <h3>Easy Discovery</h3>
          <p>Organize products by category and browse through your inventory with ease. Find what you need quickly.</p>
        </div>

        <div className="home-card">
          <div className="home-card-icon">💾</div>
          <h3>Reliable Storage</h3>
          <p>All your product data is securely stored in MongoDB. Rest assured your information is safe and always accessible.</p>
        </div>
      </div>
    </div>
  );
}

export default Home;