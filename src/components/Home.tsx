import React from 'react';
import ProductCardsPage from './Product';
import Banner from './banner';

const Home: React.FC = () => {
  return (
    <div style={{ backgroundImage: `url('https://cdn.pixabay.com/photo/2016/12/16/13/18/canola-fields-1911392_640.jpg')`, backgroundSize: 'cover', minHeight: '100vh' }}>
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 animate__animated animate__fadeIn">Welcome to AgroCom</h1>
          <p className="text-lg sm:text-xl lg:text-2xl mb-8 animate__animated animate__fadeIn animate__delay-1s">Growing Connections, Harvesting Solutions!</p>
        </div>
      </div>
      
    <Banner />

      {/* Main Content Section */}
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-8">Our Featured Products</h2>
        <ProductCardsPage />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Product Cards */}
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gray-800 text-white py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6 animate__animated animate__fadeIn animate__delay-2s">Ready to Get Started?</h2>
          <p className="text-lg mb-8 animate__animated animate__fadeIn animate__delay-2s">Join us today and experience the best products and services.</p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300">Sign Up Now</button>
        </div>
      </div>
    </div>
  );
}

export default Home;
