class Productos {
    
    constructor(){
        this.productos = []
        this.id = 0
    }

    filtrado(id){
        const productoElegido = this.productos.find(product => product.id == id)
        return productoElegido || {error: 'Debe ingresar un dato numerico'}
    }

    agregar(product){
        const nuevoProducto = { ...product, id: ++this.id}
        this.productos.push(nuevoProducto)
        return nuevoProducto
    }

    borrar(id){
        const productoFil = this.productos.findIndex(prod => prod.id == id )
        if(productoFil > 0){
            const productoBorrado = this.productos.splice(productoFil, 1)
            return productoBorrado
        } else {
            return {error: 'No se encuentra el producto seleccionado'}
        }
    }

    modificar(prod,id){
        const nuevoProd = { id: Number(id), ...prod}
        const productoModificar = this.productos.findIndex(product => product.id == id)
        if (productoModificar !== -1) {
            this.productos[productoModificar] = nuevoProd
            return nuevoProd
        } else {
            return { error: 'producto no encontrado' }
        }
    }
}

module.exports = Productos