import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Trash2, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const userId = 'testUser'; 
      const response = await axios.get(`http://localhost:4003/api/cart/${userId}`);
      setCartItems(response.data.items);
    } catch (error) {
      console.error('Error fetching cart:', error);
      toast.error('Failed to fetch cart items');
    }
  };

  const updateQuantity = async (id, change) => {
    try {
      const userId = 'testUser'; 
      const response = await axios.put(`http://localhost:4003/api/cart/update`, {
        userId,
        productId: id,
        change
      });
      setCartItems(response.data.items);
      toast.success('Cart updated successfully');
    } catch (error) {
      console.error('Error updating cart:', error);
      toast.error('Failed to update cart');
    }
  };

  const removeItem = async (id) => {
    try {
      const userId = 'testUser'; 
      const response = await axios.delete(`http://localhost:4003/api/cart/remove`, {
        data: { userId, productId: id }
      });
      setCartItems(response.data.items);
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item from cart:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'mac') {
      setDiscount(10);
      toast.success('Coupon applied successfully!');
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 50.0;
  const total = subtotal + shipping - discount;

  const handleCheckout = () => {
    navigate('/payment', { 
      state: { 
        cart: cartItems,
        totalCost: total.toFixed(2)
      } 
    });
  };

  return (
    <div className="min-h-screen bg-[#f8f5f1]">
      <div className="mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-8 border-b border-gray-200">
                <h1 className="text-[2.5vw] font-serif text-gray-900">Shopping Cart</h1>
                <p className="mt-2 text-2xl text-gray-500">{cartItems.length} items</p>
              </div>
              <ul className="divide-y divide-gray-200">
                <AnimatePresence>
                  {cartItems.map((item) => (
                    <motion.li
                      key={item.productId}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="p-6"
                    >
                      <div className="flex items-center">
                        <div className="h-44 w-44 flex-shrink-0 overflow-hidden rounded-xl border border-gray-200">
                          {item.image ? (
                            <motion.img
                              src={item.image}
                              alt={item.name}
                              className="h-full w-full object-cover object-center"
                              whileHover={{ scale: 1.05 }}
                            />
                          ) : (
                            <div className="h-full w-full bg-gray-100 flex items-center justify-center">
                              <span className="text-gray-400">No Image</span>
                            </div>
                          )}
                        </div>
                        <div className="ml-6 flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-3xl font-medium text-gray-900">{item.name}</h3>
                              <p className="mt-1 text-2xl text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                            <p className="text-3xl font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center p-4 space-x-4">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateQuantity(item.productId, -1)}
                                className="rounded-full p-1 hover:bg-gray-100"
                              >
                                <Minus className="h-8 w-8" />
                              </motion.button>
                              <span className="text-2xl text-gray-600">{item.quantity}</span>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => updateQuantity(item.productId, 1)}
                                className="rounded-full p-1 hover:bg-gray-100"
                              >
                                <Plus className="h-8 w-8" />
                              </motion.button>
                            </div>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => removeItem(item.productId)}
                              className="text-gray-400 hover:text-gray-500"
                            >
                              <Trash2 className="h-8 w-8" />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-3xl font-medium text-gray-900">Order Summary</h2>
              <div className="mt-6 space-y-4">
                <div className="flex justify-between">
                  <p className="text-3xl text-gray-600">Subtotal</p>
                  <p className="text-3xl font-medium text-gray-900">₹{subtotal.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                  <p className="text-2xl text-gray-600">Shipping</p>
                  <p className="text-2xl font-medium text-gray-900">₹{shipping.toFixed(2)}</p>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <p className="text-2xl">Discount</p>
                    <p className="text-2xl font-medium">-₹{discount.toFixed(2)}</p>
                  </div>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between">
                    <p className="text-3xl font-medium text-gray-900">Total</p>
                    <p className="text-3xl font-medium text-gray-900">₹{total.toFixed(2)}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={applyCoupon}
                    className="absolute right-2 top-1 px-12 py-4 bg-gray-900 text-white text-sm rounded-md hover:bg-gray-800"
                  >
                    Apply
                  </motion.button>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="mt-6 w-full flex items-center justify-center px-8 py-6 border border-transparent rounded-lg text-2xl font-medium text-white bg-gray-900 hover:bg-gray-800"
              >
                Proceed to Payment
                <ChevronRight className="ml-2 h-5 w-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

