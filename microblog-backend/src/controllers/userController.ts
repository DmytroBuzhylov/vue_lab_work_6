import { Request, Response } from 'express';
import { readFile, writeFile } from '../utils/fileHelper.js';
import { logger } from '../services/loggerService.js';

const DB_FILE = 'users.json';

export const login = async (req: Request, res: Response) => {
    const { login, password } = req.body;

    logger.info(`Attempting login for user: ${login}`);

    const users = await readFile<any>(DB_FILE);

    const userIndex = users.findIndex(u => u.login === login && u.password === password);

    if (userIndex !== -1) {
        users[userIndex].isLoggedIn = true;
        await writeFile(DB_FILE, users);

        logger.success(`User ${login} logged in successfully`);

        res.json({ success: true });
    } else {

        logger.error(`Failed login attempt for user: ${login}`);
        res.status(401).json({ success: false, message: "Invalid credentials" });
    }
};

export const logout = async (req: Request, res: Response) => {
    const { login } = req.body;

    logger.info(`Attempting logout for user: ${login}`);

    const users = await readFile<any>(DB_FILE);
    const user = users.find(u => u.login === login);
    if (user) {
        user.isLoggedIn = false;
        await writeFile(DB_FILE, users);
    }

    logger.success(`User ${login} logout in successfully`);


    res.json({ success: true });
};