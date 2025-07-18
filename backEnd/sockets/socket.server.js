const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {handleAdminReply,handleUserMessage} = require('../controllers/chat.controller')
const {getIO} = require('./io');

module.exports= ()=>{
    const io = getIO();

    io.use(async (socket,next)=>{
        const token = socket.handshake.auth.token;
        if(!token) return next(new Error('Authintication error'))

            try{
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                const user = await User.findById(decoded.id);
                if(!user) return next(new Error('User not found'));
                socket.user = user;
                next();
            }catch(err){
                next(new Error('Invalid token'))
            }
    });

io.on('connection',(socket)=>{
    if(socket.user.role === 'admin'){
        socket.join('admin-room')
    }
    else{
        socket.join(socket.user._id.toString())
    }
 handleUserMessage(io,socket);
 handleAdminReply(io,socket);

})





}