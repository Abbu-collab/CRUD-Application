# CRUD Application

A simple full-stack app with a React frontend and a Node.js backend.

## What it does
- Add, view, edit, and delete products
- Upload images or use online image links
- Add products to a cart
- Update item quantity in the cart
- Keep cart items after refresh

## Backend
- Express + MongoDB
- Stores products and serves REST API at `/api/products`
- Saves uploaded images in `backend/public/images`

## Frontend
- React + Vite
- Pages: Home, View Products, Add Product, Cart, About, Contact
- Cart saved in browser `localStorage`
- Image slider supports both backend image paths and online URLs

## Run the app
### Backend
```bash
cd "c:\CRUD Application\backend"
npm install
node server.js
```

### Frontend
```bash
cd "c:\CRUD Application\frontend"
npm install
npm run dev
```

## Notes
- Start MongoDB before running the backend.
