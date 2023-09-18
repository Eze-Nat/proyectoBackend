
import express from 'express';
import handlebars, { engine } from "express-handlebars";
import http from 'http';
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import path from 'path';
import __dirname from './utils.js'

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';
import viewsRouter from './routes/views.router.js';
import Products from './dao/managersMongo/ProductManager.js';
import ChatManager from './dao/managersMongo/ChatManager.js';

const app = express();
const PORT = 8080;

mongoose.connect('mongodb+srv://dbCoder:dbCoder1357@cluster0.vl3zuov.mongodb.net/ecommerce', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Conexión a MongoDB establecida');
    })
    .catch((error) => {
        console.error('Error al conectar a MongoDB:', error);
    });

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use('/', viewsRouter);
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

const server = app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});

const io = new Server(server)
const productsManager = new Products();

io.on('connection', async (socket) => {
    console.log('Nueva conexión');

    const products = await productsManager.getAll();
    socket.emit('productsList', products);

    socket.on('addProduct', async (productData) => {
        try {
            // Agregar el nuevo producto a MongoDB
            const product = {
                title: productData.title,
                description: productData.description,
                code: productData.code,
                price: productData.price,
                status: true,
                stock: 10,
                category: "",
                thumbnails: productData.thumbnails,
            };
            await productsManager.addProduct(product);

            // Obtener la lista actualizada de productos desde MongoDB
            const updatedProducts = await productsManager.getAll();

            // Emitir la lista actualizada de productos a todos los clientes
            io.emit('productsList', updatedProducts);
        } catch (error) {
            console.error('Error al agregar el producto:', error);
        }
    });

    // socket.on('newProduct', async (data) => {
    //     const product = {
    //         title: data.title,
    //         description: data.description,
    //         code: data.code,
    //         price: data.price,
    //         status: true,
    //         stock: 10,
    //         category: "",
    //         thumbnails: data.thumbnails,
    //     };

    //     await productsManager.addProduct(product);

    //     const updatedProducts = await productsManager.getProducts();
    //     io.emit('products', updatedProducts);
    // });

    socket.on('deleteProduct', async (data) => {
        await productsManager.deleteProduct(data);

        const updatedProducts = await productsManager.getProducts();
        io.emit('products', updatedProducts);
    });

    socket.on('newChatUser', (data) => {
        socket.broadcast.emit('newChatUser', data + ' has joined the chat');
    });

    socket.on('newMessage', async (data) => {
        await ChatManager.createMessage(data);
        const messages = await ChatManager.getMessages();
        io.emit('messages', messages);
    });
    socket.on('updateProductList', async () => {
        const updatedProducts = await productsManager.getAll();
        io.emit('products', updatedProducts);
    });

});


// Manejo de errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});