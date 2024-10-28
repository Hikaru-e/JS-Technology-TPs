import { Request, Response } from 'express';
import Book from '../models/book.model';

export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const addBook = async (req: Request, res: Response) => {
  try {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await Book.findByIdAndDelete(id);
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
};
