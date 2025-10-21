import { Router } from 'express';
import { requireAuth } from '../middleware/auth.js';
import { generateFromPrompt, myGenerations } from '../controllers/images.controller.js';

const router = Router();

router.post('/generate', requireAuth, generateFromPrompt);
router.get('/my', requireAuth, myGenerations);

export default router;
