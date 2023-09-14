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

  addProductToCart = async (idCart, idProduct) => {
    try {
      const product = await productsModel.findOne({_id: idProduct})
      const cart = await cartsModel.findOne({_id: idCart})
  
      cart.products.push(product.title)
      /* product.carts.push(cart.title) */
  
  
      await productsModel.updateOne({_id: idProduct}, product)
      await cartsModel.updateOne({_id: idCart}, cart)
      return
    } catch (error) {
      throw error
    }
  }

  async getCartById(id) {
    if (this.validateId(id)) {
      return (await cartModel.findOne({ _id: id }).lean()) || null;
    } else {
      console.log("Not found!");
      return null;
    }
  }

  validateId(id) {
    return id.length === 24 ? true : false; // 24 es la cantidad de caracteres que tiene un id de mongo, entonces valido esto para saber si es un id de mongo o no
  }

}
