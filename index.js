require('dotenv').config()
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const app = express();
const httpStatusText = require('./utils/httpStatusText');
app.use(cors())

const url = process.env.MONGO_URL;

mongoose.connect(url).then(() => {
    console.log('mongodb server started')
})

app.use(express.json());

const deviceRouter = require('./routes/device.route');
const topoRouter = require('./routes/topo.route');
const textRouter = require('./routes/text.route');
const linkRouter = require('./routes/link.route');


app.use('/api/topo', topoRouter)
app.use('/api/device', deviceRouter)
app.use('/api/text', textRouter)
app.use('/api/link', linkRouter)


// global middleware for not found router
app.all('*', (req, res, next) => {
    return res.status(404).json({ status: httpStatusText.ERROR, message: 'this resource is not available' })
})

// global error handler
app.use((error, req, res, next) => {
    res.status(error.statusCode || 500).json({ status: error.statusText || httpStatusText.ERROR, message: error.message, code: error.statusCode || 500, data: null });
})
app.listen(process.env.PORT || 4000, () => {
    console.log('listening on port: 4000');
});


// sockets 
const { createServer } = require('node:http');
const { Server } = require("socket.io");
const server = http.createServer(app);
const io = new Server(server)
io.on('connect', (socket) => {
    socket.on('dataFromClient', (data) => {
        const { room, message } = data;
        // io.to(room).emit('message', message);
        console.log(room);
        socket.join(room);
    });
    // Listen for mouseMove events from clients
    socket.on('mouseMove', (data) => {
        // Broadcast the mouse movement data to all connected clients except the sender
        socket.broadcast.emit('mouseMove', data);
    });
    socket.on('controllerMove', (data) => {
        // Broadcast the mouse movement data to all connected clients except the sender
        socket.broadcast.emit('controllerMove', data);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => {
    console.log('server running at 3000');
});