import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { generate } from '../controllers/tryOnController.js';

const router = Router();

router.post(
  '/generate',
  upload.fields([
    { name: 'personImage', maxCount: 1 },
    { name: 'dressImage', maxCount: 1 },
  ]),
  generate,
);

export default router;
