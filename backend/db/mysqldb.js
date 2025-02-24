import mysql from 'mysql2';

export const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "nati0975329588@babi",
    database: "test",
    port: 3306,
  });