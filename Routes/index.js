const {Router} = require('express')
const router = Router()
const { getProduct, postProduct, formulario } = require('../public/controller/productosControl')

router.get('/', getProduct)

router.get('/', formulario)

router.post('/', postProduct) 

module.exports = router