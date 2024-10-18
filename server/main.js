import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// fix path issue
import { fileURLToPath } from 'url';
import {methods as authentication} from '../controllers/authentication.controller.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}));
app.use(express.static(path.join(__dirname, '../public')));

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


app.get('/api/movies', authentication.getMovies);
app.post('/api/login', authentication.login);
app.post('/api/register', authentication.register);
app.get('/api/profile', authentication.getProfileDetails);
app.put('/api/profile', authentication.putProfileDetails);
app.put('/api/profile/password', authentication.changePassword);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public', 'index.html'));
  });