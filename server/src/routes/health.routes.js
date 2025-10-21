import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  res.json({ ok: true, timestamp: Date.now() });
});

export default router;
