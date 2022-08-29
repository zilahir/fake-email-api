import { Router } from 'express';

import { createNewEmail, getAllEmail, getOneById } from '@/controllers/email';

const router: Router = Router();

router.get('/all', [getAllEmail]);
router.get('/:id', [getOneById]);
router.post('/', [createNewEmail]);

export default router;
