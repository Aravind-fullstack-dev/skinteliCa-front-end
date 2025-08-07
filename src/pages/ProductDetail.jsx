import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { addToCart } from '../store/slices/cartSlice';
import Api from '../../config';
import axios from 'axios';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [userRating, setUserRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [ratingData, setRatingData] = useState({ average: 0, count: 0 });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);

  const cleanAndParseArray = (input) => {
    if (!input || typeof input !== 'string') return [];
    try {
      const cleaned = input
        .replace(/[{}\\"]/g, '')
        .replace(/^\[|\]$/g, '')
        .split(',')
        .map(item => item.replace(/'/g, '').trim())
        .filter(Boolean);
      return Array.isArray(cleaned) ? cleaned : [];
    } catch (e) {
      console.error('Failed to clean array:', e);
      return [];
    }
  };

  const calculateGST = (price, rate = 18, discountRate = 10) => {
    const basePrice = parseFloat(price || 0);
    const gstAmount = (basePrice * rate) / 100;
    const totalPrice = basePrice + gstAmount;
    const discountAmount = (totalPrice * discountRate) / 100;
    const discountedPrice = totalPrice - discountAmount;

    return {
      basePrice: basePrice.toFixed(2),
      gstAmount: gstAmount.toFixed(2),
      totalPrice: totalPrice.toFixed(2),
      discountAmount: discountAmount.toFixed(2),
      discountedPrice: discountedPrice.toFixed(2)
    };
  };

  const fetchRatingData = async () => {
    try {
      const ratingRes = await axios.get(`${Api}/products/${id}/ratings`);
      setRatingData(ratingRes.data);

      if (isAuthenticated) {
        const userRatingRes = await axios.get(`${Api}/products/${id}/ratings/user/${user.id}`);
        setUserRating(userRatingRes.data.rating);
      }
    } catch (err) {
      console.error('Error fetching rating data:', err);
    }
  };

  const submitRating = async (value) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    try {
      await axios.post(`${Api}/products/${id}/ratings`, {
        rating: value,
        userId: user.id
      });
      setUserRating(value);
      await fetchRatingData();
    } catch (err) {
      console.error('Error submitting rating', err);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${Api}/products/${id}`);
        const data = res.data;
        setProduct({
          ...data,
          features: cleanAndParseArray(data.features),
          ingredients: cleanAndParseArray(data.ingredients),
        });

        const relatedRes = await axios.get(`${Api}/products?category=${data.category}`);
        const filtered = relatedRes.data.filter(p => p.id !== data.id);
        setRelatedProducts(filtered.slice(0, 4));
      } catch (err) {
        console.error('Error fetching product:', err);
      }
    };

    fetchProduct();
    fetchRatingData();
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    dispatch(addToCart(product));
    navigate('/checkout');
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  const gstBreakup = calculateGST(product.price);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
            <div className="space-y-4">
              <img src={product.image_url} alt={product.product_name} className="w-full h-96 object-cover rounded-lg" />
              <div className="grid grid-cols-3 gap-2">
                {[...Array(3)].map((_, i) => (
                  <img key={i} src={product.image_url} alt="" className={`w-full h-24 object-cover rounded-lg ${i === 0 ? 'border-2 border-pink-500' : 'opacity-50'}`} />
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-sm font-medium text-pink-600 bg-pink-100 px-3 py-1 rounded-full">
                  {product.category}
                </span>
                <h1 className="text-3xl font-bold text-gray-900 mt-4">{product.product_name}</h1>
                <div className="flex items-center mt-2 space-x-1">
                  {[1, 2, 3, 4, 5].map(value => (
                    <Star
                      key={value}
                      className={`w-5 h-5 cursor-pointer ${
                        (hoverRating || userRating || Math.floor(ratingData.average)) >= value ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                      onMouseEnter={() => setHoverRating(value)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => submitRating(value)}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    ({ratingData.count} ratings)
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xl text-gray-500 line-through">
                  MRP: ₹{gstBreakup.totalPrice}
                </div>
                <div className="text-2xl font-bold text-pink-600">
                  ₹{gstBreakup.discountedPrice} <span className="text-sm font-normal text-gray-600">(10% OFF)</span>
                </div>
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>

              {product.features?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                  <ul className="flex flex-wrap gap-2">
                    {product.features.map((features, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{features}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {product.ingredients?.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Ingredients</h3>
                  <ul className="flex flex-wrap gap-2">
                    {product.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
                        <span className="text-gray-700">{ingredient}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-green-600 font-medium">
                  {product.stock} items in stock
                </span>
              </div>

              <div className="flex space-x-4">
                <button onClick={handleAddToCart} className="flex-1 border-2 border-pink-500 text-pink-500 py-3 px-6 rounded-lg font-semibold hover:bg-pink-50 transition-all flex items-center justify-center space-x-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span>Add to Cart</span>
                </button>
                <button onClick={handleBuyNow} className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                  <span>Buy Now</span>
                </button>
                <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Heart className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <Truck className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Free Shipping</p>
                </div>
                <div className="text-center">
                  <Shield className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Secure Payment</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-8 h-8 text-pink-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Easy Returns</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <img src={item.image_url} alt={item.product_name} className="w-full h-48 object-cover rounded-md mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900">{item.product_name}</h3>
                  <p className="text-pink-600 font-medium mt-1">₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;