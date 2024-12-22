import { API_URLS, BASE_URL, ERROR_MESSAGES } from '../../../constants/constants.js';

export async function fetchMovies() {
  try {
    const res = await fetch(`${BASE_URL}${API_URLS.MOVIES}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(ERROR_MESSAGES.FETCH_ERROR, error);
  }
}
