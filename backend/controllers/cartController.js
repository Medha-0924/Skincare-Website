



const Cart = require('../models/Cart.js');

exports.addToCart = async (req, res) => {
  const { userId, item } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (cart) {
      let itemIndex = cart.items.findIndex(p => p.productId == item.id);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({
          productId: item.id,
          name: item.name,
          price: item.price.discounted,
          image: item.image,
          quantity: 1
        });
      }
      cart = await cart.save();
    } else {
      cart = await Cart.create({
        userId,
        items: [{
          productId: item.id,
          name: item.name,
          price: item.price.discounted,
          image: item.image,
          quantity: 1
        }]
      });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error adding item to cart", error: error.message });
  }
};

exports.getCart = async (req, res) => {
  const { userId } = req.params;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      // If cart doesn't exist, create a new one
      cart = await Cart.create({ userId, items: [] });
    }
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: "Error fetching cart", error: error.message });
  }
};

exports.updateCart = async (req, res) => {
  const { userId, productId, change } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      const itemIndex = cart.items.findIndex(item => item.productId == productId);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity = Math.max(1, cart.items[itemIndex].quantity + change);
        await cart.save();
        res.status(200).json(cart);
      } else {
        res.status(404).json({ message: "Item not found in cart" });
      }
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error updating cart", error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = cart.items.filter(item => item.productId != productId);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error removing item from cart", error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  const { userId } = req.body;
  try {
    const cart = await Cart.findOneAndUpdate({ userId }, { items: [] }, { new: true });
    if (cart) {
      res.status(200).json({ message: "Cart cleared successfully", cart });
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error clearing cart", error: error.message });
  }
};



