import { Router } from "express";
import Products from "../dao/managers/products.js";
import { uploader } from "../utils.js";


const router = Router();
const productsManager = new Products()


router.get("/", async(req, res) => {
    const products = await productsManager.getAll()
    res.send({status:"success", payload: products})
})


router.post("/", uploader.single("thumbnail"), async(req, res) => {
    try {
        const thumbnailRoute = `http://localhost:8080/images/${req.file.filename}`
        const result = await productsManager.saveProduct(req.body, thumbnailRoute);
        res.send({status:"success", payload: result})
    } catch (error) {
        res.status(500).send({status:"error", error})
    }

})

//codigo viejo premongo

// import ProductManager from "../../productManager.js";
// const productManager = new ProductManager();

// router.get('/', (req, res) => {
//     const limit = parseInt(req.query.limit);
//     const products = productManager.products;
//     if (limit && !isNaN(limit)) {
//         res.json(products.slice(0, limit));
//     } else {
//         res.json(products);
//     }
// })

// router.get("/:pid", (req, res) => {
//     const productId = parseInt(req.params.pid);
//     const product = productManager.getProductById(productId);
//     if (!product) {
//         res.status(404).json({ error: "Producto no encontrado" });
//     } else {
//         res.json(product);
//     }
// });

// router.post("/", async (req, res) => {
//     const { title, description, price, code, stock } = req.body;
//     try {
//         const product = {
//             title,
//             description,
//             price,
//             code,
//             stock,
//             status: true
//         };

//         await productManager.addProduct(product);
//         router.emit('newProductAdded');
//         res.status(201).json({ message: "Producto agregado exitosamente" });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// router.put("/:pid", (req, res) => {
//     const productId = parseInt(req.params.pid);
//     const updatedFields = req.body;

//     try {
//         const existingProduct = productManager.getProductById(productId);
//         if (!existingProduct) {
//             res.status(404).json({ error: "Producto no encontrado" });
//             return;
//         }
//         console.log("Existing product before update:", existingProduct);

        
//         if (updatedFields.title) {
//             existingProduct.title = updatedFields.title;
//         }
//         if (updatedFields.description) {
//             existingProduct.description = updatedFields.description;
//         }
//         if (updatedFields.price) {
//             existingProduct.price = updatedFields.price;
//         }
//         if (updatedFields.thumbnail) {
//             existingProduct.thumbnail = updatedFields.thumbnail;
//         }
//         if (updatedFields.code) {
//             existingProduct.code = updatedFields.code;
//         }
//         if (updatedFields.stock) {
//             existingProduct.stock = updatedFields.stock;
//         }
//         if (updatedFields.category) {
//             existingProduct.category = updatedFields.category;
//         }
//         if (updatedFields.status) {
//             existingProduct.status = updatedFields.status;
//         }

//         console.log("Existing product after update:", existingProduct);

//         productManager.updateProduct(existingProduct);

//         res.json({ message: "Producto actualizado exitosamente" });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });

// router.delete("/:pid", (req, res) => {
//     const productId = parseInt(req.params.pid);

//     try {
//         const existingProduct = productManager.getProductById(productId);
//         if (!existingProduct) {
//             res.status(404).json({ error: "Producto no encontrado" });
//             return;
//         }

//         productManager.deleteProductById(productId);

//         res.json({ message: "Producto eliminado exitosamente" });
//     } catch (error) {
//         res.status(400).json({ error: error.message });
//     }
// });




export default router