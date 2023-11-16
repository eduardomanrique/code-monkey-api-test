import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

export const openDb = async () => {
  return open({
    filename: './mydb.sqlite',
    driver: sqlite3.Database
  });
};

export const setupDatabase = async () => {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      isbn TEXT NOT NULL
    )
  `);
};