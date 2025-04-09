

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController.js');
const cartController = require('../controllers/cartController.js');
const paymentController = require('../controllers/paymentController.js');
const orderController = require('../controllers/OrderController.js');
const adminController = require('../controllers/adminController.js');

// Auth routes
router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.post('/verify-login-otp', authController.verifyLoginOTP);
router.post('/logout', authController.logout);

// Cart routes
router.post('/cart/add', cartController.addToCart);
router.get('/cart/:userId', cartController.getCart);
router.put('/cart/update', cartController.updateCart);
router.delete('/cart/remove', cartController.removeFromCart);
router.post('/cart/clear', cartController.clearCart);

// Payment routes
router.post('/create-order', paymentController.createOrder);
router.post('/verify-payment', paymentController.verifyPayment);


router.get('/orders/:userId', orderController.getOrders);
router.get('/order/:orderId', orderController.getOrderById);


router.get('/orders', adminController.getOrders);
router.get('/order-stats', adminController.getOrderStats);
router.put('/orders/:orderId/status', adminController.updateOrderStatus);
router.delete('/orders/:orderId', adminController.deleteOrder);


module.exports = router;
