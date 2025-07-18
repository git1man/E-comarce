const Product = require('../models/product.model');
const cache = require('../utils/cache.util');
const logger = require('../utils/logger.util')
exports.createPoduct = async (req, res) => {
    try
    {
      cache.del('products');
      const { name, desc, price,stock,category } = req.body;

    const imgURL = req.file.filename;
    const myProduct = await Product.create({ name, desc, price,imgURL,stock,category });
    logger.info(`admin create new product product Id is: ${myProduct._id}`)
    res.status(201).json({ message : 'Product Created', myProduct});
    }
    catch(err){
        logger.error(`admin create error ${err.message}, data: ${req.body}`)
        res.status(500).json({
            message: 'Faild to create product',
            error:err.message
        })
    }
}
exports.getSearchProduct=async(req,res)=>{
  const { keyword } = req.query;

  if (!keyword) {
    return res.status(400).json({ message: 'Keyword is required for search' });
  }

  try {
    const products = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { desc: { $regex: keyword, $options: 'i' } }
      ]
    });

    res.status(200).json({ message: 'Search results', data: products });
  } catch (err) {
    res.status(500).json({ message: 'Error searching products', error: err.message });
  }
};



exports.getProducts= async(req,res)=>{


  const cacheKey = 'products';
  const cachedData = cache.get(cacheKey);
    if(cachedData)
    {
        res.status(200).json({message:'cached products',data:cachedData});
    }
    else{
    const products = await Product.find();
    cache.set(cacheKey,products);
      res.status(201).json({ message : 'List of products', data: products});
    }
}
exports.getSortedProducts = async (req, res) => {
  try {
    const { sortBy, order } = req.query;

    let sortCriteria = {};

    if (sortBy === 'price') {
      sortCriteria.price = order === 'asc' ? 1 : -1; // asc: low to high, desc: high to low
    } else if (sortBy === 'name') {
      sortCriteria.name = order === 'asc' ? 1 : -1; // asc: A to Z, desc: Z to A
    }

    const products = await Product.find().sort(sortCriteria);

    res.status(200).json({ message: 'Sorted products', data: products });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching sorted products', error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Optional: Only allow specific fields to be updated
    const allowedFields = ['name', 'price', 'desc', 'imgURL', 'stock'];
    const filteredUpdate = {};
    for (const key of allowedFields) {
      if (updateData[key] !== undefined) {
        filteredUpdate[key] = updateData[key];
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, filteredUpdate, {
      new: true,
      runValidators: true
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({
      message: 'Product updated successfully',
      data: updatedProduct
    });

  } catch (err) {
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
};


exports.getProductById= async(req,res)=>{
    const id = req.params.id
    const product = await Product.findById(id);
    if(product){
        res.status(200).json({message:'product data', data:product})
    }
    else{
        res.status(404).json({message:'product not found'})
    }
}

exports.getRelatedProducts= async(req,res)=>{
    const id = req.params.id
    const product = await Product.where('_id').ne(id).limit(5);
    if(product){
        res.status(200).json({message:'product data', data:product})
    }
    else{
        res.status(404).json({message:'product not found'})
    }
}