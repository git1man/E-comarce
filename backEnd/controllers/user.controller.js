const User = require('../models/user.model');

const catchAsync = require('../utils/catch-async.utils');
const AppError = require('../utils/app-error.utils');

exports.createUser= (role)=>{
return catchAsync( async (req,res,next)=>{
const {name, email, password}= req.body

if(!['admin','user'].includes(role)){
    return next(new AppError('Invalid role in creating user'),400);
}



const existing= await User.findOne({email});
if(existing){
    return next(new AppError('Email already exists'),400);
}
const user = await User.create({name, email,password,role});
 res.status(201).json({message:"user created", user})
}
)
}
exports.getUsers = async(req,res)=>{
const users = await User.find();
res.status(200).json({message:"list of users", data:users})
}

