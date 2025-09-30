import prisma from "../prisma/prismaClient.js";
import { uploadProfilePicture, uploadProductImage } from "../utils/cloudinary.js";


// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// add new product
export const addProduct = async (req, res) => {
  const {
    productName,
    description,
    price,
    category,
    color,
    material,
    weight,
    brand,
  } = req.body;
  const imagePath = req.file && req.file.path;

  try {
   
    const result = await uploadProductImage(imagePath);
    const newProduct = await prisma.products.create({
      data: {
        productName,
        description,
        price: Number(price),
        category,
        image: result,
        color,
        material,
        weight: Number(weight),
        brand,
        review: 0,
        quantity: 1,
      },
    });
    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get all the products
export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.products.findMany();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// edit product
export const editProduct = async (req, res) => {
  const { id } = req.params;
  const { productName, description, price, category } = req.body;
  const image = req.file && req.file.path;
  try {
    // Check if product exists
    const existingProduct = await prisma.products.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    // update data
    const updateData = {
      productName:
        productName !== undefined ? productName : existingProduct.productName,
      description:
        description !== undefined ? description : existingProduct.description,
      price: price !== undefined ? Number(price) : existingProduct.price,
      category: category !== undefined ? category : existingProduct.category,
    };

    console.log(updateData);
    // Add image path if new image was uploaded
    if (image) {
      updateData.image = image;
    }

    const updatedProduct = await prisma.products.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    return res.status(200).json({
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// delete product
export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    cloudinary.uploader.destroy(id);
    await prisma.products.delete({
      where: { id: Number(id) },
    });
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// get all the orders
export const getAllOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        orderItems: { include: { product: true } },
        payment: true,
        user: true,
        address: true,
      },
    });
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// confirm order
export const confirmOrder = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await prisma.order.findUnique({
      where: { id: parseInt(orderId) },
      include: { user: true },
    });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.status === "confirmed") {
      return res.status(400).json({ message: "Order is already confirmed" });
    }
    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(orderId) },
      data: { status: "confirmed" },
      include: { user: true },
    });

    await prisma.notification.create({
      data: {
        title: "Order Confirmed",
        type: "order",
        userId: order.user.id,
        message: `Your order #${order.id} has been confirmed, you will receive the product shortly.`,
      },
    });
    res.json({ message: "Order confirmed successfully", order: updatedOrder });
  } catch (error) {
    console.error("Error confirming order:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// contact messages
export const getAllMessages = async (_, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// create contact message 
export const createContactMessage = async (req, res) => {
  const {fullName, email, message } = req.body;
  
  if(!fullName || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }
  
  try{
    const newMessage = await prisma.contactMessage.create({
      data: {
        fullName,
        email,
        message,
        isRead: false,
      }
    });

    console.log(newMessage)
    res.status(201).json(newMessage);
  } catch (error) {
    console.error("Error creating contact message:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

// mark message as read
export const markMessageAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    const message = await prisma.contactMessage.findUnique({
      where: { id: parseInt(id) },
    });
    if (!message) {
      return res.status(404).json({ message: "Message not found" });
    }
    if (message.isRead) {
      return res.status(400).json({ message: "Message is already read" });
    }
    const updatedMessage = await prisma.contactMessage.update({
      where: { id: parseInt(id) },
      data: { isRead: true },
    });
    res.json({ message: "Message marked as read", message: updatedMessage });
  } catch (error) {
    console.error("Error marking message as read:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
