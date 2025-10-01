import express from "express";
import { chatHandler } from "../controllers/chatbot.controller.js";


const chatbotRouter = express.Router();


chatbotRouter.post("/chat", chatHandler);

export default chatbotRouter;