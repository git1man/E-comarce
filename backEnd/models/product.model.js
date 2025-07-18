const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:Number,
    desc:String,
    imgURL:String,
    stock:{
        type:Number,
        default:0
    },
    category:[{
        type:String,
        required: true

    }]
},{
    timestamps:true,
    versionKey:false
    
})

module.exports = mongoose.model('Product',productSchema);