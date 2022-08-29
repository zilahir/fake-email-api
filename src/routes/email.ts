import { Router } from 'express';

import { createNewEmail, getEmail, getOneById } from '@/controllers/email';

const router: Router = Router();

router.get('/all', [getEmail]);
router.get('/:id', [getOneById]);
router.post('/', [createNewEmail]);

export default router;
