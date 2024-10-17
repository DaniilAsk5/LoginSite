import sqlite3 from 'sqlite3'
import { open } from 'sqlite';

const dbPromise = open({
  filename: "./models/database.db",
  driver: sqlite3.Database
})

const initDb = async (db) => {
  

  try {
    await db.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      email TEXT NOT NULL
    )`);
    console.log('Table created or already exists.');
} catch (error) {
    console.error('Error creating table:', error);
}

    console.log("Database already create!")
}

export {dbPromise, initDb} 