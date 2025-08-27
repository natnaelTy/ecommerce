import prisma from "../prisma/prismaClient.js";
import dotenv from "dotenv";
import cloudinary from "./cloudinary folder/cloudinary.js";

dotenv.config();

// Get all products
export const products = async (_, res) => {
  try {
    const productList = await prisma.products.findMany();
    res.status(200).json({ success: true, products: productList });
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Post new product
export const postedProducts = async (req, res) => {
  const {
    productName,
    description,
    price,
    category,
    brand,
    review,
    quantity,
    createdAt,
  } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    if (
      !image ||
      !productName ||
      !description ||
      !price ||
      !category ||
      !brand ||
      !quantity
    ) {
      return res.status(400).send("All fields are required");
    }

    const result = await cloudinary.uploader.upload(image, {
      folder: "ecommerce-products",
    });

    const imageUrl = result.secure_url;

    const newProduct = await prisma.products.create({
      data: {
        productName,
        description,
        image: imageUrl,
        price: parseFloat(price),
        category,
        brand,
        review: 0,
        createdAt,
        quantity: parseInt(quantity),
      },
    });


    res.status(201).json({
      message: "Product created successfully",
      product: newProduct,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add to wishlist
export const addToWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const wishlist = await prisma.wishList.create({
      data: {
        userId: parseInt(userId),
        productId: parseInt(productId),
      },
    });
    console.log("Wishlist item added:", wishlist);
    res.status(201).json({ success: true, wishlist});
  } catch (err) {
    console.error("Error adding to wishlist:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get user's wishlist
export const getWishlist = async (req, res) => {
  const { userId } = req.params;
  try {
    const getWishlist = await prisma.wishList.findMany({
      where: { userId: parseInt(userId) },
      include: { product: true },
    });
    console.log("Wishlist fetched:", getWishlist);
    res.status(200).json({ success: true, wishlist : getWishlist });
  } catch (err) {
    console.error("Error fetching wishlist:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Remove from wishlist
export const removeFromWishlist = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await prisma.wishList.delete({
      where: {
        userId_productId: {
          userId: parseInt(userId),
          productId: parseInt(productId),
        },
      },
    });
    res.status(200).json({ success: true, message: "Removed from wishlist" });
  } catch (err) {
    console.error("Error removing from wishlist:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add to cart
export const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cartItem = await prisma.cart.upsert({
      where: {
        userId_productId: {
          userId: parseInt(userId),
          productId: parseInt(productId),
        },
      },
      update: {
        quantity: { increment: quantity ? parseInt(quantity) : 1 },
      },
      create: {
        userId: parseInt(userId),
        productId: parseInt(productId),
        quantity: quantity ? parseInt(quantity) : 1,
      },
    });
    console.log("Cart item added/updated:", cartItem);
    res.status(201).json({ success: true, cart: cartItem });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await prisma.cart.findMany({
      where: { userId: parseInt(userId) },
      include: { product: true },
    });
    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const updateCart = async (req, res) => {
  const { userId, items } = req.body;
  // items = [{ productId, quantity }, ...]

   if (!Array.isArray(items)) {
    return res.status(400).json({ error: "items must be an array" });
  }
  
  try {
    for (let item of items) {
      await prisma.cart.update({
        where: {
          userId_productId: {
            userId: userId,
            productId: item.productId,
          },
        },
        data: {
          quantity: item.quantity,
        },
      });
    }

    // Return updated cart for this user
    const updatedCart = await prisma.cart.findMany({
      where: { userId },
      include: { product: true },
    });

    console.log("Cart updated:", updatedCart)
    res.json(updatedCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update cart" });
  }
};


// Remove from cart
export const removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    await prisma.cart.delete({
      where: {
        userId_productId: {
          userId: parseInt(userId),
          productId: parseInt(productId),
        },
      },
    });
    res.status(200).json({ success: true, message: "Removed from cart" });
  } catch (err) {
    console.error("Error removing from cart:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add product to new arrivals
export const addNewArrival = async (req, res) => {
  const { productId } = req.body;
  try {
    // Ensure the product exists
    const product = await prisma.products.findUnique({
      where: { id: parseInt(productId) },
    });
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    // Create new arrival entry
    const newArrival = await prisma.newarrival.create({
      data: {
        productId: parseInt(productId),
      },
    });

    res.status(201).json({ success: true, newArrival });
  } catch (err) {
    console.error("Error adding new arrival:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get new arrivals
export const newArrival = async (_, res) => {
  try {
    const newArrivals = await prisma.products.findMany({
      include: {
        newarrival: true,
      },
    });

    res.status(200).json({ success: true, newarrival: newArrivals });
  } catch (err) {
    console.error("Error fetching new arrivals:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};


/**
 * Checkout (create order + order items)
 */
export const checkout = async (req, res) => {
  try {
    const { userId, items, method } = req.body;
    // items = [{ productId, quantity }]

    // Calculate total
    let total = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.products.findUnique({ where: { id: item.productId } });
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: `Product ${item.productId} not available` });
      }

      total += product.price * item.quantity;
      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price,
      });

      // Decrease stock
      await prisma.products.update({
        where: { id: product.id },
        data: { stock: { decrement: item.quantity } }
      });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        status: "pending",
        orderItems: { create: orderItemsData },
        payment: {
          create: {
            amount: total,
            method,
            status: "unpaid",
          }
        }
      },
      include: { orderItems: true, payment: true }
    });

    res.status(201).json({ message: "Order created", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Checkout failed" });
  }
};

/**
 * Get all orders by user
 */
export const getOrdersByUser = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: parseInt(req.params.userId) },
      include: { orderItems: true, payment: true }
    });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

/**
 * Simulate payment (mark order as paid)
 */
export const simulatePayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; // "paid" or "failed"

    const payment = await prisma.payment.update({
      where: { orderId: parseInt(orderId) },
      data: { status }
    });

    // Update order status if paid
    if (status === "paid") {
      await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: { status: "paid" }
      });
    }

    res.json({ message: "Payment updated", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment update failed" });
  }
};