const socket = io();

console.log('Conectado al servidor');

// socket.on('products', (products) => {
//     const $container = document.getElementById('productList');

//     $container.innerHTML = '';

//     products.forEach(product => {
//         const div = document.createElement('div');
//         div.innerHTML += `
//             <h4>${product.title}</h4>
//             <p>${product.description}</p>
//             <p>Price: $${product.price}</p>
//             <p>Code: ${product.code}</p>
//             <img src="${product.thumbnails}" alt="${product.title}" />
//         `;

//         $container.appendChild(div);
//     });
// });

// const form = document.getElementById('formAdd');
// form.addEventListener('submit', async (e) => {
//     e.preventDefault();
//     const target = e.target;
//     const formData = new FormData(form);

//     const newProduct = {
//         title: formData.get('title'),
//         description: formData.get('description'),
//         price: +formData.get('price'),
//         code: formData.get('code'),
//         thumbnails: formData.get('thumbnails'), // Este campo ahora contiene el archivo
//     };

//     socket.emit('addProduct', newProduct);

//     target.title.value = '';
//     target.description.value = '';
//     target.price.value = '';
//     target.code.value = '';
//     target.thumbnails.value = ''; // Limpia el campo de archivo

//     const serverResponse = document.getElementById('srvResponse');
//     serverResponse.innerHTML = 'Product added successfully!';
// });




const productList = document.getElementById('productList');
// const socket = io();


document.addEventListener('DOMContentLoaded', () => {
    // Conectarse al servidor de Socket.IO

    // Obtener referencias a los elementos del formulario
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const priceInput = document.getElementById('price');
    const codeInput = document.getElementById('code');
    const thumbnailsInput = document.getElementById('thumbnails');
    const addProductButton = document.getElementById('btnAddProduct');
    const serverResponse = document.getElementById('srvResponse');

    // Agregar un evento de clic al botón "Add Product"
    addProductButton.addEventListener('click', () => {
        // Obtener los valores de los campos del formulario
        const title = titleInput.value;
        const description = descriptionInput.value;
        const price = priceInput.value;
        const code = codeInput.value;
        const thumbnails = thumbnailsInput.value;

        // Validar que todos los campos estén completos (puedes agregar más validaciones)
        if (!title || !description || !price || !code) {
            serverResponse.innerHTML = 'Please fill in all fields';
            return;
        }

        // Crear un objeto con los datos del producto
        const newProduct = {
            title,
            description,
            price,
            code,
            thumbnails,
        };

        // Enviar el objeto al servidor a través de Socket.IO
        socket.emit('addProduct', newProduct);

        // Limpiar los campos del formulario después de enviarlos
        titleInput.value = '';
        descriptionInput.value = '';
        priceInput.value = '';
        codeInput.value = '';
        thumbnailsInput.value = '';

        serverResponse.innerHTML = 'Product added successfully!';
    });

    // Escuchar eventos del servidor (puedes agregar más eventos según tus necesidades)
    socket.on('productAdded', (message) => {
        console.log('Server says:', message);
    });

    // Escucha eventos para actualizar la lista de productos en tiempo real
    socket.on('updateProductList', (products) => {
        // Borra la lista actual de productos
        productList.innerHTML = '';

        // Agrega los productos actualizados a la lista
        products.forEach((product) => {
            const productItem = document.createElement('div');
            productItem.className = 'product-item';
            productItem.innerHTML = `
        <h4>${product.title}</h4>
        <p>${product.description}</p>
        <p>Price: $${product.price}</p>
        <p>Code: ${product.code}</p>
        <img src="${product.thumbnails}" alt="${product.title}" />
      `;
            productList.appendChild(productItem);
        });
    });
})


socket.on('productsUpdate', () => {
    // Actualizar la vista con la lista de productos actualizados
    getProductListFromServer();
});


// Definir la función para renderizar la lista de productos
function renderProductList(products) {
    const productListHTML = products.map(product => `
    <li>${product.title} - ${product.description} - ${product.price}</li>
  `).join('');

    productList.innerHTML = productListHTML;
}

// Obtener la lista de productos desde el servidor y renderizarla
function getProductListFromServer() {
    fetch('/products')
        .then(response => response.json())
        .then(products => renderProductList(products))
        .catch(error => console.error('Error al obtener la lista de productos', error));
}

// Llamada inicial para obtener la lista de productos y renderizarla
getProductListFromServer();

