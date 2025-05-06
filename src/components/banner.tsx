import { motion } from 'framer-motion';

const slides = [
  { image: '/images/featured.png', heading: 'Add a product to cart or wishlist for later' },
  { image: '/images/cart.png', heading: 'View Cart' },
  { image: '/images/checkout.png', heading: 'Click on Buy Now to Confirm purchase' },
];

const Slider = () => {
  const duplicatedSlides = [...slides, ...slides];

  return (
    <div className="relative w-full overflow-hidden bg-green-80 py-8">
      <motion.div
        className="flex"
        animate={{
          x: ['0%', '-100%'],
          transition: {
            ease: 'linear',
            duration: 18,
            repeat: Infinity,
          }
        }}
      >
        {duplicatedSlides.map((slide, index) => (
          <div
            key={index}
            className="flex-shrink-0 w-full sm:w-1/3 px-4"
          >
            <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col items-center justify-center text-center transition transform hover:scale-105 duration-300">
              <img
                src={slide.image}
                alt={slide.heading}
                className="w-45 h-35 object-contain mb-4"
              />
              <div className="bg-green-600 text-white px-4 py-1 rounded-full mb-2 text-sm font-semibold">
                Step {index % slides.length + 1}
              </div>
              <h2 className="text-base font-medium text-gray-700">{slide.heading}</h2>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Slider;
