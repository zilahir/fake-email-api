import { Router } from 'express';

import { getEmail } from '@/controllers/email';

const router: Router = Router();

router.get('/', [getEmail]);

export default router;
