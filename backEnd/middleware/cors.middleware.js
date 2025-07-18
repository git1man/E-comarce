const cors = require('cors');

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',');

const corsOptions = {
    origin: function(origin,callback){
        if(!origin) return callback(null,true)
        if(allowedOrigins.includes(origin)){
            return callback(null, true)
        }else{
            return callback(new Error('CORS Policy : Origin not allowed'))
        }
    },
    credentials:true, 
    methods:['GET','POST','DELETE','PUT'],
    allowedHeaders:['Content-Type', 'Authorization']
};
module.exports = cors(corsOptions);
