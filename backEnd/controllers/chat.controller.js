exports.handleUserMessage = (io,socket)=>{
    socket.on('userMessage',(message)=>{
        const payload = {
            from: socket.user.name,
            userId:socket.user._id,
            role:'user',
            message,
            time:new Date()
        }
        io.to('admin-room').emit('chatFromUser',payload);
    })
}
exports.handleAdminReply=(io,socket)=>{
    socket.on('adminReply',({message,userId})=>{
        console.log(message);
        
        const payload = {
            from:'Admin',
            role:'admin',
            message,
            time: new Date()
        }
        io.to(userId).emit('chatFromAdmin',payload);
        console.log(userId);
        
    })
}