import express from 'express';
import { contentController } from '../controllers/Content.Controller.js';

const router = express.Router();

router.get('/', contentController.getMovies);

export default router;