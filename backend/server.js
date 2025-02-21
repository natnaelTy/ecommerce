import express from "express";
import  router  from "./router/auth-router.js";
import mysql from 'mysql2';
import dotenv from 'dotenv';


const PORT = 5000 || 3000


dotenv.config();

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password:"nati0975329588@babi",
  database: "test",
  port: 3306,
});


const app = express();

app.use(router)

app.get('/user', (req, res) => {
  pool.query('select * from user', (err, results) => {
    if (err) {
      console.error('Error executing query:', err.stack);
      res.status(500).send('Database error');
      return;
    }
    res.send(results);
  });
});

app.listen(PORT, () => {
    console.log(`Server is is running on ${PORT}`);
})