import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({
      where: { id },
      include: { items: true, swapRequests: true, userSwaps: true },
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Get user failed', details: err.message });
  }
};

export const getPurchasesByUser = async (req, res) => {
  try {
    const { userId } = req.query;
    if (!userId) return res.status(400).json({ error: 'Missing userId' });
    // Find all swapRequests where requesterId = userId
    const purchases = await prisma.swapRequest.findMany({
      where: { requesterId: userId },
      include: { item: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: 'Get purchases failed', details: err.message });
  }
};
