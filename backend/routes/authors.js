const express = require('express');
const { db } = require('../database');
const router = express.Router();

// Get all authors
router.get('/', (req, res) => {
    db.all('SELECT * FROM Authors', [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

// Add new author
router.post('/', (req, res) => {
    const { Name } = req.body;
    db.run(`
        INSERT INTO Authors (Name) VALUES (?)
    `, [Name], function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ AuthorID: this.lastID });
    });
});

module.exports = router;
