import { Router } from 'express';
import { login, register } from '../controllers/auth.controller.js';
import { validate } from '../middlewares/validate.js';
import { loginValidator, registerValidator } from '../validators/auth.validators.js';
import { requireAuth, requireRole } from '../middlewares/auth.js';

const router = Router();

router.post('/login', loginValidator, validate, login);
router.post('/register', registerValidator, validate, register);

// registrar nuevos usuarios (si tiene rol ADMIN)
router.post('/admin/register', requireAuth, requireRole('ADMIN'), registerValidator, validate, register);

export default router;