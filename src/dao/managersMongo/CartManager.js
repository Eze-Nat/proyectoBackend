import { cartsModel } from "../models/carts.js"
import { productsModel } from "../models/products.js"

export default class Carts {
  constructor() {

  }

  getAll = async () => {
    const carts = await cartsModel.find()
    return carts.map(cart => cart.toObject())
  }

  saveCart = async (cart) => {

  try {
    const result = await cartsModel.create(cart)
    return result 
  } catch (error) {
    throw error
  }
}

  addProductToCart = async (cid, pid) => {
    try {
      const product = await productsModel.findOne({_id: pid})
      const cart = await cartsModel.findOne({_id: cid})
  
      cart.products.push(product.title)
      /* product.carts.push(cart.title) */
  
  
      await productsModel.updateOne({_id: pid}, product)
      await cartsModel.updateOne({_id: cid}, cart)
      return
    } catch (error) {
      throw error
    }
  }

  async getCartById(cid) {
    if (this.validateId(cid)) {
      return (await cartModel.findOne({ _id: cid }).lean()) || null;
    } else {
      console.log("Not found!");
      return null;
    }
  }

  validateId(id) {
    return id.length === 24 ? true : false; // 24 es la cantidad de caracteres que tiene un id de mongo, entonces valido esto para saber si es un id de mongo o no
  }

}
