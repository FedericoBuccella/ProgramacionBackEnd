const express = require('express')
const  { Server: IOServer } = require('socket.io')
const { engine } = require('express-handlebars')
const path = require('path')
const puerto = 8080
const app = express()
const rutas = require('./Routes/index')
const message = []
const product = []


app.use(express.json())
app.use(express.urlencoded({ extended: true })) 

app.use(express.static(path.join(__dirname, './public')))
app.use('/', rutas)

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './public/views/layouts/main.hbs'),
    layoutsDir: path.join(__dirname, './public/views/layouts'),
    partialsDir: path.join(__dirname, './public/views/partials')
    
}))

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, './public/views'))

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
    io.emit('server: message', message)
    io.emit('server: product', product)

    socket.on('cliente: message', infoMensaje =>{
        message.push(infoMensaje)
        io.emit('server: message', message)
    } )

    socket.on('cliente: product', infoProduct =>{
        product.push(infoProduct)
        io.emit('server: product', product)
    } )
})