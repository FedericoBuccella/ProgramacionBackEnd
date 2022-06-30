const Productos = require('../../Productos')
const arrayProduct = new Productos()

const getProduct = (req, res) => {
    const productTotal = arrayProduct.productos
    res.render('index.hbs', {productTotal})
}

const postProduct = (req, res) =>{
    const productTotal = arrayProduct.productos
    const {nombre, price, url} = req.body 
    arrayProduct.agregar(req.body)
    res.render('index.hbs', {productTotal})
}

const formulario = (req,res)=>{
    res.render('index.hbs')
}

module.exports = { getProduct, postProduct, formulario }