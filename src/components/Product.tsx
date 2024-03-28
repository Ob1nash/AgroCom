import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

const ProductCardsPage: React.FC = () => {
  // Dummy data for featured products
  const [products, setProducts] = useState<Product[]>([
    { id: 1, name: "Product 1", price: 19.99, imageUrl: "https://img.freepik.com/free-photo/kiwies-with-greenery-peppers_114579-5953.jpg?w=996&t=st=1711619057~exp=1711619657~hmac=d41eb1ace4a1b264ff973790a0529f403ec548427d8e2a456a038a16bb8cd604" },
    { id: 2, name: "Product 2", price: 29.99, imageUrl: "https://www.shutterstock.com/shutterstock/photos/281151791/display_1500/stock-photo-agricultural-product-assortment-corn-cob-in-basket-cereals-in-sacks-and-growing-wheat-in-281151791.jpg" },
    { id: 3, name: "Product 3", price: 39.99, imageUrl: "https://ajaybiotech.com/images/banner-blog-products-mobile.jpg" },
   
  ]);

  const [wishlist, setWishlist] = useState<number[]>([]);

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist(prev => prev.filter(id => id !== productId));
    } else {
      setWishlist(prev => [...prev, productId]);
    }
  };

  const isAddedToWishlist = (productId: number) => {
    return wishlist.includes(productId);
  };

  const addToCart = (productId: number) => {
    
    console.log(`Product ${productId} added to cart`);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <div key={product.id} className="bg-white rounded-lg shadow-md p-6 relative">
          <img src={product.imageUrl} alt={product.name} className="rounded-lg mb-4" />
          <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-600">${product.price.toFixed(2)}</p>
          <div className="flex justify-between mt-4">
            <button
              className="bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
              onClick={() => addToCart(product.id)}
            >
              Add to Cart
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
              onClick={() => console.log('Buy Now clicked for product', product.id)}
            >
              Buy Now
            </button>
          </div>
          <button
            className={`absolute top-2 right-2 bg-white text-gray-800 p-1 rounded-full shadow-md transition duration-300 ${isAddedToWishlist(product.id) ? 'text-gray-500' : ''}`}
            onClick={() => toggleWishlist(product.id)}
          >
            {isAddedToWishlist(product.id) ? 'Added to Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default ProductCardsPage;
