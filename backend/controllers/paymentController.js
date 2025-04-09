const Razorpay = require('razorpay');
const crypto = require('crypto');
const config = require('../config/appConfig.js');
const Cart = require('../models/Cart.js');
const Order = require('../models/Order.js');

const razorpay = new Razorpay(config.razorpay);

exports.createOrder = async (req, res) => {
  try {
    const options = {
      amount: Math.round(req.body.amount * 100),
      currency: "INR",
      receipt: crypto.randomBytes(10).toString('hex'),
    };

    const order = await razorpay.orders.create(options);
    res.json(order);
    
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: "Error creating order", error: error.message });
  }
};

exports.verifyPayment = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId, razorpaySignature, userId, cartItems, totalAmount, shippingAddress } = req.body;

  const sign = razorpayOrderId + "|" + razorpayPaymentId;
  const expectedSign = crypto
    .createHmac("sha256", config.razorpay.key_secret)
    .update(sign.toString())
    .digest("hex");

  if (razorpaySignature === expectedSign) {
    try {
      // Create a new order
      const newOrder = new Order({
        userId,
        items: cartItems,
        totalAmount,
        shippingAddress,
        paymentId: razorpayPaymentId,
      });
      await newOrder.save();

      // Clear the user's cart
      await Cart.findOneAndUpdate({ userId }, { items: [] });

      return res.status(200).json({ message: "Payment verified successfully and order created", orderId: newOrder._id });
    } catch (error) {
      console.error('Error saving order:', error);
      return res.status(500).json({ message: "Payment verified but failed to save order", error: error.message });
    }
  } else {
    return res.status(400).json({ message: "Invalid signature sent!" });
  }
};

