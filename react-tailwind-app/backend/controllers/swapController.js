
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createSwap = async (req, res) => {
  try {
    const { userIds, itemIds, type } = req.body;
    if (!userIds || !itemIds || !type) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const swap = await prisma.swap.create({
      data: {
        userSwaps: {
          create: userIds.map(userId => ({ user: { connect: { id: userId } } })),
        },
        itemIds,
        type,
      },
      include: { userSwaps: true },
    });
    res.status(201).json(swap);
  } catch (err) {
    res.status(500).json({ error: 'Create swap failed', details: err.message });
  }
};

export const getSwaps = async (req, res) => {
  try {
    const swaps = await prisma.swap.findMany({
      include: { userSwaps: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(swaps);
  } catch (err) {
    res.status(500).json({ error: 'Get swaps failed', details: err.message });
  }
};

export const getSwapById = async (req, res) => {
  try {
    const { id } = req.params;
    const swap = await prisma.swap.findUnique({
      where: { id },
      include: { userSwaps: true },
    });
    if (!swap) return res.status(404).json({ error: 'Swap not found' });
    res.json(swap);
  } catch (err) {
    res.status(500).json({ error: 'Get swap by id failed', details: err.message });
  }
};
