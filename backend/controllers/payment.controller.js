import axios from "axios";
import prisma from "../prisma/prismaClient.js";
import dotenv from "dotenv";

dotenv.config();

const { CHAPA_SECRET } = process.env;

// initialize chapa pay payment
export const InitializePayment = async (req, res) => {
  const { amount, email, fullName, phone } = req.body;
  const tx_ref = `tx-${Date.now()}`;

  try {
    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        amount,
        currency: "ETB",
        email,
        first_name: fullName, 
        last_name: "",  
        phone_number: phone,
        tx_ref,
        callback_url: "https://your-backend.com/api/payment/verify",
        return_url: "http://localhost:3000/payment-success",
        customization: {
          title: "Product Checkout",
          description: "Payment for products",
        },
      },
      {
        headers: { Authorization: `Bearer ${CHAPA_SECRET}` },
      }
    );

    res.json(response.data); // contains checkout_url
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Payment initialization failed" });
  }
};

// verify chapa pay payment
export const VerifyPayment = async (req, res) => {
  const { tx_ref } = req.params;

  try {
    const response = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: { Authorization: `Bearer ${CHAPA_SECRET}` },
      }
    );
    await prisma.payment.create({
      data: {
        txRef: response.data.data.tx_ref,
        amount: parseFloat(response.data.data.amount),
        currency: response.data.data.currency,
        email: response.data.data.email,
        status: response.data.data.status,
      },
    });

    res.json(response.data);
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Verification failed" });
  }
};

// get payments
export const getAllPayments = async (_, res) => {
  try {
    const payments = await prisma.payment.findMany({
      include: {
        order: {
          include: {
            user: true,
            orderItems: { include: { product: true } },
          },
        },
      },
    });
    console.log("Fetched payments:", payments);
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Simulate payment 
export const simulatePayment = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body; 

    const payment = await prisma.payment.update({
      where: { orderId: parseInt(orderId) },
      data: { status },
    });

    // Update order status if paid
    if (status === "paid") {
      await prisma.order.update({
        where: { id: parseInt(orderId) },
        data: { status: "paid" },
      });
    }

    res.json({ message: "Payment updated", payment });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment update failed" });
  }
};

// get payment by id
export const getPaymentByOrderId = async (req, res) => {
  const { orderId } = req.params;
  try {
    const payment = await prisma.payment.findUnique({
      where: { orderId: parseInt(orderId) },
      include: {
        order: {
          include: {
            user: true,
            orderItems: { include: { product: true } },
          }
        }
      }
    });
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    res.json(payment);
  } catch (error) {
    console.error("Error fetching payment:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};