import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import {logger} from "../services/loggerService.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const readFile = async <T>(fileName: string): Promise<T[]> => {
    const filePath = path.join(__dirname, '../db', fileName);
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        logger.error(`Error while reading ${fileName}`);

        return [];
    }
};

export const writeFile = async <T>(fileName: string, data: T[]): Promise<void> => {
    const filePath = path.join(__dirname, '../db', fileName);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
};