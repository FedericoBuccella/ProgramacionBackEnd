const express = require('express')
const  { Server: IOServer } = require('socket.io')
const app = express()
const path = require('path')
puerto = 8080
const message = []

const serverExpress = app.listen(puerto, (err)=>{
    if (err) {
        console.log(`Ocurrio un error ${err}`)
    }else{
        console.log(`Servidor escuchando puerto: ${puerto}`)
    }
})

const io =  new IOServer(serverExpress)

app.use(express.static(path.join(__dirname, './public')))

io.on('connection', socket => {
    console.log(`Se conecto un usuario ID: ${socket.id}`)
    io.emit('server: message', message)

    socket.on('cliente: message', infoMensaje =>{
        message.push(infoMensaje)
        io.emit('server: message', message)
    } )
})