import {
  postedProducts,
  getAllProducts,
  newArrival,
  addNewArrival,
  addToWishlist,
  addToCart,
  getCart,
  getWishlist,
  removeFromCart,
  removeFromWishlist,
  checkout,
  getOrdersByUser,
  simulatePayment,
  updateCart,
  getRecommendedProducts,
  getRelatedProducts,
  validateCoupon
} from "../controllers/products.controller.js";
import multer from "multer";
import express from "express";

const productRoute = express.Router();

const upload = multer({ dest: "uploads/" });

// Get all products
productRoute.get("/allProducts", getAllProducts);

// Add product to new arrival
productRoute.post("/newarrival", addNewArrival);

// Add product to wishlist
productRoute.post("/wishlist", addToWishlist);

// Get wishlist
productRoute.get("/wishlist/:userId", getWishlist);

// Remove from wishlist
productRoute.delete("/wishlist", removeFromWishlist);

// Add to cart
productRoute.post("/cart", addToCart);

// Get user's cart
productRoute.get("/cart/:userId", getCart);

// Remove from cart
productRoute.delete("/cart", removeFromCart);

// update cart
productRoute.patch("/cart/:userId", updateCart);

// Get new arrival products
productRoute.get("/newarrival", newArrival);

// get related products based on category
productRoute.get("/:productId/related", getRelatedProducts);

// get recomended for user
productRoute.get("/recommended/:userId", getRecommendedProducts);

// Product Upload
productRoute.post("/post-product", upload.single("image"), postedProducts);

// Validate coupon
productRoute.post("/coupon/validate", validateCoupon);

// Checkout
productRoute.post("/checkout", checkout);

// Get orders by user
productRoute.get("/orders/:userId", getOrdersByUser);

// Simulate payment
productRoute.post("/simulate-payment/:orderId", simulatePayment);

export default productRoute;
