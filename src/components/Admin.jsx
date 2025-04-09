


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { Search, DollarSign, ShoppingBag, TrendingUp, Users, X } from 'lucide-react';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
const API_URL = 'http://localhost:4003'; 

export default function Admin() {
  const [orders, setOrders] = useState([]);
  const [stats, setStats] = useState({});
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
    fetchStats();
  }, [currentPage, search, status, sortBy]);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/orders`, {
        params: {
          page: currentPage,
          search,
          status,
          sortBy
        }
      });
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  function getStatusBadgeClass(status) {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
      case 'Shipped':
        return 'bg-blue-100 text-blue-800 border border-blue-200';
      case 'Delivered':
        return 'bg-green-100 text-green-800 border border-green-200';
      case 'Cancelled':
        return 'bg-red-100 text-red-800 border border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  }


  const fetchStats = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/order-stats`);
      setStats(response.data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await axios.put(`${API_URL}/api/orders/${orderId}/status`, { status: newStatus });
      fetchOrders();
      fetchStats();
    } catch (error) {
      console.error('Error updating order status:', error);
    }
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`${API_URL}/api/orders/${orderId}`);
      fetchOrders();
      fetchStats();
      setSelectedOrder(null);
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (e) => {
    setStatus(e.target.value);
    setCurrentPage(1);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1);
  };

  const revenueData = orders.map(order => ({
    date: new Date(order.orderDate).toLocaleDateString(),
    revenue: order.totalAmount
  }));

  function StatCard({ icon, title, value }) {
    return (
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-lg shadow p-6 flex items-center"
      >
        <div className="mr-4 text-blue-500">{icon}</div>
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-2xl font-bold">{value}</p>
        </div>
      </motion.div>
    );
  }

  function ChartCard({ title, children }) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-xl font-semibold mb-4">{title}</h3>
        {children}
      </div>
    );
  }

  function getStatusColor(status) {
    switch (status) {
      case 'Processing':
        return 'bg-yellow-200 text-yellow-800';
      case 'Shipped':
        return 'bg-blue-200 text-blue-800';
      case 'Delivered':
        return 'bg-green-200 text-green-800';
      case 'Cancelled':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-100 p-8"
    >
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard icon={<DollarSign className="w-8 h-8" />} title="Total Revenue" value={`₹${stats.totalRevenue?.toFixed(2) || 0}`} />
        <StatCard icon={<ShoppingBag className="w-8 h-8" />} title="Total Orders" value={stats.totalOrders || 0} />
        <StatCard icon={<TrendingUp className="w-8 h-8" />} title="Avg. Order Value" value={`₹${(stats.totalRevenue / stats.totalOrders || 0).toFixed(2)}`} />
        <StatCard icon={<Users className="w-8 h-8" />} title="Unique Customers" value={stats.uniqueCustomers || 0} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <ChartCard title="Revenue Over Time">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Orders by Status">
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.ordersByStatus}
                dataKey="count"
                nameKey="_id"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {stats.ordersByStatus?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Top 5 Products by Sales">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.topProducts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title="Monthly Revenue">
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.monthlyRevenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold mb-4 md:mb-0">Order Management</h2>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search orders..."
                value={search}
                onChange={handleSearch}
                className="pl-10 pr-4 py-2 border rounded-lg"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <select
              value={status}
              onChange={handleStatusFilter}
              className="pl-4 pr-8 py-2 border rounded-lg"
            >
              <option value="">All Statuses</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <select
              value={sortBy}
              onChange={handleSort}
              className="pl-4 pr-8 py-2 border rounded-lg"
            >
              <option value="">Sort By</option>
              <option value="orderDate:desc">Date (Newest)</option>
              <option value="orderDate:asc">Date (Oldest)</option>
              <option value="totalAmount:desc">Amount (High to Low)</option>
              <option value="totalAmount:asc">Amount (Low to High)</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-4xl font-medium text-gray-600">Order ID</th>
                  <th className="text-left py-3 px-4 text-4xl font-medium text-gray-600">Date</th>
                  <th className="text-left py-3 px-4 text-4xl font-medium text-gray-600">Customer</th>
                  <th className="text-left py-3 px-4 text-4xl font-medium text-gray-600">Total</th>
                  <th className="text-left py-3 px-4 text-4xl font-medium text-gray-600">Status</th>
                  <th className="text-left py-3 px-4 text-4xl font-medium text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-3xl text-gray-900">{order._id.slice(-6)}</td>
                    <td className="py-3 px-4 text-3xl text-gray-600">
                      {new Date(order.orderDate).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-3xl text-gray-600">{order.userId}</td>
                    <td className="py-3 px-4 text-3xl text-gray-900">₹{order.totalAmount.toFixed(2)}</td>
                    <td className="py-3 px-4">
                      <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="px-3 py-1.5 text-2xl font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors"
                        >
                          View
                        </button>
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className="px-2 py-1.5 text-2xl border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                        <button
                          onClick={() => deleteOrder(order._id)}
                          className="px-3 py-1.5 text-2xl font-medium text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>


        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-4xl font-semibold text-gray-900">Order Details</h2>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <p className="text-3xl text-gray-500 mb-1">Order ID</p>
                    <p className="text-2xl font-medium text-gray-900">{selectedOrder._id}</p>
                  </div>
                  <div>
                    <p className="text-3xl text-gray-500 mb-1">Date</p>
                    <p className="text-2xl font-medium text-gray-900">
                      {new Date(selectedOrder.orderDate).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-3xl text-gray-500 mb-1">Customer ID</p>
                    <p className="text-2xl font-medium text-gray-900">{selectedOrder.userId}</p>
                  </div>
                  <div>
                    <p className="text-3xl text-gray-500 mb-1">Status</p>
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-2xl font-medium ${getStatusBadgeClass(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div>
                    <p className="text-3xl text-gray-500 mb-1">Total Amount</p>
                    <p className="text-2xl font-medium text-gray-900">₹{selectedOrder.totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-3xl text-gray-500 mb-1">Shipping Address</p>
                    <p className="text-2xl font-medium text-gray-900">{selectedOrder.shippingAddress}</p>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-3xl font-semibold text-gray-900 mb-4">Items</h3>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-2 text-2xl font-medium text-gray-600">Product</th>
                        <th className="text-left py-2 text-2xl font-medium text-gray-600">Quantity</th>
                        <th className="text-left py-2 text-2xl font-medium text-gray-600">Price</th>
                        <th className="text-left py-2 text-2xl font-medium text-gray-600">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items.map((item, index) => (
                        <tr key={index} className="border-b border-gray-100">
                          <td className="py-3 text-2xl text-gray-900">{item.name}</td>
                          <td className="py-3 text-2xl text-gray-600">{item.quantity}</td>
                          <td className="py-3 text-2xl text-gray-600">₹{item.price.toFixed(2)}</td>
                          <td className="py-3 text-2xl text-gray-900">₹{(item.quantity * item.price).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
    </motion.div>
  );
}




