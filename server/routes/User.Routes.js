import express from 'express';
import { userController } from '../controllers/User.Controller.js';

const router = express.Router();

router.post('/login', userController.login);
router.post('/register', userController.register);
router.post('/logout', userController.logout);
router.get('/email', userController.getEmail);
router.get('/', userController.getProfileDetails);
router.put('/', userController.putProfileDetails);
router.delete('/', userController.deleteProfile);
router.put('/password', userController.changePassword);

export default router;