import express from 'express';
import { openDb } from '../db';
import { Book } from '../models/book';
const router = express.Router();

router.use(express.json());

router.get('/', async (req, res) => {
  const db = await openDb();
  const books = await db.all('SELECT * FROM books');
  res.json(books);
});

router.get('/:id', async (req, res) => {
  const db = await openDb();
  const book = await db.get('SELECT * FROM books WHERE id = ?', [req.params.id]);
  if (book) {
    res.json(book);
  } else {
    res.status(404).send('Book not found');
  }
});

router.post('/', async (req, res) => {
  const { title, author, isbn } = req.body as Book;
  const db = await openDb();
  const result = await db.run('INSERT INTO books (title, author, isbn) VALUES (?, ?, ?)', [title, author, isbn]);
  const book = await db.get('SELECT * FROM books WHERE id = ?', [result.lastID]);
  res.status(201).json(book);
});

router.put('/:id', async (req, res) => {
  const { title, author, isbn } = req.body as Book;
  const db = await openDb();
  await db.run('UPDATE books SET title = ?, author = ?, isbn = ? WHERE id = ?', [title, author, isbn, req.params.id]);
  const book = await db.get('SELECT * FROM books WHERE id = ?', [req.params.id]);
  res.json(book);
});

router.delete('/:id', async (req, res) => {
  const db = await openDb();
  await db.run('DELETE FROM books WHERE id = ?', [req.params.id]);
  res.status(204).send();
});

export default router;