import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// ➕ إضافة طلب
router.post("/", async (req, res) => {
  const { items, total } = req.body;

  const order = new Order({ items, total });
  await order.save();

  res.json(order);
});

// 📦 جلب الطلبات
router.get("/", async (req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

export default router;