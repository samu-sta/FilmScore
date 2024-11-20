// client/src/services/reviewService.js
import { API_URLS } from '../../../constants/constants.js';


async function fetchReviews(movieId) {
  try {
    const response = await fetch(`${API_URLS.REVIEW}/${movieId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
}

async function createReview(review) {
  try {
    const response = await fetch(`${API_URLS.REVIEW}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review)
    });
    return await response.json();
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
}

async function deleteReview(userFk, contentFk) {
  try {
    const response = await fetch(`${API_URLS.REVIEW}/${userFk}/${contentFk}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
}

export const reviewService = {
  fetchReviews,
  createReview,
  deleteReview
};