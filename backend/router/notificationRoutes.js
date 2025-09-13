import express from "express";
import { getNotifications, markAsRead } from "../controllers/notification.controller.js";


const notificationRouter = express.Router();


notificationRouter.get("/:userId", getNotifications);

notificationRouter.patch("/:id/read", markAsRead);

export default notificationRouter;