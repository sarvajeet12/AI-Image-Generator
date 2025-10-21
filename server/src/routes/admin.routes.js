import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';
import { listUsers, listPayments, stats, adjustUserPoints, exportCsv } from '../controllers/admin.controller.js';

const router = Router();

router.use(requireAuth, requireRole('admin'));

router.get('/users', listUsers);
router.get('/payments', listPayments);
router.get('/stats', stats);
router.patch('/users/:id/points', adjustUserPoints);
router.get('/export', exportCsv);

export default router;
