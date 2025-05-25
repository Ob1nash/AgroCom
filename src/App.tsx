import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import Product from './components/Product';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import Wishlist from './components/WishlistPage';
import CheckoutPage from './components/Checkoutpage';
import Signup from './components/Signup';
import { CartProvider } from './components/CartContext';
import { WishlistProvider } from './components/WishlistContext';

function App() {
  return (
    <Router>
      <WishlistProvider>
        <CartProvider>
          <div className="App">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product" element={<Product />} />
              <Route path="/Cart" element={<Cart />} />
              <Route path="/Wishlist" element={<Wishlist />} />
              <Route path="/Checkoutpage" element={<CheckoutPage />} />
              <Route path="/Signup" element={<Signup />} />
            </Routes>
          </div>
        </CartProvider>
      </WishlistProvider>
    </Router>
  );
}

export default App;