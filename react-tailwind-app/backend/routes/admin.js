import express from 'express';
import { approveItem, rejectItem, removeItem } from '../controllers/adminController.js';
const router = express.Router();

router.post('/approve/:id', approveItem);
router.post('/reject/:id', rejectItem);
router.delete('/remove/:id', removeItem);

export default router;
