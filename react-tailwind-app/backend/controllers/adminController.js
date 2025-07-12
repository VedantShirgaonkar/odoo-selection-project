import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export const approveItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.item.update({
      where: { id },
      data: { status: 'AVAILABLE' },
    });
    res.json({ message: 'Item approved', item });
  } catch (err) {
    res.status(500).json({ error: 'Approve item failed', details: err.message });
  }
};

export const rejectItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.item.update({
      where: { id },
      data: { status: 'REJECTED' },
    });
    res.json({ message: 'Item rejected', item });
  } catch (err) {
    res.status(500).json({ error: 'Reject item failed', details: err.message });
  }
};

export const removeItem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.item.delete({ where: { id } });
    res.json({ message: 'Item removed' });
  } catch (err) {
    res.status(500).json({ error: 'Remove item failed', details: err.message });
  }
};
