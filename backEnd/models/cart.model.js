const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  products: [
    {
      product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Product', 
        required: true 
      },
      quantity: { 
        type: Number, 
        default: 1, 
        min: 1 
      }
    }
  ]
}, {
  timestamps: true,
  versionKey: false
});

module.exports = mongoose.model('Cart', cartSchema);
