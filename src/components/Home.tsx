import React from 'react';
import ProductCardsPage from './Product';
import Banner from './banner';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleSignup = () => {
    navigate('/Signup');
  };

  return (
    <div
      style={{
        backgroundImage: `url('https://cdn.pixabay.com/photo/2016/12/16/13/18/canola-fields-1911392_640.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
      className="bg-fixed"
    >
      {/* Hero Section */}
      <section className="flex items-center justify-center min-h-screen backdrop-blur-sm bg-black/40">
        <div className="text-center text-white max-w-3xl p-6 rounded-xl bg-white/10 shadow-2xl animate__animated animate__fadeInDown">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">🌱 Welcome to AgroCom</h1>
          <p className="text-xl mb-6 font-light">Growing Connections, Harvesting Solutions!</p>
          <button
            onClick={handleSignup}
            className="bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 text-white py-3 px-8 rounded-full font-semibold shadow-lg transition-all duration-300"
          >
            Join Now
          </button>
        </div>
      </section>

      {/* Banner */}
      <Banner />

      {/* Featured Products */}
      <section className="bg-gradient-to-b from-white to-green-50 py-20 px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center text-green-800 mb-12 animate__animated animate__fadeInUp">🌾 Featured Agro Products</h2>
        <div className="max-w-7xl mx-auto">
          <ProductCardsPage />
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-700 text-white py-24 px-4 text-center animate__animated animate__fadeInUp">
        <h2 className="text-4xl font-bold mb-4">🌟 Ready to Get Started?</h2>
        <p className="text-lg mb-8">Sign up now and explore the best agro-products across the country.</p>
        <button
          onClick={handleSignup}
          className="bg-white text-green-700 hover:text-green-900 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300"
        >
          Sign Up Now
        </button>
      </section>
    </div>
  );
};

export default Home;
