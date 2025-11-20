import { Request, Response } from 'express';
import { readFile, writeFile } from '../utils/fileHelper.js';

const DB_FILE = 'authors.json';

export const getAuthors = async (req: Request, res: Response) => {
    const authors = await readFile(DB_FILE);
    res.json(authors);
};

export const createAuthor = async (req: Request, res: Response) => {
    const { name, avatar } = req.body;
    const authors = await readFile<any>(DB_FILE);

    if (authors.find(a => a.name === name)) {
        return res.status(400).json({ message: "Author with that name already exists" });
    }

    const newAuthor = { id: Date.now().toString(), name, avatar };
    authors.push(newAuthor);
    await writeFile(DB_FILE, authors);

    res.json(newAuthor);
};