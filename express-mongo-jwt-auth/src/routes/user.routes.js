import express from 'express';
import { UserController } from '../controllers/user.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();
const userController = new UserController();

router.get('/profile', authMiddleware, userController.getProfile);
router.put('/profile', authMiddleware, userController.updateProfile);

export default router;