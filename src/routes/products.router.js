

import { Router } from "express";
import Products from "../dao/managersMongo/ProductManager.js";
import { uploader } from "../utils.js";


const router = Router();
const productsManager = new Products();


router.get("/", async(req,res)=>{
    try {
        const limit = req.query.limit;
        const products = await productsManager.getProducts();
        if(limit){
            //devolver productos de acuerdo al limite
        } else {
            res.json({status:"success", data:products});
        }
    } catch (error) {
        res.json({status:"error", message:error.message});
    }
});



// // Ruta para obtener todos los productos
// router.get("/", async (req, res) => {
//     const products = await productsManager.getAll();
//     res.send({ status: "success", payload: products });
// });

// Ruta para agregar un producto
router.post("/", uploader.single("thumbnails"), async (req, res) => {
    try {
        // Obtener la ruta del archivo cargado
        const thumbnailRoute = req.file ? `http://localhost:8080/${req.file.path}` : '';

        const result = await productsManager.addProduct(req.body, thumbnailRoute);
        res.send({ status: "success", payload: result });
    } catch (error) {
        res.status(500).send({ status: "error", error });
    }
});

// Ruta para obtener un producto por su ID
router.get("/:pid", async (req, res) => {
    const productId = req.params.pid;
    const product = await productsManager.getProductById(productId);
    if (!product) {
        res.status(404).json({ error: "Producto no encontrado" });
    } else {
        res.json(product);
    }
});

// Ruta para actualizar un producto por su ID
router.put("/:pid", async (req, res) => {
    const productId = req.params.pid;
    const updatedFields = req.body;
    try {
        const result = await productsManager.updateProduct(productId, updatedFields);
        if (result) {
            res.json({ message: "Producto actualizado exitosamente" });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Ruta para eliminar un producto por su ID
router.delete("/:pid", async (req, res) => {
    const productId = req.params.pid;
    try {
        const result = await productsManager.deleteProduct(productId);
        if (result) {
            res.json({ message: "Producto eliminado exitosamente" });
        } else {
            res.status(404).json({ error: "Producto no encontrado" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router