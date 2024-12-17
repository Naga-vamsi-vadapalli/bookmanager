const express = require('express');
const bodyParser = require('body-parser');
const booksRouter = require('./routes/books');
const authorsRouter = require('./routes/authors');
const genresRouter = require('./routes/genres');
const { initializeDatabase } = require('./database');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/genres', genresRouter);

// Start Server and Initialize Database
app.listen(PORT, async () => {
    await initializeDatabase();
    console.log(`Server is running on http://localhost:${PORT}`);
});
