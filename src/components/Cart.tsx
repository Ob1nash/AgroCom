import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from './CartContext';

interface CartItem {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  quantity: number;
}

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart, decrementQuantity, removeItem } = useContext(CartContext)!;

  const totalAmount = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleBuyNow = () => {
    navigate('/Checkoutpage', { state: { cartItems, totalAmount } });
  };

  return (
    <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">Your Cart</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cartItems.map((item: CartItem) => (
          <div key={item.id} className="bg-white rounded-lg shadow-md p-6">
            <img src={item.imageUrl} alt={item.name} className="rounded-lg mb-4" />
            <h3 className="text-xl font-semibold mb-2">{item.name}</h3>
            <p className="text-gray-600">Price: ${item.price.toFixed(2)}</p>
            <p className="text-gray-600">Quantity: {item.quantity}</p>
            <p className="text-gray-600">Total: ${(item.price * item.quantity).toFixed(2)}</p>
            <div className="flex mt-4">
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                onClick={() => addToCart(item)}
              >
                +
              </button>
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded-md mr-2"
                onClick={() => decrementQuantity(item.id)}
              >
                -
              </button>
              <button
                className="bg-red-500 text-white px-3 py-1 rounded-md"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center">
        <p className="text-xl font-semibold">Total Amount: ${totalAmount.toFixed(2)}</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={handleBuyNow}
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default Cart;