const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./books.db");

const express = require("express");
const server = express();

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
  });

//servern
server.listen(3000, () => {
  console.log("Server running on http://localhost:3000.");
});

server.get("/books", (req, res) => {
  const sql = "SELECT * FROM books";
  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows);
    }
  });
});

server.get("/books/:id", (req, res) => {
  const id = req.params.id;
  const sql = `SELECT * FROM books WHERE id=${id}`;

  db.all(sql, (err, rows) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(rows[0]);
    }
  });
});

server.post("/books", (req, res) => {
  const book = req.body;
  const sql = `INSERT INTO books(bookTitle, bookIsbn, bookAuthor, bookPrice, bookGenre) VALUES (?,?,?,?,?)`;

  db.run(sql, Object.values(book), (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Book has been added successfully.");
    }
  });
});

server.put("/books", (req, res) => {
  const bodyData = req.body;
  const id = bodyData.id;
  const book = {
    bookTitle: bodyData.bookTitle,
    bookIsbn: bodyData.bookIsbn,
    bookAuthor: bodyData.bookAuthor,
    bookPrice: bodyData.bookPrice,
    bookGenre: bodyData.bookGenre,
  };

  let updateString = "";
  const columnsArray = Object.keys(book);
  columnsArray.forEach((column, i) => {
    updateString += `${column}="${book[column]}"`;
    if (i !== columnsArray.length - 1) updateString += ",";
  });
  const sql = `UPDATE books SET ${updateString} WHERE id=${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res.status(500).send(err);
    } else {
      res.send("Book updated successfully.");
    }
  });
});

server.delete("/books/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM books WHERE id = ${id}`;

  db.run(sql, (err) => {
    if (err) {
      console.log(err);
      res
        .status(500)
        .send({ error: "An error occurred while deleting the resource." });
    } else {
      res.send("Book deleted successfully.");
    }
  });
});
