import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, Star, ShoppingCart } from 'lucide-react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import Api from '../../config';
import {
  setProducts,
  setLoading,
  filterByProductType,
  filterBySkinType,
  searchProducts,
  setFilters
} from '../store/slices/productSlice';import { addToCart } from '../store/slices/cartSlice';

const Products = () => {
  const dispatch = useDispatch();
  const { filteredProducts, loading } = useSelector((state) => state.products);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSkinTypes, setSelectedSkinTypes] = useState([]);
  const [selectedProductTypes, setSelectedProductTypes] = useState([]);
  const [priceRange, setPriceRange] = useState([500, 5000]);

  const productTypes = ['Japanese', 'Korean', 'Ayurvedic', 'Natural'];
  const skinTypes = ['Oily', 'Dry', 'Sensitive', 'Combination', 'Normal'];

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        dispatch(setLoading(true));
        const response = await axios.get(`${Api}/products`);
        if (Array.isArray(response.data)) {
          dispatch(setProducts(response.data));
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    fetchProducts();
  }, [dispatch]);

  // Unified filter effect
  useEffect(() => {
    dispatch(
      setFilters({
        priceRange,
        searchTerm,
        productTypes: selectedProductTypes,
        skinTypes: selectedSkinTypes,
      })
    );
  }, [searchTerm, selectedSkinTypes, selectedProductTypes, priceRange, dispatch]);


  // Product details
  // Search term effect
useEffect(() => {
  dispatch(searchProducts(searchTerm));
}, [searchTerm, dispatch]);

// Product Type effect
useEffect(() => {
  dispatch(filterByProductType(selectedProductTypes));
}, [selectedProductTypes, dispatch]);

// Skin Type effect
useEffect(() => {
  dispatch(filterBySkinType(selectedSkinTypes));
}, [selectedSkinTypes, dispatch]);

// Price range effect
useEffect(() => {
  dispatch(setFilters({ priceRange }));
}, [priceRange, dispatch]);

  const toggleCheckbox = (value, currentList, setter) => {
    if (currentList.includes(value)) {
      setter(currentList.filter((item) => item !== value));
    } else {
      setter([...currentList, value]);
    }
  };

  const handleAddToCart = (product) => {
    console.log(product, "products");
    const cartItem = {
      id: product.product_id,
      name: product.product_name,
      price: product.price,
      image: product.image_url,
      category: product.category,
    };
    dispatch(addToCart(cartItem));
  };
  const fixedMinValue = 500;

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2 px-4">Our Products</h1>
        <p className="text-gray-600 mb-6 px-4">Discover premium skincare products for every skin type</p>

        <div className="flex flex-col lg:flex-row gap-4 px-4">
          {/* Sidebar Filters */}
          <div className="w-full lg:w-1/4 bg-white p-6 rounded-xl shadow space-y-6 h-fit sticky top-6 overflow-y-auto">
            {/* Search */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Search</label>
              <div className="flex items-center gap-2 border border-gray-300 rounded px-3 py-2">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search products"
                  className="w-full outline-none text-sm"
                />
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Price Range (₹)</label>
              <Slider
                range={false}  // Use single handle
                min={fixedMinValue}
                max={5000}
                step={10}
                value={priceRange[1]}  // Only control max value
                onChange={(newMax) => setPriceRange([fixedMinValue, newMax])}
                trackStyle={[{ backgroundColor: '#ec4899', height: 6 }]}
                handleStyle={[
                  { borderColor: '#ec4899', backgroundColor: '#ec4899', height: 20, width: 20, marginTop: -7 }
                ]}
                railStyle={{ backgroundColor: '#e5e7eb', height: 6 }}
              />
              <div className="flex justify-between text-xs mt-1 text-gray-600">
                <span>₹{fixedMinValue}</span>
                <span>₹{priceRange[1]}</span>
              </div>
            </div>

            {/* Product Type Checkboxes */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Product Type</label>
              <div className="space-y-2">
                {productTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedProductTypes.includes(type)}
                      onChange={() =>
                        toggleCheckbox(type, selectedProductTypes, setSelectedProductTypes)
                      }
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>

            {/* Skin Type Checkboxes */}
            <div>
              <label className="text-sm font-semibold text-gray-700 mb-2 block">Skin Type</label>
              <div className="space-y-2">
                {skinTypes.map((skin) => (
                  <label key={skin} className="flex items-center gap-2 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={selectedSkinTypes.includes(skin)}
                      onChange={() =>
                        toggleCheckbox(skin, selectedSkinTypes, setSelectedSkinTypes)
                      }
                    />
                    {skin}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="w-full lg:w-3/4 max-h-[calc(100vh-160px)] overflow-y-auto pr-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {loading ? (
                <p className="col-span-full text-center text-gray-500">Loading products...</p>
              ) : filteredProducts.length === 0 ? (
                <p className="col-span-full text-center text-gray-500">No products found.</p>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl shadow hover:shadow-md overflow-hidden transition-shadow"
                  >
                    <Link to={`/product/${product.products_serial_id}`}>
                      <img
                        src={product.image_url}
                        alt={product.product_name}
                        className="w-full h-48 object-cover"
                      />
                    </Link>
                    <div className="p-4">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-pink-600 bg-pink-100 px-2 py-1 rounded-full">
                          {product.category}
                        </span>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.product_name}</h3>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-gray-800">₹{product.price}</span>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-pink-500 text-white text-sm px-3 py-2 rounded hover:bg-pink-600"
                        >
                          <ShoppingCart className="w-4 h-4 inline mr-1" /> Add
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
