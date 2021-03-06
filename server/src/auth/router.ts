import './config/passport';

import { Router } from 'express';

import { googleCallback } from './handlers/googleCallback';
import { googleLogin } from './handlers/googleLogin';
import { getMe } from './handlers/me';
import { authMiddleware } from './middleware/authMiddleware';
import { googleAuthMiddleware } from './middleware/googleAuthMiddleware';

const authRouter = Router();

authRouter.get('/me', authMiddleware, getMe);

authRouter.get('/google/login', googleLogin);
authRouter.get('/google/callback', googleAuthMiddleware, googleCallback);

export { authRouter };
