import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { login, logout } from './controllers/userController.js';
import { getAuthors, createAuthor } from './controllers/authorController.js';

const app = express();
const PORT = 3000;

app.use(cors());

app.use(bodyParser.json());

app.post('/login', login);
app.post('/logout', logout);
app.get('/authors', getAuthors);
app.post('/authors', createAuthor);

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});