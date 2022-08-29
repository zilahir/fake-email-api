import { Router } from 'express';

import { createNewEmail, getEmail } from '@/controllers/email';

const router: Router = Router();

router.get('/', [getEmail]);
router.post('/', [createNewEmail]);

export default router;
