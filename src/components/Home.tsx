import React, { useState, useEffect } from 'react';
import ProductCardsPage from './Product';
import Banner from './banner';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleSignup = () => {
    navigate('/Signup');
  };

  const handleExploreProducts = () => {
    const productsSection = document.getElementById('products-section');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: '🌱',
      title: 'Fresh & Organic',
      description: 'Direct from farms to your doorstep with guaranteed freshness'
    },
    {
      icon: '🚚',
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery across the country'
    },
    {
      icon: '💰',
      title: 'Best Prices',
      description: 'Competitive pricing with no hidden costs'
    },
    {
      icon: '🔒',
      title: 'Secure Payment',
      description: 'Safe and encrypted payment processing'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Farm Owner',
      content: 'AgroCom has revolutionized how I sell my produce. The platform is user-friendly and my sales have increased by 300%!',
      avatar: '👩‍🌾'
    },
    {
      name: 'Mike Chen',
      role: 'Restaurant Owner',
      content: 'I get the freshest ingredients at the best prices. The quality is consistently excellent and delivery is always on time.',
      avatar: '👨‍🍳'
    },
    {
      name: 'Emily Davis',
      role: 'Home Chef',
      content: 'Love the variety and freshness! It\'s like having a farmers market delivered to my door.',
      avatar: '👩‍🍳'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://cdn.pixabay.com/photo/2016/12/16/13/18/canola-fields-1911392_640.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-green-400 rounded-full opacity-20 animate-bounce"></div>
          <div className="absolute top-40 right-20 w-16 h-16 bg-yellow-400 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-32 left-20 w-12 h-12 bg-blue-400 rounded-full opacity-20 animate-bounce delay-1000"></div>
        </div>

        <div className={`text-center text-white max-w-4xl px-6 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-white/20">
            <h1 className="text-6xl md:text-7xl font-extrabold mb-6 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent drop-shadow-2xl">
              🌱 AgroCom
            </h1>
            <p className="text-2xl md:text-3xl mb-4 font-light text-green-100">
              Growing Connections, Harvesting Solutions!
            </p>
            <p className="text-lg md:text-xl mb-8 text-gray-200 max-w-2xl mx-auto">
              Connect directly with farmers and get the freshest agricultural products delivered to your doorstep
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={handleSignup}
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-8 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-green-500/25"
              >
                🚀 Join Now
              </button>
              <button
                onClick={handleExploreProducts}
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white py-4 px-8 rounded-full font-bold text-lg border border-white/30 transition-all duration-300 transform hover:scale-105"
              >
                🛍️ Explore Products
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">✨ Why Choose AgroCom?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to connecting you with the best agricultural products while supporting local farmers
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="text-center group hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100">
                  <div className="text-5xl mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner */}
      <Banner />

      {/* Featured Products */}
      <section id="products-section" className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-800 mb-4">🌾 Featured Agro Products</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium agricultural products from trusted farmers
            </p>
          </div>
          <ProductCardsPage />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">💬 What Our Users Say</h2>
            <p className="text-xl text-green-100 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust AgroCom for their agricultural needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                <p className="text-white mb-4 italic">"{testimonial.content}"</p>
                <div className="border-t border-white/20 pt-4">
                  <p className="text-green-100 font-semibold">{testimonial.name}</p>
                  <p className="text-green-200 text-sm">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">10K+</div>
              <p className="text-gray-600">Happy Customers</p>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">500+</div>
              <p className="text-gray-600">Partner Farmers</p>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">50+</div>
              <p className="text-gray-600">Cities Served</p>
            </div>
            <div className="group">
              <div className="text-4xl font-bold text-green-600 mb-2 group-hover:scale-110 transition-transform duration-300">99%</div>
              <p className="text-gray-600">Satisfaction Rate</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-green-700 via-green-600 to-blue-600 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-2 border-white rounded-full"></div>
          <div className="absolute top-32 right-20 w-24 h-24 border-2 border-white rounded-full"></div>
          <div className="absolute bottom-20 left-32 w-20 h-20 border-2 border-white rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
          <h2 className="text-5xl font-bold mb-6">🌟 Ready to Get Started?</h2>
          <p className="text-2xl mb-8 text-green-100">
            Join our community and discover the future of agriculture commerce
          </p>
          <p className="text-lg mb-12 text-gray-200 max-w-2xl mx-auto">
            Sign up now and get access to premium agricultural products, exclusive deals, and direct farmer connections
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={handleSignup}
              className="bg-white text-green-700 hover:text-green-900 font-bold py-4 px-10 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 text-lg"
            >
              🎯 Sign Up Now
            </button>
            <button
              onClick={() => navigate('/products')}
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-700 font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 text-lg"
            >
              🛍️ Browse Products
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;