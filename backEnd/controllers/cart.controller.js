const Cart = require('../models/cart.model');
const Product = require('../models/product.model');


exports.getCart = async (req, res) => {
  const userId = req.query.userId || req.body.userId;

  if (!userId) {
    return res.status(400).json({ message: 'userId is required' });
  }

  try {
    const cart = await Cart.findOne({ user: userId }).populate('products.product');
    if (!cart) return res.status(404).json({ message: 'Cart is empty' });

    res.status(200).json({ cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.addToCart = async (req, res) => {
  const { userId, productId, quantity = 1 } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'userId and productId are required' });
  }

  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        products: [{ product: productId, quantity }]
      });
    } else {
      const index = cart.products.findIndex(p => p.product.toString() === productId);
      if (index > -1) {
        cart.products[index].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.status(200).json({ message: 'Product added to cart', cart });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};




exports.updateCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'userId and productId are required' });
  }

  if (quantity === undefined || quantity <= 0) {
    return res.status(400).json({ message: 'Quantity must be 1 or more' });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const index = cart.products.findIndex(p => p.product.toString() === productId);
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cart.products[index].quantity = quantity;

    await cart.save();
    res.status(200).json({ message: 'Cart updated', cart });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.deleteFromCart = async (req, res) => {
  const { userId, productId } = req.body;

  if (!userId || !productId) {
    return res.status(400).json({ message: 'userId and productId are required' });
  }

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: 'Cart not found' });

    const filteredProducts = cart.products.filter(
      p => p.product.toString() !== productId
    );

    if (filteredProducts.length === cart.products.length) {
      return res.status(404).json({ message: 'Product not found in cart' });
    }

    cart.products = filteredProducts;
    await cart.save();

    res.status(200).json({ message: 'Product removed from cart', cart });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

