import axios from "axios";
import prisma from "../prisma/prismaClient.js";
import dotenv from "dotenv";

dotenv.config();

const { CHAPA_SECRET } = process.env;

// initialize chapa pay payment
export const InitializePayment = async (req, res) => {
  const { amount, email, fullName } = req.body;
  const tx_ref = `tx-${Date.now()}`; // unique reference

  try {
    const response = await axios.post(
      "https://api.chapa.co/v1/transaction/initialize",
      {
        amount,
        currency: "ETB",
        email,
        first_name: fullName, 
        last_name: "",  
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
