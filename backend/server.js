require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bcryptjs = require('bcryptjs');
const sqlite3 = require('better-sqlite3');
const Rock = require('./rockyou.js');

Rock.getRockyou();

const saltRounds = 10;
const app = express();
const PORT = process.env.PORT || 3000;

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
            return res.status(400).json({ error: "Password is too weak" });
        }

        const hashedPassword = await bcryptjs.hash(password, saltRounds);

        const checkUserStmt = db.prepare(`SELECT 1 FROM users WHERE email = ?`);
        const userExists = checkUserStmt.get(email);

        if (userExists) {
            return res.status(409).json({ error: "Email already in use" });
        }

        const insertUserStmt = db.prepare(`INSERT INTO users (email, password) VALUES (?, ?)`);
        insertUserStmt.run(email, hashedPassword);

        res.status(201).json({ message: "✅ User registered successfully" });
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

        const stmt = db.prepare(`SELECT id, password FROM users WHERE email = ?`);
        const user = stmt.get(email);

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
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
