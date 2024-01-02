const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const server = express();

// const bootstrap = require('bootstrap')

server
  .use(express.json())
  .use(express.urlencoded({ extended: false }))
  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

server.get("/resurs/", (req, res) => {
    const url = req.url;
    const db = new sqlite3.Database("./books.db");
    const sql = "SELECT * FROM resurs";
    db.all(sql, (err, rows) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.send(rows);
      }
    });
    res.send(`En förfrågan gjordes till ${url}`)
});

  
server.put('/resurs/', (req, res) => {
    const params = req.params;
    res.send(params);
});

server.post('/resurs/', (req, res) => {
    const body = req.body;
  
    //Spara innehåll i body till databasen
    //Skicka tillbaka svar att det gick bra.
  
    res.send(body);
});
  




//servern
server.listen(3000, () => {
    console.log("Server running on http://localhost:3000.");
  });
  
