import express from 'express';
import bodyParser from 'body-parser';
import { nanoid } from 'nanoid';
import path from 'path';

const app = express();

// Database setup (using SQLite3 for simplicity)
import sqlite3 from 'sqlite3';
const { verbose } = sqlite3;
const db = new sqlite3.Database(':memory:'); // Creating a new SQLite database instance

// Create table
db.serialize(() => {
    db.run("CREATE TABLE urls (id INTEGER PRIMARY KEY, original_url TEXT NOT NULL, short_code TEXT NOT NULL)");
});

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Endpoint to handle URL shortening
app.post('/shorten', (req, res) => {
    const originalURL = req.body.url;
    const shortCode = nanoid(6); // Generating short code using nanoid
    const shortURL = `http://localhost:3000/${shortCode}`;

    // Insert into database
    db.run("INSERT INTO urls (original_url, short_code) VALUES (?, ?)", [originalURL, shortCode], (err) => {
        if (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            res.json({ shortURL: shortURL });
        }
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.resolve("", '../frontend/index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
