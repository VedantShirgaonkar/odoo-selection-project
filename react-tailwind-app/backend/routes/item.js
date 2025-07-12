import express from 'express';
import { createItem, getItems, getItemById } from '../controllers/itemController.js';
const router = express.Router();

router.post('/', createItem);
router.get('/', getItems);
router.get('/:id', getItemById);

export default router;
