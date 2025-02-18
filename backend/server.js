require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const sqlite3 = require('better-sqlite3');
const Rock = require('./rockyou.js');
const rateLimit = require("express-rate-limit");

Rock.getRockyou();

const saltRounds = 10;
const app = express();
const PORT = process.env.PORT || 3000;

const loginLimit = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: "Too many login attempts, try again later"
});

const db = new sqlite3('users.db');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/registerUser', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password required" });
        }

        if (Rock.rockyou.includes(password)) {
            console.log('Not good enough, try again');
            return res.status(400).json({ error: "Password is too weak" });
        } else {

            const hashedPassword = await bcryptjs.hash(password, saltRounds);

            const checkUserSql = `SELECT * FROM users WHERE email = ?`;
            const checkUserStmt = db.prepare(checkUserSql);
            const user = checkUserStmt.get(email);
            if (user) {
                return res.status(409).json({ error: "Email already in use" });
            }

            const insertUserSql = `INSERT INTO users (email, password) VALUES (?, ?)`;
            const insertUserStmt = db.prepare(insertUserSql);
            insertUserStmt.run(email, hashedPassword);

            res.status(201).json({ message: "✅ User registered successfully" });
        }
    } catch (error) {
        console.error("❌ Registration Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});

app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password required" });
        }

        const sql = `SELECT * FROM users WHERE email = ?`;
        const stmt = db.prepare(sql);
        const user = stmt.get(email);

        if (!user) {
            return res.status(403).json({ error: "Invalid credentials" });
        }

        const match = await bcryptjs.compare(password, user.password);
        if (match) {
            return res.status(200).json({ message: "✅ Login successful" });
        } else {
            return res.status(401).json({ error: "❌ Invalid password" });
        }
    } catch (error) {
        console.error("❌ Login Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});


app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
