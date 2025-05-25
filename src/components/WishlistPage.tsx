import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';
import { useWishlist } from './WishlistContext';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
  category?: string;
  rating?: number;
  inStock?: boolean;
}

const WishlistPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext) || { addToCart: () => {} };
  const { wishlist, removeFromWishlist, clearWishlist, moveAllToCart } = useWishlist();
  
  const [addedToCart, setAddedToCart] = useState<{[key: number]: boolean}>({});
  const [removingFromWishlist, setRemovingFromWishlist] = useState<{[key: number]: boolean}>({});

  const handleRemoveFromWishlist = (productId: number) => {
    setRemovingFromWishlist(prev => ({ ...prev, [productId]: true }));
    
    setTimeout(() => {
      removeFromWishlist(productId);
      setRemovingFromWishlist(prev => ({ ...prev, [productId]: false }));
    }, 300);
  };

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedToCart(prev => ({ ...prev, [product.id]: true }));
    
    // Reset the "added" state after 2 seconds
    setTimeout(() => {
      setAddedToCart(prev => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const handleBuyNow = (product: Product) => {
    navigate('/Checkoutpage', {
      state: {
        totalAmount: product.price,
        cartItems: [{ ...product, quantity: 1 }]
      }
    });
  };

  const handleMoveAllToCart = () => {
    moveAllToCart(addToCart);
  };

  const handleClearWishlist = () => {
    if (window.confirm('Are you sure you want to clear your entire wishlist?')) {
      clearWishlist();
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
        ⭐
      </span>
    ));
  };

  const getTotalValue = () => {
    return wishlist.reduce((total, product) => total + product.price, 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center">
            💖 <span className="ml-2">My Wishlist</span>
          </h1>
          <p className="text-gray-600">Items you've saved for later</p>
        </div>

        {wishlist.length === 0 ? (
          /* Empty Wishlist State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="text-8xl mb-6">💔</div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your wishlist is empty</h2>
              <p className="text-gray-600 mb-8">
                Start adding products to your wishlist by clicking the heart icon on any product
              </p>
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🛍️ Start Shopping
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Wishlist Stats and Actions */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-center sm:text-left">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} in Wishlist
                  </h3>
                  <p className="text-gray-600">
                    Total Value: <span className="font-bold text-green-600">${getTotalValue().toFixed(2)}</span>
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={handleMoveAllToCart}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    🛒 Add All to Cart
                  </button>
                  <button
                    onClick={handleClearWishlist}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-md"
                  >
                    🗑️ Clear All
                  </button>
                </div>
              </div>
            </div>

            {/* Wishlist Items Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {wishlist.map(product => (
                <div 
                  key={product.id} 
                  className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform relative overflow-hidden ${
                    removingFromWishlist[product.id] ? 'scale-95 opacity-50' : 'hover:-translate-y-2'
                  }`}
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden group">
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110" 
                    />
                    
                    {/* Remove from Wishlist Button */}
                    <button
                      className="absolute top-3 right-3 bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all duration-300 transform hover:scale-110"
                      onClick={() => handleRemoveFromWishlist(product.id)}
                      disabled={removingFromWishlist[product.id]}
                    >
                      {removingFromWishlist[product.id] ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      ) : (
                        <span className="text-sm">❌</span>
                      )}
                    </button>

                    {/* Category Badge */}
                    {product.category && (
                      <div className="absolute top-3 left-3 bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                        {product.category}
                      </div>
                    )}

                    {/* Added Date (if available) */}
                    <div className="absolute bottom-3 left-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                      In Wishlist
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                      {product.name}
                    </h3>
                    
                    {product.description && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                    )}

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center mb-3">
                        <div className="flex mr-2">
                          {renderStars(product.rating)}
                        </div>
                        <span className="text-sm text-gray-500">({product.rating})</span>
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-green-600">
                        ${product.price.toFixed(2)}
                      </span>
                      {product.inStock !== false && (
                        <span className="text-sm text-green-500 font-medium">✅ Available</span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <button
                        className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                          addedToCart[product.id]
                            ? 'bg-green-500 text-white'
                            : 'bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg transform hover:scale-105'
                        }`}
                        onClick={() => handleAddToCart(product)}
                      >
                        {addedToCart[product.id] ? '✅ Added!' : '🛒 Add to Cart'}
                      </button>
                      
                      <button
                        className="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg transform hover:scale-105"
                        onClick={() => handleBuyNow(product)}
                      >
                        ⚡ Buy Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate('/')}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                🛍️ Continue Shopping
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;