import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddEditBook = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({ Title: '', Author: '', Genre: '', Pages: '', PublishedDate: '' });

  useEffect(() => {
    if (id) fetchBookDetails();
  }, [id]);

  const fetchBookDetails = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/books/${id}`);
      setBook(response.data);
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:3000/books/${id}`, book);
      } else {
        await axios.post('http://localhost:3000/books', book);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving book:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={book.Title}
        onChange={(e) => setBook({ ...book, Title: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={book.Author}
        onChange={(e) => setBook({ ...book, Author: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Genre"
        value={book.Genre}
        onChange={(e) => setBook({ ...book, Genre: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Pages"
        value={book.Pages}
        onChange={(e) => setBook({ ...book, Pages: e.target.value })}
        required
      />
      <input
        type="date"
        value={book.PublishedDate}
        onChange={(e) => setBook({ ...book, PublishedDate: e.target.value })}
        required
      />
      <button type="submit">{id ? 'Update' : 'Add'} Book</button>
    </form>
  );
};

export default AddEditBook;
