
import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
    res.send("hi im nati");
});

export default router;