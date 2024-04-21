import express from 'express'
import { signin, signup, google, signout, forgotPassword, resetPassword } from '../controllers/auth.controllers.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/google', google);
router.get('/signout', signout);
router.post('/forgotpassword', forgotPassword);
router.post('/resetpassword', resetPassword);


export default router;