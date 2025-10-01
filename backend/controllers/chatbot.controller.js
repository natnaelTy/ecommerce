import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const HF_API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-base";

export const chatHandler = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      HF_API_URL,
      { inputs: message },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`,
        },
      }
    );

    const botReply = response.data[0]?.generated_text || "Sorry, I didn’t get that.";
    res.json({ reply: botReply });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Chatbot error" });
  }
};
