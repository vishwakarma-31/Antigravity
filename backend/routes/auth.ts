import { Router } from 'express';
import { hash } from 'bcryptjs';
import { z } from 'zod';
import connectDB from '../lib/db.js';
import { User } from '../models/User.js';

const router = Router();

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = registerSchema.parse(req.body);
    await connectDB();

    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const passwordHash = await hash(password, 12);

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: passwordHash,
      role: 'customer',
    });

    res.status(201).json({ message: 'User created successfully', userId: user._id });
  } catch (error: any) {
    if (error?.name === 'ZodError') {
      return res.status(400).json({ error: error.errors[0].message });
    }
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;