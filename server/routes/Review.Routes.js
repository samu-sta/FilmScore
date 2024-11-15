import express from 'express';
import { reviewController } from '../controllers/Review.Controller.js';

const router = express.Router();

router.get('/:movieId', reviewController.getContentReviews);
router.post('/', reviewController.postContentReview);
router.delete('/:reviewId', reviewController.removeContentReview);

export default router;