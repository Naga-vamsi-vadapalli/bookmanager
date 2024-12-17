import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBook();
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h2>{book.Title}</h2>
      <p>Author: {book.Author}</p>
      <p>Genre: {book.Genre}</p>
      <p>Pages: {book.Pages}</p>
      <p>Published Date: {book.PublishedDate}</p>
    </div>
  );
};

export default BookDetails;
