import express from 'express';
import handlebars from "express-handlebars"
import productsRouter from './routes/products.js'
import cartsRouter from './routes/carts.js'
import viewsRouter from "./routes/views.js"
import __dirname from './utils.js'
import { Server } from 'socket.io';
import mongoose from 'mongoose';
import Products from './dao/managersMongo/products.js';
import ChatManager from './dao/managersMongo/chat.js';

const app = express();
const PORT = 8080;
const connection = mongoose.connect('mongodb+srv://dbCoder:dbCoder1357@cluster0.vl3zuov.mongodb.net/ecommerce')

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(__dirname + `/public`));


app.use('/', viewsRouter)
app.use('/api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const server = app.listen(PORT, () => {
    console.log("Server On");
});


const io = new Server(server);
io.on("connection", async (socket) => {
    console.log("New connection");
    const products = await Products.getProducts();
    socket.emit("products", products);


    socket.on("newProduct", async (data) => {
        const product = {
            title: data.title,
            description: data.description,
            code: data.code,
            price: data.price,
            status: true,
            stock: 10,
            category: "",
            thumbnails: data.thumbnails,
        };
        
        await Products.addProduct(product);
    
        const products = await Products.getProducts();
        socket.emit("products", products);
    });

    socket.on("deleteProduct", async (data) => {
        await Products.deleteProduct(data);
        
        const products = await Products.getProducts();
        socket.emit("products", products);
    });

    socket.on("newChatUser", (data) => {
        socket.broadcast.emit("newChatUser", data + " has joined the chat");
    });

    socket.on("newMessage", async (data) => {
        await ChatManager.createMessage(data);
        const messages = await ChatManager.getMessages();
        io.emit("messages", messages);
    });
});


// codigo pre mongo

// app.get("/", async (req, res) => {
//     try {
//         const response = await fetch('http://localhost:8080/api/products');
//         const products = await response.json();
//         res.render('home', { products });
//     } catch (error) {
//         console.error("Error al obtener los productos:", error);
//         res.render('home', { products: [] });
//     }
// });

// app.get("/realtimeproducts", (req, res) => {
//     res.render('realTimeProducts');
// });



// const io = new Server(server);

// io.on('connection', (socket) => {
//     console.log('Usuario conectado al socket:', socket.id);

//     socket.on('newProductAdded', () => {
//         io.emit('productsUpdate');
//     });
// });
