import express from 'express';
import cors from 'cors';
import ordersRouter from './routes/orders.js';
import productsRouter from './routes/products.js';
import checkoutRouter from './routes/checkout.js';
import authRouter from './routes/auth.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json({ verify: (req: any, res, buf) => {
  if (req.originalUrl === '/api/checkout/webhook') {
    req.body = buf;
  }
}));

app.use('/api/products', productsRouter);
app.use('/api/orders', ordersRouter);
app.use('/api/checkout', checkoutRouter);
app.use('/api/auth', authRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;