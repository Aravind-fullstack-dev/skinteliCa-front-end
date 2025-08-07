import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';
import { registerUser } from '../../store/slices/API/authApi';
import { loginSuccess } from '../../store/slices/authSlice';
import Toast from '../../utils/Toast';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [toast, setToast] = useState({ open: false, message: '', type: 'success' });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\d{10}$/.test(formData.phone)) newErrors.phone = 'Phone number is invalid';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    try {
      const response = await registerUser(userData);
      if (response?.message === 'User registered successfully' && response?.token !== '') {
        // ✅ Show success toast
        setToast({
          open: true,
          message: 'Registration successful! Redirecting to login...',
          type: 'success',
        });

        // ✅ Delay form reset until toast is visible
        setTimeout(() => {
          // Clear form after short delay
          setFormData({
            name: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
          });
          setErrors({});
        }, 500);

        // ✅ Redirect after showing toast for 2 seconds
        setTimeout(() => {
          setToast({ open: false, message: '', type: 'success' });
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      setToast({
        open: true,
        message: err.response?.data?.message || 'Registration failed',
        type: 'error',
      });

      setTimeout(() => {
        setToast({ open: false, message: '', type: 'error' });
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      {toast.open && (
        <Toast open={toast.open} message={toast.message} type={toast.type} />
      )}

      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">S</span>
            </div>
          </div>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Create your account</h2>
          <p className="mt-2 text-sm text-gray-600">
            Or{' '}
            <Link to="/login" className="font-medium text-pink-600 hover:text-pink-500">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <InputField
              label="Full Name"
              id="name"
              icon={<User />}
              type="text"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
            {/* Phone */}
            <InputField
              label="Phone Number"
              id="phone"
              icon={<Phone />}
              type="text"
              value={formData.phone}
              onChange={handleChange}
              error={errors.phone}
            />
            {/* Email */}
            <InputField
              label="Email"
              id="email"
              icon={<Mail />}
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
            {/* Password */}
            <PasswordField
              label="Password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              show={showPassword}
              toggle={() => setShowPassword(!showPassword)}
              error={errors.password}
            />
            {/* Confirm Password */}
            <PasswordField
              label="Confirm Password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              show={showConfirmPassword}
              toggle={() => setShowConfirmPassword(!showConfirmPassword)}
              error={errors.confirmPassword}
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, id, icon, type, value, onChange, error }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">{icon}</span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={onChange}
        required
        className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${error ? 'border-red-300' : 'border-gray-300'}`}
        placeholder={`Enter your ${label.toLowerCase()}`}
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

const PasswordField = ({ label, id, value, onChange, show, toggle, error }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        id={id}
        name={id}
        type={show ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        required
        className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${error ? 'border-red-300' : 'border-gray-300'}`}
        placeholder={`Enter ${label.toLowerCase()}`}
      />
      <button
        type="button"
        onClick={toggle}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
      >
        {show ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
      </button>
    </div>
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default Register;
