 const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const corsMiddleware = require('./middleware/cors.middleware');
const connectDB = require('./config/db.config');
const AppError = require('./utils/app-error.utils');
const globalErrorHandler = require('./middleware/error-handler.middleware');
const path = require('path');

const http= require('http');
const socketIO = require('./sockets/io');
const socketServer = require('./sockets/socket.server');

const app = express();

const server = http.createServer(app);
socketIO.init(server);
socketServer();


app.use(express.json());
app.get('/favicon.ico', (req, res) => res.status(204));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(corsMiddleware);

connectDB();
app.use('/api/products',require('./routes/product.route'));
app.use('/api/purchase',require('./routes/purchase.route'));
app.use('/api/user',require('./routes/user.route'));
app.use('/api/auth',require('./routes/auth.route'));
app.use('/api/reports',require('./routes/reports.route'));
app.use('/api/admin',require('./routes/admin.route'));
app.use('/api/cart',require('./routes/cart.route'))


app.use((req,res,next)=>{
    next(new AppError(`Can't find ${req.originalUrl} on this server`,404))
})

app.use(globalErrorHandler);



const PORT = process.env.PORT
server.listen(PORT,()=> {
 
    console.log(`server running on port: ${PORT}`)})
