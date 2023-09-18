import { Router, query } from "express";
import Products from "../dao/managersMongo/ProductManager.js"
import Carts from "../dao/managersMongo/CartManager.js";

const router = Router();
const productsManager = new Products()
const cartsManager = new Carts()

router.get("/", async (req, res) => {
  try {
    const products = await productsManager.getProducts();
   
    res.render("home", { products, title: "Home" });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Error al cargar la página de inicio.");
  }
});
/* router.get("/", async (req, res) => {
  const query = req.query
  const docs = await productsManager.getAll(query)
  console.log(docs)
  res.render("home", {docs, title: "Home"})
})
 */
router.get("/products", async (req, res) => {
  res.render("products")
})

router.get("/chat", async (req, res) => {
  res.render("chat")
})


/* router.get("/products", async(req, res) => {
  const products = await productsManager.getAll()
    res.render("products", {products})
})

router.get("/carts", async(req, res) => {
  const carts = await cartsManager.getAll()
  res.render("carts", {carts})
})

router.get("/chat", (req, res) => {
  res.render("chat", { title: "Chat" });
})



router.get("/carts/:cid", async (req, res) => {
  const {cid} = req.params;
  try {
    const carrito = await cartsManager.getCartById(cid)
    console.log(carrito)
    if(!carrito) {
      return res.status(404).send({error: "Cart not found"})
    }
    res.render("cart", carrito)
  } catch (error) {
    res.status(500).send({error: error.message})
    console.log(error)
  }
})
 */
export default router