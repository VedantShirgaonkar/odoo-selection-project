
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const createItem = async (req, res) => {
  try {
    const { title, description, category, type, size, condition, tags, images, uploaderId } = req.body;
    if (!title || !description || !category || !type || !size || !condition || !uploaderId) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    const item = await prisma.item.create({
      data: {
        title,
        description,
        category,
        type,
        size,
        condition,
        tags: tags || [],
        images: images || [],
        uploaderId,
        status: 'PENDING',
      },
    });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: 'Create item failed', details: err.message });
  }
};

export const getItems = async (req, res) => {
  try {
    const { uploaderId } = req.query;
    const where = uploaderId ? { uploaderId } : undefined;
    const items = await prisma.item.findMany({
      where,
      include: { uploader: true, swapRequests: true },
      orderBy: { createdAt: 'desc' },
    });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: 'Get items failed', details: err.message });
  }
};

export const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.item.findUnique({
      where: { id },
      include: { uploader: true, swapRequests: true },
    });
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: 'Get item by id failed', details: err.message });
  }
};
