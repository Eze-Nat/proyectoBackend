import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productsCollection = "Products";


const productsSchema = new mongoose.Schema({
  id: Number,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  }, 
  price: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
    unique: true,
  }, 
  stock: {
    type: Number,
    required: true,
  }, 
  status: Boolean,
  category: String,
  thumbnail: String,
})
productsSchema.plugin(mongoosePaginate)


export const productsModel = mongoose.model(productsCollection, productsSchema)