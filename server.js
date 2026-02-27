const express = require("express");
const session = require("express-session");
const mysql = require("mysql2");

const app = express();
const PORT = 3000;

// koneksi MySQL
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "xxxx",
  database: "slc03"
});

db.connect(err => {
  if (err) throw err;
  console.log("MySQL connected");
});

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: "secret123",
  resave: false,
  saveUninitialized: false
}));

app.use(express.static("public"));


// REGISTER
app.post("/register", (req, res) => {

  const { username, password } = req.body;

  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";

  db.query(sql, [username, password], (err, result) => {

    if (err) throw err;

    res.redirect("/login.html");

  });

});


// LOGIN
app.post("/login", (req, res) => {

  const { username, password } = req.body;

  const sql = "SELECT * FROM users WHERE username=? AND password=?";

  db.query(sql, [username, password], (err, results) => {

    if (err) throw err;

    if (results.length > 0) {

      req.session.user = username;

      res.redirect("/dashboard");

    } else {

      res.send("Login gagal");

    }

  });

});


// DASHBOARD
app.get("/dashboard", (req, res) => {

  if (!req.session.user) {
    return res.redirect("/login.html");
  }

  res.send(`
    <h2>Dashboard</h2>
    <p>Welcome ${req.session.user}</p>
    <a href="/logout">Logout</a>
  `);

});


// LOGOUT
app.get("/logout", (req, res) => {

  req.session.destroy();

  res.redirect("/login.html");

});


app.listen(PORT, () => {
  console.log("Server running http://localhost:3000");
});