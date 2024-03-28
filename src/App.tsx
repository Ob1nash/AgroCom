//import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import Product from './components/Product'; 
import Navbar from './components/Navbar';
import Cart from './components/Cart'
import Wishlist from './components/WishlistPage'

function App() {
  

  return (
    <Router>
      <div className="App">
      
        <Navbar/>
        <Routes>
          <Route path="/"  element={<Home />} />
          <Route path="/product" element={<Product/>} />
          <Route path="/Cart" element={<Cart/>} />
          <Route path="/Wishlist" element={<Wishlist/>} />
        
        </Routes>
      </div>
    </Router>
  );
}

export default App;
