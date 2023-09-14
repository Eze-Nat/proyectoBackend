import ProductManager from './productManager.js'

const nuevoProducto = new ProductManager();


nuevoProducto.addProduct(
    "Producto 1",
    "Este es el producto 1.",
    100,
    "Aca va la imagen",
    "1234567890",
    10
);

nuevoProducto.addProduct(
    "Producto 2",
    "Este es el producto 2.",
    100,
    "Aca va la imagen",
    "11231",
    10
);

nuevoProducto.addProduct(
    "Producto 3",
    "Este es el producto 3.",
    100,
    "Aca va la imagen",
    "12345",
    10
);

// Actualizar el producto
nuevoProducto.updateProduct({
    id: 3,
    title: 'Producto 3',
    description: 'Este es el producto 3. Actualizado',
    price: 900,
    thumbnail: 'Nueva imagen',
    code: '12345',
    stock: 20
}).then(() => {
    console.log("Producto Actualizado");
}).catch(error => {
    console.error("Error actualizando producto:", error);
});

// Todos los productos
nuevoProducto.getProducts().catch(error => {
    console.error("Error buscando productos:", error);
});

// Test para retornar por ID
nuevoProducto.getProductById(2).then(product => {
    console.log("Producto con ID 2:", product);
}).catch(error => {
    console.error("Error buscando producto por ID:", error);
});

nuevoProducto.getProductById(50).then(product => {
    console.log(`Producto con ID 50`, product);
}).catch(error => {
    console.error("Error buscandpo producto por ID:", error);
});

// Borrar un producto
nuevoProducto.deleteProductById(2).catch(error => {
  console.error("Error borrando producto por ID:", error);
});

nuevoProducto.deleteProductById(3)
  .then(() => console.log("Producto borrado correctamente!"))
  .catch(error => console.error("Error borrando producto por ID:", error));




