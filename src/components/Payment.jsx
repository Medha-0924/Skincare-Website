








import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Shield, CreditCard, Truck, Clock, CheckCircle2, ArrowLeft } from 'lucide-react';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [processingPayment, setProcessingPayment] = useState(false);
  const { cart, totalCost } = location.state || { cart: [], totalCost: 0 };
  const [shippingAddress, setShippingAddress] = useState('');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!cart || cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const displayRazorpay = async () => {
    if (!userId) {
      toast.error('User not logged in. Please log in to complete the purchase.');
      navigate('/login');
      return;
    }
    if (!shippingAddress) {
      toast.error('Please enter a shipping address.');
      return;
    }
    setLoading(true);
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');

    if (!res) {
      toast.error('Razorpay SDK failed to load. Are you online?');
      setLoading(false);
      return;
    }

    try {
      const result = await axios.post('http://localhost:4003/api/create-order', {
        amount: totalCost,
      });

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: 'rzp_test_jnFll4vBKCwPho',
        amount: amount.toString(),
        currency: currency,
        name: 'Skincare Shop',
        description: 'Premium Skincare Products',
        order_id: order_id,
        handler: async function (response) {
          setProcessingPayment(true);
          try {
            const result = await axios.post('http://localhost:4003/api/verify-payment', {
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
              userId: userId,
              cartItems: cart,
              totalAmount: totalCost,
              shippingAddress: shippingAddress,
            });

            if (result.data.message === "Payment verified successfully and order created") {
              toast.success('Payment Successful! Order created. Redirecting to order history...');
              setTimeout(() => {
                navigate('/order-history');
              }, 2000);
            } else {
              throw new Error('Payment verification failed');
            }
          } catch (error) {
            toast.error('Payment verification failed');
          } finally {
            setProcessingPayment(false);
          }
        },
        prefill: {
          name: 'John Doe',
          email: 'johndoe@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#111827',
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      toast.error('Failed to create order');
    } finally {
      setLoading(false);
    }
  };




  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className=" mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <motion.div
            {...fadeInUp}
            className="bg-white rounded-2xl shadow-lg overflow-hidden"
          >
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-6">
                {cart.map((item) => (
                  <motion.div
                    key={item.productId}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg border border-gray-200">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-medium text-gray-900">{item.name}</h3>
                      <p className="mt-1 text-xl text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <p className="text-3xl font-medium text-gray-900">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </motion.div>
                ))}
              </div>

              <div className="mt-8 space-y-4 border-t border-gray-200 pt-6">
                <div className="flex justify-between text-2xl text-gray-600">
                  <p>Subtotal</p>
                  <p>₹{(totalCost - 50).toFixed(2)}</p>
                </div>
                <div className="flex justify-between text-2xl text-gray-600">
                  <p>Shipping</p>
                  <p>₹50.00</p>
                </div>
                <div className="flex justify-between text-lg font-medium text-gray-900">
                  <p>Total</p>
                  <p>₹{totalCost}</p>
                </div>
              </div>
              <div className="mt-8">
        <label htmlFor="shippingAddress" className="block text-sm font-medium text-gray-700">
          Shipping Address
        </label>
        <textarea
          id="shippingAddress"
          name="shippingAddress"
          rows="3"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Enter your shipping address"
          value={shippingAddress}
          onChange={(e) => setShippingAddress(e.target.value)}
        ></textarea>
      </div>
            </div>
          </motion.div>

          
          <motion.div
            {...fadeInUp}
            className="space-y-8"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Payment Details</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={displayRazorpay}
                    disabled={loading || processingPayment}
                    className={`w-full flex items-center justify-center px-8 py-4 border border-transparent text-xl font-medium rounded-xl text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors
                      ${(loading || processingPayment) ? 'opacity-75 cursor-not-allowed' : ''}
                    `}
                  >
                    {loading ? (
                      'Loading...'
                    ) : processingPayment ? (
                      'Processing Payment...'
                    ) : (
                      <>
                        <CreditCard className="w-8  h-8 mr-2" />
                        Pay ₹{totalCost}
                      </>
                    )}
                  </motion.button>
                </div>
              </div>
            </div>

            
            <motion.div
              {...fadeInUp}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <h3 className="text-3xl font-semibold text-gray-900 mb-6">Why Choose Us</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start space-x-3">
                  <Shield className="w-8 h-8 text-gray-900" />
                  <div>
                    <h4 className="font-medium text-3xl text-gray-900">Secure Payment</h4>
                    <p className="text-xl text-gray-500">Your payment is protected by bank-level security</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Truck className="w-8 h-8 text-gray-900" />
                  <div>
                    <h4 className="font-medium text-3xl text-gray-900">Fast Delivery</h4>
                    <p className="text-xl text-gray-500">Free shipping on orders above ₹999</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="w-8 h-8 text-gray-900" />
                  <div>
                    <h4 className="font-medium text-3xl text-gray-900">Quality Products</h4>
                    <p className="text-xl text-gray-500">100% authentic and quality assured products</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-8 h-8 text-gray-900" />
                  <div>
                    <h4 className="font-medium text-3xl text-gray-900">24/7 Support</h4>
                    <p className="text-xl text-gray-500">Round the clock customer support</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


