import prisma from "../prisma/prismaClient.js";
import dotenv from "dotenv";
import cloudinary from "./cloudinary folder/cloudinary.js";

dotenv.config();

// Get all products
export const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const skip = (page - 1) * limit;
  const search = req.query.search || "";

  try {
    const [products, total] = await Promise.all([
      prisma.products.findMany({
        where: {
          productName: {
            contains: search,
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
      }),
      prisma.products.count({
        where: {
          productName: {
            contains: search,
          },
        },
      }),
    ]);

    res.json({
      products,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch products" });
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
    res.status(201).json({ success: true, wishlist });
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
    res.status(200).json({ success: true, wishlist: getWishlist });
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
    const cart = await prisma.cart.upsert({
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
    res.status(201).json({ success: true, cart });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get user's cart
export const getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cartItem = await prisma.cart.findMany({
      where: { userId: parseInt(userId) },
      include: { product: true },
    });
    res.status(200).json({ success: true, cart: cartItem });
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

    console.log("Cart updated:", updatedCart);
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

// Get related products based on category
export const getRelatedProducts = async (req, res) => {
  const { productId } = req.params;
  const limit = parseInt(req.query.limit) || 8;
  
  if (!productId || isNaN(parseInt(productId))) {
    return res.status(400).json({
      error: "Invalid product ID",
      details: `Product ID must be a valid integer, received: ${productId}`,
    });
  }

  try {
    const product = await prisma.products.findUnique({
      where: { id: parseInt(productId) },
    });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    if (!product.category) {
      return res.status(400).json({ error: "Product category is missing" });
    }

    const related = await prisma.products.findMany({
      where: {
        category: product.category,
        id: { not: parseInt(productId) },
      },
      take: limit,
    });

    res.json({ items: related });
  } catch (err) {
    console.error("Error in getRelatedProducts:", err);
    res.status(500).json({
      error: "Failed to fetch related products",
      details: err.message,
    });
  }
};

// get recomended for user
export const getRecommendedProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    // get last 4 purchased products by the user
    const userOrders = await prisma.order.findMany({
      where: { userId: Number(userId) },
      include: { orderItems: true },
      take: 4,
    });

    let productId = [];
    userOrders.forEach((order) => {
      order.orderItems.forEach((item) => {
        productId.push(item.productId);
      });
    });

    //  recommend based on categories of purchased products
    let recommended;
    if (productId.length > 0) {
      recommended = await prisma.products.findMany({
        where: {
          category: {
            in: await prisma.products
              .findMany({
                where: { id: { in: productId } },
                select: { category: true },
              })
              .then((cats) => cats.map((c) => c.category)),
          },
          NOT: { id: { in: productId } },
        },
        take: 6,
      });
    } else {
      // If no history, recommend popular products
      recommended = await prisma.products.findMany({
        include: { orderItems: true },
        take: 4,
      });
    }

    console.log("Recommended products for user", userId, ":", recommended);

    res.status(200).json({ message: "Recommended products fetched", recommendedProducts: recommended });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recommended products" });
  }
};

// Checkout
export const checkout = async (req, res) => {
  try {
    const { userId, items, method, shippingAddress, country, city, } = req.body;
      if (!Array.isArray(items)) {
    return res.status(400).json({ error: "Invalid items: must be an array" });
  }
    // Calculate total
    let total = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.products.findUnique({
        where: { id: item.productId },
      });
      if (!product) {
        return res
          .status(400)
          .json({ message: `Product ${item.productId} not available` });
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
        data: { quantity: { decrement: item.quantity } },
      });
    }

    const order = await prisma.order.create({
      data: {
        userId,
        total,
        address: shippingAddress,
        country,
        city,
        status: "pending",
        orderItems: { create: orderItemsData },
        payment: {
          create: {
            amount: total,
            method,
            status: "unpaid",
          },
        },
      },
      include: { orderItems: { include: { product: true } }, payment: true },
    });

    // after purchase clear user's cart
    await prisma.cart.deleteMany({ where: { userId } });

    const products = order.orderItems.map(item => item.product);
    res.status(201).json({ success: true, message: "Order created", order, products });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Checkout failed" });
  }
};

// validate coupon
export const validateCoupon = async (req, res) => {
  const { code } = req.body;
  const coupon = await prisma.coupon.findUnique({ where: { code } });
  if (!coupon || !coupon.active || (coupon.expiresAt && new Date() > coupon.expiresAt)) {
    return res.status(400).json({ valid: false, message: "Invalid or expired coupon" });
  }
  res.json({ valid: true, coupon });
};

// Get orders by user
export const getOrdersByUser = async (req, res) => {
  const { userId } = req.params;
  try {
    const orders = await prisma.order.findMany({
      where: { userId: parseInt(userId) },
      include: { orderItems: { include: { product: true } }, payment: true },
    });
    console.log("Orders fetched for user", userId, ":", orders);
    res.json({ success: true, orders });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};

