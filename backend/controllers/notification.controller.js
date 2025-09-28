import prisma from "../prisma/prismaClient.js";


// Get notifications for a user
export const getNotifications = async (req, res) => {
  const { userId } = req.params;
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: Number(userId) },
      orderBy: { createdAt: 'desc' },
    });
    console.log("Notifications fetched:", notifications);
    res.json({ notifications });
  } catch (err) {
     console.error("Error fetching notifications:", err);
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
};

// Mark notification as read
export const markAsRead = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.notification.update({
      where: { id: Number(id) },
      data: { isRead: true }
    });
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to update notification" });
  }
};