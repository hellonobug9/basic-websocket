const express = require('express')
const app = express()
const path = require('path')
const staticHTML = path.join(__dirname, './public')
const http = require('http');
const socket = require('socket.io')
const server = http.createServer(app);
const io = socket(server)

app.use(express.static(staticHTML))
io.on('connection', socket => {
    console.log('Hello new socket!!!');
    socket.emit('message', 'Welcome!')
    socket.broadcast.emit('message', 'A new user joined!');
    socket.on('shareLocation', (location) => {
        socket.broadcast.emit('message', `user's latitude is ${location.latitude}`)
    })
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })
})


server.listen(3000)