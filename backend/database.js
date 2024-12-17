const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./books.db');

const initializeDatabase = async () => {
    await db.run(`
        CREATE TABLE IF NOT EXISTS Authors (
            AuthorID INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT NOT NULL
        )
    `);

    await db.run(`
        CREATE TABLE IF NOT EXISTS Genres (
            GenreID INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT NOT NULL,
            Description TEXT
        )
    `);

    await db.run(`
        CREATE TABLE IF NOT EXISTS Books (
            BookID INTEGER PRIMARY KEY AUTOINCREMENT,
            Title TEXT NOT NULL,
            AuthorID INTEGER,
            GenreID INTEGER,
            Pages INTEGER,
            PublishedDate TEXT,
            FOREIGN KEY (AuthorID) REFERENCES Authors(AuthorID),
            FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
        )
    `);

    console.log('Database initialized!');
};

module.exports = { db, initializeDatabase };
