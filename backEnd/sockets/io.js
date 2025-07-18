const {Server} = require('socket.io');

let io;

module.exports={
    init:(server)=>{
        const allowedOrigins = process.env.ALLOWED_ORIGINS.split(',');
        io= new Server(server,{
            cors:{
                origin:(origin,callback)=>{
                    if(!origin || allowedOrigins.includes(origin) || allowedOrigins.some(o=> origin.startsWith(o)))
                    {
                        callback(null, true)
                    }else{
                        callback(new Error('Socket IO CORS NOt Allowed Origin'))
                    }
                },
                methods:['GET','POST'],
                credentials:true
            }
        });
        return io;

    },
    getIO:()=>{
        if(!io) throw new Error('Socket IO Init error');
        return io;
    }
}