import { productsModel } from "../models/products.js"

export default class Products {
  constructor() {

  }
  async addProduct(product) {
    try {
      if (await this.validateCode(product.code)) {
        //si el codigo existe
        console.error(`Error: product code "${code}" already exists`);
        return false;
      } else {
        await productModel.create(product);
        console.log("Product added successfully!");
        return true;
      }
    } catch (error) {
      console.log(error);
      return false;
    }
  }
  //#Read
  async getProducts(limit) {
    return await limit ? productModel.find().limit(limit).lean(): productModel.find().lean();//lean() devuelve un objeto literal de JS y no un objeto de mongoose
  }

  getAll = async () => {
    const products = await productsModel.find()
    return products.map(product => product.toObject())
  }

  saveProduct = async (product, thumbnailRoute) => {
    try {
      product.thumbnail = thumbnailRoute
      const result = await productsModel.create(product)
    } catch (error) {
      throw error
    }
  }

  async getProductById(id) {
    if (this.validateId(id)) {
      return await productModel.findOne({ _id: id }).lean() || null;
    } else {
      console.log("Not found!");

      return null;
    }
  }

  async updateProduct(id, product) {
    try {
      if (this.validateId(id)) {
        if (await this.getProductById(id)) {
          await productModel.updateOne({ _id: id }, product);
          console.log("Product updated!");
          return true;
        } else {
          console.error(`The product id: ${id} does not exist`);
          return false;
        }
      } else {
        console.error(`The id: ${id} is not a Mongo valid id`);
        return false;
      }
    } catch (error) {
      console.log("Not found!");

      return false;
    }
  }


  async deleteProduct(id) {
    try {
      if (this.validateId(id)) {
        if (await this.getProductById(id)) {
          await productModel.deleteOne({ _id: id });
          console.log(`Product id: ${id} has been deleted`);

          return true;
        } else {
          console.error(`The product id: ${id} does not exist`);
          return false;
        }
      } else {
        console.error(`The id: ${id} is not a Mongo valid id`);
        return false;
      }
    } catch (error) {
      console.log("Not found!");
      return false;
    }
  }


  async validateCode(code) {
    return (await productModel.findOne({ code: code })) || false;
  }

  validateId(id) {
    return id.length === 24 ? true : false;
  }
}
