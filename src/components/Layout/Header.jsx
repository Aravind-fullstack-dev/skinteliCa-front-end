import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, Search, LogOut, Settings } from 'lucide-react';
import { logout } from '../../store/slices/authSlice';
import axios from 'axios';
import Api from '../../../config';
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user, isAdmin } = useSelector(state => state.auth);
  const { itemCount } = useSelector(state => state.cart);
   const handleLogout = async () => {
    try {
      await axios.post(`${Api}/auth/logout`, { userId: user?.id });
      dispatch(logout());
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              SkinteliCa
            </span>
            {/* <img
              src="../src/images/Logo.png"
              alt="SkinteliCa Logo"
              className="h-12 w-12 object-contain"
            /> */}
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-gray-700 hover:text-pink-600 transition-colors">
              Products
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-pink-600 transition-colors">
              About
            </Link>
            <Link to='/blog' className="text-gray-700 hover:text-pink-600 transition-colors">
              Blog
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-pink-600 transition-colors">
              Contact
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="relative p-2 text-gray-700 hover:text-pink-600 transition-colors">
                  <ShoppingCart className="w-6 h-6" />
                  {itemCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {itemCount}
                    </span>
                  )}
                </Link>

                {isAdmin && (
                  <Link to="/admin" className="p-2 text-gray-700 hover:text-pink-600 transition-colors">
                    <Settings className="w-6 h-6" />
                  </Link>
                )}

                <div className="flex items-center space-x-2">
                  <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-colors">
                    <User className="w-6 h-6" />
                    <span className="hidden md:block">{user?.name}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-gray-700 hover:text-pink-600 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-pink-600 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;