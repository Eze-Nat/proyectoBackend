import { productsModel } from "../models/products.js"
import mongoose from 'mongoose';


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
        await productsModel.create(product);
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
    try {
      const products = await productsModel.find().lean();
      return products;
  } catch (error) {
      throw error;
  }
    // return await limit ? productsModel.find().limit(limit).lean(): productsModel.find().lean();//lean() devuelve un objeto literal de JS y no un objeto de mongoose
  }

  async getAll() {
    try {
      // const limit = query.limit || 10
      // const page = query.page || 1
      // let categoryQuery = {}
      // let stockQuery = {}
      // const sortOptions = {}

      // if(query.category){categoryQuery = {category: query.category}}
      // if(query.stock) {stockQuery = {$and: [{stock: {$exists: true}}, {stock: {$ne:0}}]}}
      // if (query.sort === "asc") {
      //   sortOptions.price = 1
      // }else if (query.sort === "desc"){
      //   sortOptions.price = -1
      // }

      // const result = await productsModel.paginate({...categoryQuery, ...stockQuery}, {limit, page, sort: sortOptions})
      // return result
      const products = await productsModel.find();  
      if (!products || products.length === 0) {
        console.log("No products found in the database.");
        return []; // Devuelve un arreglo vacío si no hay productos
      }
  
      return products.map(product => {
        if (product instanceof mongoose.Document) {
          return product.toObject();
        } else {
          return product;
        }
      });
    } catch (error) {
      console.error("Error al obtener productos:", error);
      throw error;
    }
  }
  
  async getWithPaginate(query, options){
    try {
        const result = await this.model.paginate(query, options);
        return result;
    } catch (error) {
        throw error;
    }
}
  

  saveProduct = async (product, thumbnailRoute) => {
    try {
      product.thumbnail = thumbnailRoute
      const result = await productsModel.create(product)
    } catch (error) {
      throw error
    }
  }

  async getProductById(pid) {
    if (this.validateId(pid)) {
      return await productsModel.findOne({ _id: pid }).lean() || null;
    } else {
      console.log("Not found!");

      return null;
    }
  }

  async updateProduct(pid, product) {
    try {
      if (this.validateId(pid)) {
        if (await this.getProductById(pid)) {
          await productsModel.updateOne({ _id: pid }, product);
          console.log("Product updated!");
          return true;
        } else {
          console.error(`The product id: ${pid} does not exist`);
          return false;
        }
      } else {
        console.error(`The id: ${pid} is not a Mongo valid id`);
        return false;
      }
    } catch (error) {
      console.log("Not found!");

      return false;
    }
  }


  async deleteProduct(pid) {
    console.log(pid);
    try {
      if (this.validateId(pid)) {
        if (await this.getProductById(pid)) {
          await productsModel.deleteOne({ _id: pid });
          console.log(`Product id: ${pid} has been deleted`);

          return true;
        } else {
          console.error(`The product id: ${pid} does not exist`);
          return false;
        }
      } else {
        console.error(`The id: ${pid} is not a Mongo valid id`);
        return false;
      }
    } catch (error) {
      console.log("Not found!");
      return false;
    }
  }

  async validateCode(code) {
    return (await productsModel.findOne({ code: code })) || false;
  }

  validateId(id) {
    return id.length === 24 ? true : false;
  }
}
