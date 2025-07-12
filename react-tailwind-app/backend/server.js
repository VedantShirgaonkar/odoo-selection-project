import express, { json } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { PrismaClient } from '@prisma/client';

config();
const app = express();
const prisma = new PrismaClient();

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
  res.send('ReWear API is running!');
});


import authRoutes from './routes/auth.js';
import itemRoutes from './routes/item.js';
import swapRoutes from './routes/swap.js';
import adminRoutes from './routes/admin.js';
import userRoutes from './routes/user.js';
import purchaseRoutes from './routes/purchase.js';

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/swaps', swapRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/users', userRoutes);
app.use('/api/purchases', purchaseRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
