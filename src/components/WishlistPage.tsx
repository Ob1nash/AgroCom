import React, { useState, useEffect } from 'react';
import { productImages } from './productImages';

interface Product {
 id: number;
 name: string;
 price: number;
 imageUrl: string;
}

const WishlistPage: React.FC = () => {
 const [wishlist, setWishlist] = useState<Product[]>(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      return JSON.parse(savedWishlist);
    }
    return [
      { id: 1, name: "Product 1", price: 19.99, imageUrl: productImages.product1 },
      { id: 2, name: "Product 2", price: 29.99, imageUrl: productImages.product2 },
      { id: 3, name: "Product 3", price: 39.99, imageUrl: productImages.product3 },
      { id: 4, name: "Product 4", price: 9.99, imageUrl: productImages.product3 },
    ];
 });

 useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
 }, [wishlist]);

 const removeFromWishlist = (productId: number) => {
    const updatedWishlist = wishlist.filter(product => product.id !== productId);
    setWishlist(updatedWishlist);
 };

 const addToCart = (productId: number) => {
    console.log(`Product ${productId} added to cart.`);
    // Implement logic to add the product to the cart
 };

 return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold mb-8">Wishlist</h2>
      {wishlist.length === 0 ? (
        <p className="text-xl">Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map(product => (
            <div key={product.id} className="bg-white rounded-lg shadow-md p-6">
              <img src={product.imageUrl} alt={product.name} className="rounded-lg mb-4" />
              <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600">${(product.price || 0).toFixed(2)}</p>
              <div className="flex justify-between mt-4">
                <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300" onClick={() => removeFromWishlist(product.id)}>Remove from Wishlist</button>
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300" onClick={() => addToCart(product.id)}>Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
 );
}

export default WishlistPage;
