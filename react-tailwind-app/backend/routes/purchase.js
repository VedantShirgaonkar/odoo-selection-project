import express from 'express';
import { getPurchasesByUser } from '../controllers/userController.js';
const router = express.Router();

router.get('/', getPurchasesByUser);

export default router;
