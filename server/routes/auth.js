import express from 'express';
import { login, verify } from '../controllers/authControllers.js';  // Import verify from your controller
import authMiddleWare from '../middleware/authMiddleWare.js';

const router = express.Router();

router.post('/login', login);

router.get('/verify', authMiddleWare, verify);  // Fix the route path

export default router;
