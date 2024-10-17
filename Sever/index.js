import express from 'express'
import {dbPromise} from './models/db.js'
import {initDb} from './models/db.js'
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.static(path.join(__dirname, '../Client')))
app.use(express.json());
app.use(cors());

app.listen(5000, async () => {
  const db = await dbPromise;
  await initDb(db);
  console.log("Server Started")
})

app.get('/user', async (req, res) => {
  res.sendFile(path.join(__dirname, '../Client/main.html'))
})

app.post('/user', async (req, res) => {
  
  const { name, password, email } = req.body;
  const db = await dbPromise;

  try{
    await db.run('INSERT INTO users (name, password, email) VALUES (?, ?, ?)', [name, password, email]);
    res.status(201).json({messge: 'User created'});
  }catch (error){
    res.status(500).json({message: error.message});
  }

})

app.get('/users', async (req, res) => {
  const db = await dbPromise;

  try {
    const users = await db.all(`SELECT * FROM users`);
    res.status(200).json(users);
  }catch(error){
    res.status(500).json({error: error.message});
  }
})

