import React, { useState } from 'react';
import { Mail } from 'lucide-react';
import Toast from '../../utils/Toast'; // if you have a Toast component
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [toast, setToast] = useState({ open: false, message: '', type: 'success' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      const response = await axios.post(`${process.env.REACT_APP_API}/auth/forgot-password`, { email });

      setToast({
        open: true,
        message: response.data?.message || 'Reset link sent to your email!',
        type: 'success',
      });
    } catch (err) {
      setToast({
        open: true,
        message: err.response?.data?.message || 'Failed to send reset link',
        type: 'error',
      });
    }

    setTimeout(() => {
      setToast({ open: false, message: '', type: 'success' });
    }, 3000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-pink-50">
      {toast.open && <Toast {...toast} />}
      <div className="max-w-md w-full bg-white shadow-md rounded-xl p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-gray-800">Forgot your password?</h2>
        <p className="text-center text-sm text-gray-500">
          Enter your email address and we’ll send you a link to reset your password.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg"
          >
            Send Reset Link
          </button>
        </form>
        <div className="text-center text-sm mt-4">
          <a href="/login" className="text-pink-600 hover:text-pink-500">Back to login</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
