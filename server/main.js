import express from 'express';
import path from 'path';
// fix path issue
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));


const app = express();

app.use(express.static(path.join(__dirname, '../public')));

const PORT = process.env.PORT || 5173;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
