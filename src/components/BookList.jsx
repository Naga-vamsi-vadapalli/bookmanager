import React from 'react';
import { Link } from 'react-router-dom';

const BookList = ({ books }) => {
  return (
    <div className="book-list">
      {books.map((book) => (
        <div key={book.BookID} className="book-item">
          <h3>{book.Title}</h3>
          <p>Author: {book.Author}</p>
          <Link to={`/book/${book.BookID}`}>View Details</Link>
          <Link to={`/edit-book/${book.BookID}`}>Edit</Link>
        </div>
      ))}
    </div>
  );
};

export default BookList;
