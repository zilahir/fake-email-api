import { Router } from 'express';

import {
  createNewEmail,
  getAllEmail,
  getOneById,
  insertNewRandomEmail,
  markEmailAsRead,
} from '@/controllers/email';

const router: Router = Router();

router.get('/all/:type', [getAllEmail]);
router.get('/:id', [getOneById]);
router.post('/', [createNewEmail]);
router.post('/:id', [markEmailAsRead]);
router.post('/incoming', [insertNewRandomEmail]);

export default router;
