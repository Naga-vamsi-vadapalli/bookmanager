import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import BookDetails from './components/BookDetails';
import AddEditBook from './components/AddEditBook';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/book/:id" element={<BookDetails />} />
        <Route path="/add-book" element={<AddEditBook />} />
        <Route path="/edit-book/:id" element={<AddEditBook />} />
      </Routes>
    </Router>
  );
};

export default App;
