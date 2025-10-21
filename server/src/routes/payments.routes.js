import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { createOrder, verifyPayment } from '../controllers/payments.controller.js';

const router = Router();

router.use(requireAuth);

router.post('/order', createOrder);
router.post('/verify', verifyPayment);

export default router;
