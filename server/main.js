import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
// fix path issue
import { fileURLToPath } from 'url';
import { PORT, BASE_URL } from '../constants/constants.js';
import userRoutes from './routes/User.Routes.js';
import contentRoutes from './routes/Content.Routes.js';
import reviewRoutes from './routes/Review.Routes.js';
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../client/public')));

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on ${BASE_URL}`);
});


app.use('/api/profile', userRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/reviews', reviewRoutes);

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/public', 'index.html'));
  });