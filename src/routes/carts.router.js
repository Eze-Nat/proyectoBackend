import { Router } from "express";
import Carts from "../dao/managersMongo/CartManager.js"

const router = Router();
const cartsManager = new Carts()


router.get("/", async(req, res) => {
    const carts = await cartsManager.getAll()
    res.send({status:"success", payload: carts})
});

router.post("/", async(req, res) => {
    try {
        const result = await cartsManager.saveCart(req.body)
        res.send({status:"success", payload: result})
    } catch (error) {
        res.status(500).send({status:"error", error})
    }

})

router.put("/:cid/:pid", async(req, res) => {
    try {
        const {cid, pid} = req.params
        const result = await cartsManager.addProductToCart(cid, pid)
        res.send({status:"success", payload: result})
    } catch (error) {
        res.status(500).send({status:"error", error})
    }

})

router.put("/:cid/product/:pid", async(req, res) => {
    const {cid, pid} = req.params
    const newQuantity = req.body.quantity
    try {
        const cart = await cartsManager.addProductToCart(cid, pid, newQuantity)
        res.send({status:"success", payload: cart})
    } catch (error) {
        res.status(500).send({status:"error", error})
    }

})
// Agrega un producto a un carrito específico
router.post("/:cid/product/:pid", async (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;

    try {
        const cart = await getAll(cartId);
        if (!cart) {
            res.status(404).json({ error: "Carrito no encontrado" });
            return;
        }

        const existingProduct = cart.products.find(product => product.id === productId);
        if (existingProduct) {
            existingProduct.quantity += quantity;
        } else {
            cart.products.push({ id: productId, quantity });
        }

        await saveCart(cart);

        res.json({ message: "Producto agregado al carrito exitosamente", cart });
    } catch (error) {
        res.status(500).json({ error: "Error al agregar el producto al carrito" });
    }
});



// codigo viejo premongo

// const CARTS_FILE_PATH = "../../carrito.json";

// function generateUniqueId() {
//     const carts = getCartsFromFile();
//     const lastCart = carts[carts.length - 1];
//     const lastId = lastCart ? parseInt(lastCart.id) : 0;
//     return (lastId + 1).toString();
// }

// // Crea un nuevo carrito
// router.post("/", async (req, res) => {
//     try {
//         const newCart = {
//             id: generateUniqueId(),
//             products: []
//         };

//         await saveCart(newCart);

//         res.status(201).json({ message: "Carrito creado exitosamente", cart: newCart });
//     } catch (error) {
//         res.status(500).json({ error: "Error al crear el carrito" });
//     }
// });

// // Obtiene los productos de un carrito específico
// router.get("/:cid", async (req, res) => {
//     const cartId = req.params.cid;
//     try {
//         const cart = await getCart(cartId);
//         if (!cart) {
//             res.status(404).json({ error: "Carrito no encontrado" });
//             return;
//         }
        
//         res.json(cart.products);
//     } catch (error) {
//         res.status(500).json({ error: "Error al obtener los productos del carrito" });
//     }
// });

// // Agrega un producto a un carrito específico
// router.post("/:cid/product/:pid", async (req, res) => {
//     const cartId = req.params.cid;
//     const productId = req.params.pid;
//     const quantity = req.body.quantity || 1;

//     try {
//         const cart = await getCart(cartId);
//         if (!cart) {
//             res.status(404).json({ error: "Carrito no encontrado" });
//             return;
//         }

//         const existingProduct = cart.products.find(product => product.id === productId);
//         if (existingProduct) {
//             existingProduct.quantity += quantity;
//         } else {
//             cart.products.push({ id: productId, quantity });
//         }

//         await saveCart(cart);

//         res.json({ message: "Producto agregado al carrito exitosamente", cart });
//     } catch (error) {
//         res.status(500).json({ error: "Error al agregar el producto al carrito" });
//     }
// });

// // Función para guardar el carrito en el archivo
// async function saveCart(cart) {
//     try {
//         const carts = await getCartsFromFile();
//         const existingCartIndex = carts.findIndex(c => c.id === cart.id);

//         if (existingCartIndex !== -1) {
//             carts[existingCartIndex] = cart;
//         } else {
//             carts.push(cart);
//         }

//         await fs.promises.writeFile(CARTS_FILE_PATH, JSON.stringify(carts, null, 2));
//     } catch (error) {
//         console.error('Error al guardar el carrito:', error);
//         throw error;
//     }
// }

// // Función para obtener un carrito por su ID
// async function getCart(cartId) {
//     const carts = await getCartsFromFile();
//     return carts.find(cart => cart.id === cartId);
// }

// // Función para obtener todos los carritos del archivo
// async function getCartsFromFile() {
//     try {
//         const data = await fs.promises.readFile(CARTS_FILE_PATH, "utf-8");
//         return JSON.parse(data);
//     } catch (error) {
//         return [];
//     }
// }



export default router;
