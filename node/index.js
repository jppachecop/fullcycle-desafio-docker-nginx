const express = require("express");
const mysql = require("mysql");

const app = express();
const port = 3000;
const names = ["JP", "João", "Maria", "José", "Ana"];

const connection = mysql.createConnection({
  host: "database",
  user: "root",
  password: "password",
  database: "db",
});

connection.connect();

const createTableQuery = `CREATE TABLE IF NOT EXISTS people (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL
)`;
connection.query(createTableQuery);

app.get("/", (req, res) => {
  const randomNameToInsert = names[Math.floor(Math.random() * names.length)];

  const insertQuery = `INSERT INTO people(name) VALUES('${randomNameToInsert}')`;
  connection.query(insertQuery);

  const selectQuery = "SELECT name FROM people";
  connection.query(selectQuery, (error, results) => {
    if (error) {
      console.error(error);
      res.send("<h1>Ocorreu um erro :( Tente novamente</h1>");
    }

    const orderedNames = results.map((result) => `<li>${result.name}</li>`);

    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ol>
        ${orderedNames.join("")}
      </ol>
    `);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
