const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const session = require("express-session");
const path = require("path");

const app = express();

/* =========================
   ✅ CORS FIXED
========================= */
app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

/* =========================
   🔐 SESSION SETUP
========================= */
app.use(session({
  secret: "sql_security_secret",
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

/* =========================
   🔍 SQL DETECTOR
========================= */
function detectInjection(input) {
  if (!input) return false;

  const patterns = [
    /'/,
    /--/,
    /;/,
    /OR/i,
    /AND/i,
    /=/
  ];

  return patterns.some(p => p.test(input));
}

/* =========================
   🗄️ DB
========================= */
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Kriti@01",
  database: "sql_security",
});

db.connect(err => {
  if (err) console.log("DB Error:", err);
  else console.log("✅ MySQL Connected");
});

/* =========================
   ⚠️ VULNERABLE LOGIN
========================= */
app.post("/vulnerable-login", (req, res) => {
  const { username, password } = req.body;

  const isAttack = detectInjection(username) || detectInjection(password);

  const query =
    `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;

  db.query(query, (err, result) => {
    if (err) return res.json({ success: false, message: "Query Error" });

    let success = result.length > 0;

    let message = success
      ? (isAttack ? "Injection Successful! System Hacked" : "Login Successful")
      : "Login Failed";

    if (success) req.session.user = username;

    db.query(
      "INSERT INTO logs (username, status, mode) VALUES (?, ?, ?)",
      [username, message, "Vulnerable"]
    );

    res.json({ success, message });
  });
});

/* =========================
   🔒 SECURE LOGIN
========================= */
app.post("/secure-login", (req, res) => {
  const { username, password } = req.body;

  const isAttack = detectInjection(username) || detectInjection(password);

  const query =
    "SELECT * FROM users WHERE username = ? AND password = ?";

  db.query(query, [username, password], (err, result) => {
    if (err) return res.json({ success: false, message: "Query Error" });

    let success = result.length > 0;

    let message = success
      ? "Secure Login Successful"
      : (isAttack ? "Injection Blocked!" : "Invalid Credentials");

    if (success) req.session.user = username;

    db.query(
      "INSERT INTO logs (username, status, mode) VALUES (?, ?, ?)",
      [username, message, "Secure"]
    );

    res.json({ success, message });
  });
});

/* =========================
   📊 LOGS
========================= */
app.get("/logs", (req, res) => {
  db.query("SELECT * FROM logs ORDER BY id DESC", (err, result) => {
    if (err) return res.json([]);
    res.json(result);
  });
});

/* =========================
   🏠 DASHBOARD (FIXED)
========================= */
app.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.redirect("http://127.0.0.1:5500/frontend/login.html");
  }

  res.sendFile(path.join(__dirname, "../frontend/dashboard.html"));
});

/* =========================
   👤 USER API
========================= */
app.get("/user", (req, res) => {
  if (!req.session.user) {
    return res.json({ loggedIn: false });
  }

  res.json({
    loggedIn: true,
    username: req.session.user
  });
});

/* =========================
   🚪 LOGOUT
========================= */
app.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

/* =========================
   🚀 START SERVER
========================= */
app.listen(3001, () => {
  console.log("🚀 Server running on http://localhost:3001");
});