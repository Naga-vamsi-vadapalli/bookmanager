const express = require('express');
const { db } = require('../database');
const router = express.Router();

// Get all books
router.get('/', (req, res) => {
    db.all(`
        SELECT Books.*, Authors.Name AS AuthorName, Genres.Name AS GenreName
        FROM Books
        LEFT JOIN Authors ON Books.AuthorID = Authors.AuthorID
        LEFT JOIN Genres ON Books.GenreID = Genres.GenreID
    `, [], (err, rows) => {
        if (err) return res.status(500).send(err.message);
        res.json(rows);
    });
});

// Get book by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.get(`
        SELECT Books.*, Authors.Name AS AuthorName, Genres.Name AS GenreName
        FROM Books
        LEFT JOIN Authors ON Books.AuthorID = Authors.AuthorID
        LEFT JOIN Genres ON Books.GenreID = Genres.GenreID
        WHERE BookID = ?
    `, [id], (err, row) => {
        if (err) return res.status(500).send(err.message);
        if (!row) return res.status(404).send('Book not found');
        res.json(row);
    });
});

// Add new book
router.post('/', (req, res) => {
    const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
    db.run(`
        INSERT INTO Books (Title, AuthorID, GenreID, Pages, PublishedDate)
        VALUES (?, ?, ?, ?, ?)
    `, [Title, AuthorID, GenreID, Pages, PublishedDate], function (err) {
        if (err) return res.status(500).send(err.message);
        res.status(201).json({ BookID: this.lastID });
    });
});

// Update book
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { Title, AuthorID, GenreID, Pages, PublishedDate } = req.body;
    db.run(`
        UPDATE Books
        SET Title = ?, AuthorID = ?, GenreID = ?, Pages = ?, PublishedDate = ?
        WHERE BookID = ?
    `, [Title, AuthorID, GenreID, Pages, PublishedDate, id], function (err) {
        if (err) return res.status(500).send(err.message);
        if (this.changes === 0) return res.status(404).send('Book not found');
        res.json({ message: 'Book updated successfully' });
    });
});

// Delete book
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.run(`
        DELETE FROM Books WHERE BookID = ?
    `, [id], function (err) {
        if (err) return res.status(500).send(err.message);
        if (this.changes === 0) return res.status(404).send('Book not found');
        res.json({ message: 'Book deleted successfully' });
    });
});

module.exports = router;
