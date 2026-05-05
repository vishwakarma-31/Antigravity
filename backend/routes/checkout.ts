import { Router } from 'express';
import { z } from 'zod';
import crypto from 'crypto';
import Razorpay from 'razorpay';
import { Order } from '../models/Order.js';

const router = Router();

const checkoutSchema = z.object({
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

async function getRazorpay() {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });
}

router.post('/', async (req, res) => {
  try {
    const data = checkoutSchema.parse(req.body);
    const receiptId = `receipt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const razorpay = await getRazorpay();

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(data.total * 100),
      currency: 'INR',
      receipt: receiptId,
      notes: {
        items: JSON.stringify(
          data.items.map((i: any) => ({ productId: i.productId, quantity: i.quantity }))
        ),
      },
    });

    res.json({
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    if (error?.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Checkout failed' });
  }
});

router.put('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const body = req.body;
    const signature = req.headers['x-razorpay-signature'];

    if (!signature) {
      return res.status(400).json({ error: 'No signature' });
    }

    const secret = process.env.RAZORPAY_WEBHOOK_SECRET!;
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(body)
      .digest('hex');

    if (signature !== expectedSignature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }

    const event = JSON.parse(body.toString());

    if (event.event === 'payment.captured') {
      const payment = event.payload.payment;
      console.log('Payment captured:', payment.entity.id);
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(500).json({ error: 'Webhook handler failed' });
  }
});

export default router;