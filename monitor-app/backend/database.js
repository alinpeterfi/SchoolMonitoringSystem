const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "licenta",
  // so we can send multiple queries in one request
  multipleStatements: true,
});

app.post("/signup", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const lastName = req.body.lastName;
  const firstName = req.body.firstName;
  const phone = req.body.phone;
  db.query(
    "INSERT INTO students (username, password, email, lastName, firstName, phone) VALUES (?,?,?,?,?,?)",
    [username, password, email, lastName, firstName, phone],
    (err, result) => {
      console.log(err);
      if (err) {
        // res.send({ err: err });
        if (err.code == "ER_DUP_ENTRY" || err.errno == 1062) {
          res.send({ message: "Username already taken!" });
          return;
        } else {
          console.log("Other error in the query");
        }
      } else {
        console.log(result);
        res.send(result);
      }
    }
  );
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  db.query(
    "SELECT * FROM students WHERE username = ? AND password = ?",
    [username, password],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        res.send(result);
        console.log(result);
      } else {
        res.send({ message: "Wrong username/password!" });
      }
    }
  );
});

app.post("/controlpanel", (req, res) => {
  const rfid = req.body.rfid;
  const unicode = req.body.unicode;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phone = req.body.phone;
  const username = req.body.username;
  const sms = req.body.sms;

  db.query(
    "UPDATE students SET rfid = ?, unicode = ?, firstName = ?, lastName = ?, email = ?, phone = ?, sms = ? WHERE username = ?; SELECT * FROM students WHERE username = ?",
    // "INSERT INTO students (rfid, unicode) VALUES (?,?) WHERE username = ?",
    [rfid, unicode, firstName, lastName, email, phone, sms, username, username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.post("/home", (req, res) => {
  const username = req.body.username;

  db.query(
    "SELECT * FROM students WHERE username = ?",
    // "INSERT INTO students (rfid, unicode) VALUES (?,?) WHERE username = ?",
    [username],
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }
      if (result.length > 0) {
        res.send(result);
        console.log(result);
      }
    }
  );
});

app.listen(3001, () => {
  console.log("running server");
});
