import { Router } from "express";
import Products from "../dao/managersMongo/products.js"
import Carts from "../dao/managersMongo/carts.js";

const router = Router();
const productsManager = new Products()
const cartsManager = new Carts()


router.get("/products", async(req, res) => {
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

router.get("/", async (req, res) => {
  const products = await PM.getProducts();
  res.render("home", { products, title: "Home" });
});

export default router