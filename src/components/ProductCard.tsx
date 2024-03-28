import React from 'react';

const ProductCard: React.FC<{ name: string }> = ({ name }) => {
  const handleAddToCart = () => {
    alert(`${name} added to cart!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-semibold mb-2">{name}</h3>
      <button onClick={handleAddToCart} className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md shadow-md transition duration-300">Add to Cart</button>
    </div>
  );
}

export default ProductCard;
