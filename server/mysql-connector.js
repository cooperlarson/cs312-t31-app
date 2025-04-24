import mysql from 'mysql';
import * as fs from "node:fs";
const config = JSON.parse(await fs.promises.readFile(new URL('./mysql-config.json', import.meta.url)));

const pool = mysql.createPool({
  connectionLimit: 10,
  host: config.host,
  user: config.user,
  port: config.port,
  password: config.pass,
  multipleStatements: true,
  dateStrings: true,
});

export async function getTable(query) {
  return await runQuery(query);
}

export function runQuery(query, values = []) {
  console.log(query, values);
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        if (connection) connection.release();
        return reject(`Error getting DB connection: ${err.message}`);
      }

      connection.query(query, values, (error, results) => {
        connection.release();
        if (error) {
          return reject(`Query error: ${error.message}`);
        }
        resolve(results);
      });
    });
  });
}
