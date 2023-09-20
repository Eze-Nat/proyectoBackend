import { Router, query } from "express";
import Products from "../dao/managersMongo/ProductManager.js"
import Carts from "../dao/managersMongo/CartManager.js";

const router = Router();
const productsManager = new Products()
const cartsManager = new Carts()


router.get("/",(req,res)=>{
  res.render("home");
});

router.get("/products",async(req,res)=>{
  // try {
  //     //capturar los valores de los queries
  //     const {limit=10,page=1,stock,sort="asc"} = req.query;
  //     console.log(limit,page,stock,sort);
  //     const stockValue = stock === 0 ? undefined : parseInt(stock);
  //     if(!["asc","desc"].includes(sort)){
  //         return res.render("products", {error:"Orden no válido"})
  //     };
  //     const sortValue = sort === "asc" ? 1 : -1;
  //     let query = {};
  //     if(stockValue){
  //         query = {stock:{$gte:stockValue}}
  //     }
  //     const result = await productsManager.getWithPaginate(query,{
  //         page,
  //         limit,
  //         sort:{price:sortValue},
  //         lean: true
  //     });
  //     // console.log(result);
  //     //              http://localhost:8080/products?limit=20
  //     const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
  //     const resultProductsView = {
  //         status:"success",
  //         payload: result.docs,
  //         totalPages: result.totalPages,
  //         page: result.page,
  //         prevPage: result.prevPage,
  //         hasPrevPage: result.hasPrevPage,
  //         prevLink: result.hasPrevPage ? baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`) : null,
  //         nextPage: result.nextPage,
  //         hasNextPage: result.hasNextPage,
  //         nextLink: result.hasNextPage ? baseUrl.includes("page") ? baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) : baseUrl.includes("?") ? baseUrl.concat(`&page=${result.nextPage}`) : baseUrl.concat(`?page=${result.nextPage}`) : null
  //     }
  //     // console.log(resultProductsView)
  //     res.render("products", resultProductsView);
  // } catch (error) {
  //     console.log(error.message)
  //     res.render("products",{error:"No es posible visualizar los datos"});
  // }
});


router.get("/addProduct", async (req, res) => {
  try {
    const products = await productsManager.getProducts();
   
    res.render("addProduct", { products, title: "addProduct" });
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res.status(500).send("Error al cargar la página de inicio.");
  }
});
// /* router.get("/", async (req, res) => {
//   const query = req.query
//   const docs = await productsManager.getAll(query)
//   console.log(docs)
//   res.render("home", {docs, title: "Home"})
// })
//  */
// router.get("/products", async (req, res) => {
//   res.render("products")
// })

// router.get("/chat", async (req, res) => {
//   res.render("chat")
// })


// /* router.get("/products", async(req, res) => {
//   const products = await productsManager.getAll()
//     res.render("products", {products})
// })

// router.get("/carts", async(req, res) => {
//   const carts = await cartsManager.getAll()
//   res.render("carts", {carts})
// })

// router.get("/chat", (req, res) => {
//   res.render("chat", { title: "Chat" });
// })



// router.get("/carts/:cid", async (req, res) => {
//   const {cid} = req.params;
//   try {
//     const carrito = await cartsManager.getCartById(cid)
//     console.log(carrito)
//     if(!carrito) {
//       return res.status(404).send({error: "Cart not found"})
//     }
//     res.render("cart", carrito)
//   } catch (error) {
//     res.status(500).send({error: error.message})
//     console.log(error)
//   }
// })
//  */
export default router