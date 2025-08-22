// src/store/slices/orderSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Api from '../../../config';

// 1. Fetch all orders
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get(`${Api}/orders`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// 2. Create an order
export const createOrder = createAsyncThunk('orders/createOrder', async (orderData, { rejectWithValue }) => {
  try {
    const response = await axios.post(`${Api}/orders`, orderData);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// 3. Delete an order
export const deleteOrder = createAsyncThunk('orders/deleteOrder', async (orderId, { rejectWithValue }) => {
  try {
    const response = await axios.delete(`${Api}/orders/${orderId}`);
    return response.data;
  } catch (err) {
    return rejectWithValue(err.response?.data || err.message);
  }
});

// 4. Update an order
// export const updateOrder = createAsyncThunk('orders/updateOrder', async ({ id, data }, { rejectWithValue }) => {
//   try {
//     const response = await axios.put(`${Api}/orders/${id}`, data);
//     return response.data;
//   } catch (err) {
//     return rejectWithValue(err.response?.data || err.message);
//   }
// });

const orderSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    currentOrder: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder

      // 👉 Fetch Orders
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👉 Create Order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👉 Delete Order
      .addCase(deleteOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter(order => order.order_id !== action.payload.order_id);
      })
      .addCase(deleteOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // 👉 Update Order
      // .addCase(updateOrder.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      // .addCase(updateOrder.fulfilled, (state, action) => {
      //   state.loading = false;
      //   const index = state.orders.findIndex(order => order.order_id === action.payload.order_id);
      //   if (index !== -1) {
      //     state.orders[index] = action.payload;
      //   }
      // })
      // .addCase(updateOrder.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload;
      // });
  },
});

export const { clearCurrentOrder } = orderSlice.actions;

export default orderSlice.reducer;
