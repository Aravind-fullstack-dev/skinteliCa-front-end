import axios from 'axios';
import Api from '../../../../config';  // Update this path based on your project structure

// Get all orders
export const fetchOrders = async () => {
  const response = await axios.get(`${Api}/orders`);
  return response.data;
};

// Get order by ID (optional helper)
export const getOrderById = async (orderId) => {
  const response = await axios.get(`${Api}/orders/${orderId}`);
  return response.data;
};

// Create a new order
export const createOrder = async (data) => {
  const response = await axios.post(`${Api}/orders`, data);
  return response.data;
};

// Update an order
export const updateOrder = async (data) => {
  const response = await axios.put(`${Api}/orders/${data.id}`, data);
  return response.data;
};

// Delete an order
export const deleteOrder = async (data) => {
  const response = await axios.delete(`${Api}/orders/${data.id}`);
  return response.data;
};

// Optional: update order status only
export const updateOrderStatus = async (data) => {
  const response = await axios.put(`${Api}/orders/${data.id}`, data);
  return response.data;
};
