import express from 'express';
import { getAllBooks, addBook, deleteBook } from '../controllers/book.controller';

const router = express.Router();

router.get('/', getAllBooks);
router.post('/', addBook);
router.delete('/:id', deleteBook);

export default router;
