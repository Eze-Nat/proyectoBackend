const socket = io();
const productList = document.getElementById('productList');


const srvResponse = document.getElementById("srvResponse");
const btnAddProduct = document.getElementById("btnAddProduct");
const btnDeleteProduct = document.getElementById("btnDeleteProduct");

socket.on("products", (data) => {
  let html = `<table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Title</th>
                  <th scope="col">Image</th>
                  <th scope="col">Description</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody id="products">`;

  data.forEach((prod) => {
    html += `<tr>
              <td>${prod._id}</td>
              <td>${prod.title}</td>
              <td><img src="${prod.thumbnails}" alt="" width="100px" /></td>
              <td>${prod.description}</td>
              <td>$ ${prod.price}</td>
            </tr>`;
  });
  html += `</tbody></table>`;
  srvResponse.innerHTML = html;
});

const addProduct = () => {
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const code = document.getElementById("code").value;
  const thumbnails = document.getElementById("thumbnails").value;
  const product = {
    title: title,
    description: description,
    price: price,
    code: code,
    thumbnails: [thumbnails],
  };
  socket.emit("newProduct", product);
  // Limpio los campos
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("price").value = "";
  document.getElementById("code").value = "";
  document.getElementById("thumbnails").value = "";
};

btnAddProduct.onclick = addProduct;

const deleteProduct = () => {
  const idProduct = document.getElementById("inputDeleteId").value;
  socket.emit("deleteProduct", idProduct);
  document.getElementById("inputDeleteId").value = "";
};

btnDeleteProduct.onclick = deleteProduct;


// socket.on('productsUpdate', () => {
//   // Actualizar la vista con la lista de productos actualizados
//   getProductListFromServer();
// });


// // Definir la función para renderizar la lista de productos
// function renderProductList(products) {
//   const productListHTML = products.map(product => `
//     <li>${product.title} - ${product.description} - ${product.price}</li>
//   `).join('');

//   productList.innerHTML = productListHTML;
// }

// // Obtener la lista de productos desde el servidor y renderizarla
// function getProductListFromServer() {
//   fetch('/api/products')
//     .then(response => response.json())
//     .then(products => renderProductList(products))
//     .catch(error => console.error('Error al obtener la lista de productos', error));
// }

// // Llamada inicial para obtener la lista de productos y renderizarla
// getProductListFromServer();

