import express from 'express';
import cors from 'cors';
// import * as bodyParser from 'body-parser';
import { logger } from './services/loggerService.js';
import { login, logout } from './controllers/userController.js';
import { getAuthors, createAuthor } from './controllers/authorController.js';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.post('/login', login);
app.post('/logout', logout);
app.get('/authors', getAuthors);
app.post('/authors', createAuthor);

app.listen(PORT, () => {
    logger.info(`Server started on port ${PORT}`);
});