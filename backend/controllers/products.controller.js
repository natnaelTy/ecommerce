import prisma from "../prisma/prismaClient.js";
import dotenv from "dotenv";
import cloudinary from "./cloudinary folder/cloudinary.js";

dotenv.config();

// Get all products
export const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 9;
  const skip = (page - 1) * limit;

  try {
    const [products, total] = await Promise.all([
      prisma.products.findMany({
        skip,
        take: limit,
      }),
      prisma.products.count(),
    ]);

    console.log("Fetched products:", products);
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

// Get related products based on category
export const getRelatedProducts = async (req, res) => {
  const { id } = req.params;
  const { limit } = Number(req.query.limit ?? 8);

  if (Number.isNaN(id)) {
    return res.status(400).json({ error: "Invalid product id" });
  }

  try {
    // 1) Get the product with its categories
    const base = await prisma.products.findUnique({
      where: { id },
      include: {
        categories: { include: { category: true } },
      },
    });

    if (!base) return res.status(404).json({ error: "Product not found" });

    const categoryIds = base.categories.map((pc) => pc.categoryId);

    // No categories? return latest products (excluding itself)
    if (categoryIds.length === 0) {
      const fallback = await prisma.products.findMany({
        where: { id: { not: id } },
        orderBy: { createdAt: "desc" },
        take: limit,
      });
      return res.json({ items: fallback });
    }

    // 2) Find products that share at least one category, exclude self
    const related = await prisma.product.findMany({
      where: {
        id: { not: id },
      AND: {
        categories: {
          some: { categoryId: { in: categoryIds } },
        },
      }},
      take: limit,
      orderBy: { createdAt: "desc" }, // tweak: sales/popularity if you track it
      include: {
        categories: { include: { category: true } },
      },
    });

    // If too few, top up with newest products (deduped)
    if (related.length < limit) {
      const topUp = await prisma.products.findMany({
        where: {
          id: { notIn: [id, ...related.map(r => r.id)] },
        },
        orderBy: { createdAt: "desc" },
        take: limit - related.length,
      });
      return res.json({ items: [...related, ...topUp] });
    }

    res.json({ items: related });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to load related products" });
  }
};

// get recomended for user 
export const getRecommendedProducts = async (req, res) => {
  const { userId } = req.params;

  try {
    // get last 5 purchased products by the user
    const userOrders = await prisma.order.findMany({
      where: { userId: Number(userId) },
      include: { items: true },
      orderBy: { createdAt: "desc" },
      take: 5,
    });

    let productIds = [];
    userOrders.forEach((order) => {
      order.items.forEach((item) => {
        productIds.push(item.productId);
      });
    });

    // If user has order history → recommend based on categories of purchased products
    let recommended;
    if (productIds.length > 0) {
      recommended = await prisma.product.findMany({
        where: {
          category: {
            in: await prisma.products
              .findMany({
                where: { id: { in: productIds } },
                select: { category: true },
              })
              .then((cats) => cats.map((c) => c.category)),
          },
          NOT: { id: { in: productIds } }, // exclude already purchased
        },
        take: 6,
      });
    } else {
      // If no history, recommend random/popular products
      recommended = await prisma.products.findMany({
        take: 6,
        orderBy: { createdAt: "desc" },
      });
    }

    res.json(recommended);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch recommended products" });
  }
};

// Checkout (create order + order items)
export const checkout = async (req, res) => {
  try {
    const { userId, items, method } = req.body;
    // items = [{ productId, quantity }]

    // Calculate total
    let total = 0;
    const orderItemsData = [];

    for (const item of items) {
      const product = await prisma.products.findUnique({ where: { id: item.productId } });
      if (!product) {
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
        data: { quantity: { decrement: item.quantity } },
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