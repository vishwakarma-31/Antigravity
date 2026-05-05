import { Router } from 'express';
import { z } from 'zod';
import connectDB from '../lib/db.js';
import { Order } from '../models/Order.js';

const router = Router();

const orderSchema = z.object({
  items: z.array(
    z.object({
      productId: z.string(),
      name: z.string(),
      price: z.number(),
      quantity: z.number(),
      size: z.string(),
      color: z.string(),
      image: z.string(),
    })
  ),
  total: z.number(),
  shippingAddress: z.object({
    name: z.string(),
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
    country: z.string(),
  }),
});

router.get('/', async (req, res) => {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

router.post('/', async (req, res) => {
  try {
    const data = orderSchema.parse(req.body);
    await connectDB();

    const order = await Order.create({
      userId: 'guest',
      items: data.items,
      total: data.total,
      shippingAddress: data.shippingAddress,
      status: 'pending',
      paymentStatus: 'pending',
    });

    res.status(201).json({ order });
  } catch (error: any) {
    if (error?.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

export default router;