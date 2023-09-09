import mysql from "mysql2";
import "dotenv/config";

// to connect to our local mySQL db
export const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.SQL_PASSWORD,
  database: "electroblog",
});
