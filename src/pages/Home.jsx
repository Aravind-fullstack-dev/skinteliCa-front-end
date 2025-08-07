import React,{ useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Star, Truck, Shield, Award, ArrowRight, Sparkles } from 'lucide-react';
import Api from '../../config';
import axios from 'axios';
const Home = () => {
  const [product, setProducts] = useState([]);
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${Api}/products`);
      // dispatch(setProducts(res.data));
      setProducts(res.data);
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const featuredProducts = product.slice(0, 6);
  console.log(featuredProducts, "featuredProducts")
  return (
    <div className="min-h-screen">
      {/* Hero Banner Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080"
            alt="Skincare Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/50 to-pink-900/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center animate-fade-in">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-8 h-8 text-pink-300 mr-2 animate-pulse" />
            <span className="text-pink-300 font-medium text-lg tracking-wide">Premium Skincare Collection</span>
            <Sparkles className="w-8 h-8 text-pink-300 ml-2 animate-pulse" />
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-8 leading-tight">
            <span className="block mb-2">Unlock Your</span>
            <span className="block bg-gradient-to-r from-pink-300 via-purple-300 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Radiant Beauty
            </span>
          </h1>
          
          <p className="text-lg md:text-xl lg:text-2xl text-gray-100 mb-10 max-w-4xl mx-auto leading-relaxed font-light">
            Experience the perfect fusion of ancient wisdom and modern science. Our premium collection features 
            Japanese precision, Korean innovation, and Ayurvedic traditions to reveal your skin's natural glow.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Link
              to="/products"
              className="group bg-gradient-to-r from-pink-500 via-purple-500 to-pink-600 text-white px-12 py-5 rounded-full text-lg font-semibold hover:shadow-2xl hover:shadow-pink-500/25 transition-all duration-300 transform hover:scale-105 flex items-center backdrop-blur-sm"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-6 h-6 ml-3 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
            <Link
              to="/about"
              className="border-2 border-white/80 text-white px-12 py-5 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all duration-300 backdrop-blur-sm hover:shadow-xl"
            >
              Our Story
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">15K+</div>
              <div className="text-pink-200 font-medium">Happy Customers</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">100+</div>
              <div className="text-pink-200 font-medium">Premium Products</div>
            </div>
            <div className="text-center backdrop-blur-sm bg-white/10 rounded-2xl p-6 border border-white/20">
              <div className="text-4xl font-bold text-white mb-2">4.9★</div>
              <div className="text-pink-200 font-medium">Customer Rating</div>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-pink-400/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-purple-400/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-pink-300/30 rounded-full blur-lg animate-bounce delay-500"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose SkinteliCa?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the difference with our commitment to quality, authenticity, and customer satisfaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center group hover:transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <Truck className="w-10 h-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Free Shipping</h3>
              <p className="text-gray-600">Complimentary delivery on orders above ₹2000 across India</p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <Shield className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Secure Payment</h3>
              <p className="text-gray-600">Bank-grade security with multiple payment options</p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-r from-pink-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <Award className="w-10 h-10 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Authentic Products</h3>
              <p className="text-gray-600">100% genuine products sourced directly from brands</p>
            </div>
            
            <div className="text-center group hover:transform hover:scale-105 transition-all">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:shadow-lg transition-shadow">
                <Star className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
              <p className="text-gray-600">24/7 skincare consultation from certified experts</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-xl text-gray-600">Discover our most loved skincare essentials</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.products_serial_id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 group">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image_url}
                    alt={product.product_name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="text-sm font-medium text-white bg-gradient-to-r from-pink-500 to-purple-600 px-3 py-1 rounded-full">
                      {product.category}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium ml-1">{product.rating}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors">
                    {product.product_name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
                    <Link
                      to={`/product/${product.products_serial_id}`}
                      className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all text-sm font-medium"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all inline-flex items-center"
            >
              View All Products
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Shop by Tradition</h2>
            <p className="text-xl text-gray-600">Explore skincare wisdom from around the world</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/products?category=Japanese" className="relative group cursor-pointer overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/7755456/pexels-photo-7755456.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Japanese Skincare"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold mb-2">Japanese</h3>
                <p className="text-lg opacity-90">Minimalist & Effective</p>
                <p className="text-sm mt-2 opacity-75">Precision-crafted formulas for gentle yet powerful results</p>
              </div>
            </Link>
            
            <Link to="/products?category=Korean" className="relative group cursor-pointer overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/7755461/pexels-photo-7755461.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Korean Skincare"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold mb-2">Korean</h3>
                <p className="text-lg opacity-90">Innovation & Technology</p>
                <p className="text-sm mt-2 opacity-75">Advanced formulations with cutting-edge ingredients</p>
              </div>
            </Link>
            
            <Link to="/products?category=Ayurvedic" className="relative group cursor-pointer overflow-hidden rounded-2xl">
              <img
                src="https://images.pexels.com/photos/7755461/pexels-photo-7755461.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Ayurvedic Skincare"
                className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-3xl font-bold mb-2">Ayurvedic</h3>
                <p className="text-lg opacity-90">Natural & Traditional</p>
                <p className="text-sm mt-2 opacity-75">Time-tested herbs and natural ingredients</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">Stay Glowing</h2>
          <p className="text-xl text-pink-100 mb-8">
            Get exclusive skincare tips, product launches, and special offers delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button className="bg-white text-pink-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;