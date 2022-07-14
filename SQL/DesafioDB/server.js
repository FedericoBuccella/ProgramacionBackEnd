const express = require('express')
const app = express()
const  { Server: IOServer } = require('socket.io')
const path = require('path')

import products from "./controllers/products";
import messages from "./controllers/messages";

const puerto = 8080
const message = []
const product = []

app.use(express.static(path.join(__dirname, '/public')))

const serverExpress = app.listen(puerto, (err)=>{
    if (err) {
        console.log(`Ocurrio un error ${err}`)
    }else{
        console.log(`Servidor escuchando puerto: ${puerto}`)
    }
})

const io =  new IOServer(serverExpress)

io.on('connection', socket => {
    console.log(`Se conecto un usuario ID: ${socket.id}`)
    
    const messagesLog = await messages.getMessages();
    io.emit('server: message', {messagesLog})
    socket.on('cliente: message', async (data) =>{
        await messages.addMessage(data)
        const messagesLog = await messages.getMessages()
        io.emit('server: message', {messagesLog})
    } )

    const prod = await products.getAll();
    io.emit('server: product', prod)
    socket.on('cliente: product', async (data) =>{
        data.price = Number(data.price);
        await products.add(data);
        const prod = await products.getAll();
        io.emit('server: product', prod)
    } )
})