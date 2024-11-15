import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
// fix path issue
import { fileURLToPath } from 'url';
import {methods as authentication} from './controllers/authentication.controller.js';
import { PORT, API_URLS, BASE_URL } from '../constants/constants.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client/public')));

app.listen(PORT, () => {
    console.log(`Server is running on ${BASE_URL}`);
});


app.get(API_URLS.MOVIES, authentication.getMovies);
app.post(API_URLS.LOGIN, authentication.login);
app.post(API_URLS.REGISTER, authentication.register);
app.post(API_URLS.LOGOUT, authentication.logout);
app.get(API_URLS.EMAIL, authentication.getEmail);
app.get(API_URLS.PROFILE, authentication.getProfileDetails);
app.put(API_URLS.PROFILE, authentication.putProfileDetails);
app.delete(API_URLS.PROFILE, authentication.deleteProfile);
app.put(API_URLS.PASSWORD, authentication.changePassword);
app.get(API_URLS.REVIEW_PARAMS, authentication.getContentReviews);
app.post(API_URLS.REVIEW, authentication.postContentReview);
app.delete(API_URLS.REVIEW_DELETE, authentication.removeContentReview);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
  });