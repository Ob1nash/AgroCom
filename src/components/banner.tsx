
import { motion } from 'framer-motion';

// Define the array of slides with images and headings
const slides = [
    { image: 'public/images/featured.png', heading: 'Add a product to cart or wishlist for later' },
    { image: 'public/images/cart.png', heading: 'View Cart' },
    { image: 'public/images/checkout.png', heading: 'Click on Buy Now to Confirm purchase' },
];

const Slider = () => {
    // Duplicate the slides array to ensure seamless looping
    const duplicatedSlides = [...slides, ...slides];

    return (
        <div className="relative w-full overflow-hidden bg-gray-200">
            {/* Wrapping div for seamless looping */}
            <motion.div
                className="flex"
                animate={{
                    x: ['0%', '-100%'],
                    transition: {
                        ease: 'linear',
                        duration: 11,
                        repeat: Infinity,
                    }
                }}
            >
                {/* Render duplicated slides */}
                {duplicatedSlides.map((slide, index) => (
                    <div key={index} className="flex-shrink-0" style={{ width: `${100 / slides.length}%` }}>
                        <div className="flex flex-col items-center justify-center h-full py-5 px-5">
                            <img src={slide.image} alt={slide.heading} className="w-full h-auto" />
                            {/* Display the slide number as a heading */}
                            <div className=' flex items-center justify-center bg-gray-900 text-white mt-3 sm:px-3 lg:px-6 rounded-full'>
                            <h2 className="flex items-center justify-center  text-2xl font-bold mt-4">{index % slides.length + 1}</h2>
                            </div>
                            {/* Existing heading */}
                            <h2 className="text-1xl font-semibold mt-2">{slide.heading}</h2>
                        </div>
                    </div>
                ))}
            </motion.div>
        </div>
    );
};

export default Slider;
