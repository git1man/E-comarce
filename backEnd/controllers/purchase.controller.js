const Purchase= require('../models/purchase.model');
const Product= require('../models/product.model');
const mongoose = require('mongoose');

exports.buyProduct= async(req,res)=>{
    const {productId, quantity}=req.body;
    const product = await Product.findById(productId);
    if(!product) return res.status(404).json({message:'Product not found'});

    const purchase = await Purchase.create({
        user:req.user._id, 
        price: product.price,
        quantity :quantity || 1,
        product:product._id
    });

    res.status(201).json({message:'purchase created',purchase});
}

exports.getUserPurchases= async (req,res)=>{
    const purchases = await Purchase.find({user:req.user._id});
    res.status(200).json({message:"list of user purchases",data:purchases});
}

exports.getAllUserPurchases= async (req,res)=>{
    const purchases = await Purchase.find().populate('product user','name email price -_id');
    res.status(200).json({message:"list of user purchases",data:purchases});
}

exports.makePurchase= async(req,res,next)=>{
    const session = await mongoose.startSession();
    session.startTransaction();
try{
     const {productId, quantity}=req.body;
     const updatedProduct = await Product.findOneAndUpdate(
        {_id:productId, stock:{$gte:quantity}},{$inc: {stock : -quantity}},{new:true,session}
     );
     if(!updatedProduct){
        throw new Error('Product not found or stock less than quantity')
     }
     const purchase = await Purchase.create([
        {
            user:req.user.id,
            product: productId,
            quantity,
            price: updatedProduct.price
        }
     ],{session});

await session.commitTransaction();
session.endSession();

res.status(201).json({message:'purchase successful',purchase})
    }
    catch(err){
        await session.abortTransaction();
        session.endSession();
        next(err);
    }
}