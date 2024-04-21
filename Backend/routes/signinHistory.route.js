import express from 'express';
import { getSigninHistory } from '../controllers/signinHistory.controller.js';

const router = express.Router();

router.get('/history', getSigninHistory);

export default router;
