import { createSlice } from '@reduxjs/toolkit';

// Load cart data from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      return JSON.parse(savedCart);
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return {
    items: [],
    total: 0,
    itemCount: 0,
  };
};

// Save cart data to localStorage
const saveCartToLocalStorage = (state) => {
  try {
    localStorage.setItem('cart', JSON.stringify(state));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

// Initial state from localStorage
const initialState = loadCartFromLocalStorage();

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      calculateTotals(state);
      saveCartToLocalStorage(state);
    },

    // Update product quantity
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(item => item.id === id);
      if (item) {
        item.quantity = quantity;
      }

      calculateTotals(state);
      saveCartToLocalStorage(state);
    },

    // Remove product from cart
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id);

      calculateTotals(state);
      saveCartToLocalStorage(state);
    },

    // Clear entire cart
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.itemCount = 0;
      localStorage.removeItem('cart');
    },
  },
});

// Helper: Calculate total price and item count
const calculateTotals = (state) => {
  state.itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);
  state.total = state.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
};

export const { addToCart, updateQuantity, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
