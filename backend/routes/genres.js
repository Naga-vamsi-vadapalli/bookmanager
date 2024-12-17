const express = require('express');
const { db } = require('../database');
const router = express.Router();

// Get all genres
router.get('/', (req, res) => {
    db.all('SELECT * FROM Genres', [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

// Add new genre
router.post('/', (req, res) => {
    const { Name, Description } = req.body;
    db.run(`
        INSERT INTO Genres (Name, Description) VALUES (?, ?)
    `, [Name, Description], function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ GenreID: this.lastID });
    });
});

module.exports = router;
