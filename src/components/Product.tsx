import React, { useState, useContext } from "react";
import { CartContext } from "./CartContext";
import { useWishlist } from "./WishlistContext";
import { useNavigate } from "react-router-dom";

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

const ProductCardsPage: React.FC = () => {
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext)!;
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [products] = useState<Product[]>([
    {
      id: 1,
      name: "Fresh Organic Vegetables",
      price: 19.99,
      imageUrl:
        "https://img.freepik.com/free-photo/kiwies-with-greenery-peppers_114579-5953.jpg?w=996&t=st=1711619057~exp=1711619657~hmac=d41eb1ace4a1b264ff973790a0529f403ec548427d8e2a456a038a16bb8cd604",
      description: "Farm-fresh organic vegetables packed with nutrients",
      category: "Vegetables",
      rating: 4.8,
      inStock: true,
    },
    {
      id: 2,
      name: "Premium Corn & Cereals",
      price: 29.99,
      imageUrl:
        "https://www.shutterstock.com/shutterstock/photos/281151791/display_1500/stock-photo-agricultural-product-assortment-corn-cob-in-basket-cereals-in-sacks-and-growing-wheat-in-281151791.jpg",
      description: "High-quality corn and cereal grains for healthy living",
      category: "Cereals",
      rating: 4.6,
      inStock: true,
    },
    {
      id: 3,
      name: "Agricultural Bio Products",
      price: 39.99,
      imageUrl:
        "https://ajaybiotech.com/images/banner-blog-products-mobile.jpg",
      description: "Sustainable bio-agricultural products for modern farming",
      category: "Bio Products",
      rating: 4.9,
      inStock: true,
    },
    {
      id: 4,
      name: "Organic Fertilizers",
      price: 9.99,
      imageUrl:
        "https://ajaybiotech.com/images/banner-blog-products-mobile.jpg",
      description: "Natural fertilizers to boost your crop yield",
      category: "Fertilizers",
      rating: 4.5,
      inStock: false,
    },
  ]);

  const [addedToCart, setAddedToCart] = useState<{ [key: number]: boolean }>(
    {}
  );
  const [filter, setFilter] = useState("all");

  const handleWishlistToggle = (product: Product) => {
    toggleWishlist(product);
  };

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) return;

    addToCart(product);
    setAddedToCart((prev) => ({ ...prev, [product.id]: true }));

    // Reset the "added" state after 2 seconds
    setTimeout(() => {
      setAddedToCart((prev) => ({ ...prev, [product.id]: false }));
    }, 2000);
  };

  const handleBuyNow = (product: Product) => {
    if (!product.inStock) return;

    navigate("/Checkoutpage", {
      state: {
        totalAmount: product.price,
        cartItems: [{ ...product, quantity: 1 }],
      },
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-sm ${
          i < Math.floor(rating) ? "text-yellow-400" : "text-gray-300"
        }`}
      >
        ⭐
      </span>
    ));
  };

  const filteredProducts =
    filter === "all"
      ? products
      : products.filter(
          (product) => product.category?.toLowerCase() === filter.toLowerCase()
        );

  const categories = [
    "all",
    ...Array.from(new Set(products.map((p) => p.category).filter(Boolean))),
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Filter Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          🌾 Our Products
        </h2>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category ?? "all"}
              onClick={() => setFilter(category ?? "all")}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === category
                  ? "bg-green-500 text-white shadow-md"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {category === "all" ? "All Products" : category}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden group"
          >
            {/* Product Image */}
            <div className="relative overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    Out of Stock
                  </span>
                </div>
              )}

              {/* Wishlist Button */}
              <button
                className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
                  isInWishlist(product.id)
                    ? "bg-red-500 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-red-500 hover:text-white"
                } shadow-md hover:shadow-lg transform hover:scale-110`}
                onClick={() => handleWishlistToggle(product)}
              >
                <span className="text-lg">
                  {isInWishlist(product.id) ? "❤️" : "🤍"}
                </span>
              </button>

              {/* Category Badge */}
              {product.category && (
                <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {product.category}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="p-5">
              <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">
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
                  <div className="flex mr-2">{renderStars(product.rating)}</div>
                  <span className="text-sm text-gray-500">
                    ({product.rating})
                  </span>
                </div>
              )}

              {/* Price */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl font-bold text-green-600">
                  ${product.price.toFixed(2)}
                </span>
                {product.inStock && (
                  <span className="text-sm text-green-500 font-medium">
                    ✅ In Stock
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <button
                  className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    !product.inStock
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : addedToCart[product.id]
                      ? "bg-green-500 text-white"
                      : "bg-blue-500 hover:bg-blue-600 text-white hover:shadow-lg transform hover:scale-105"
                  }`}
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inStock}
                >
                  {addedToCart[product.id] ? "✅ Added!" : "🛒 Add to Cart"}
                </button>

                <button
                  className={`flex-1 py-2 px-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                    !product.inStock
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 text-white hover:shadow-lg transform hover:scale-105"
                  }`}
                  onClick={() => handleBuyNow(product)}
                  disabled={!product.inStock}
                >
                  ⚡ Buy Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No products found
          </h3>
          <p className="text-gray-500">Try adjusting your filter selection</p>
        </div>
      )}
    </div>
  );
};

export default ProductCardsPage;
