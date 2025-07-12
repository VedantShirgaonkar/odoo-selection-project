import express from 'express';
import { createSwap, getSwaps, getSwapById } from '../controllers/swapController.js';
const router = express.Router();

router.post('/', createSwap);
router.get('/', getSwaps);
router.get('/:id', getSwapById);

export default router;
