import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"


const cartsCollection = "Carts";

const cartsSchema = mongoose.Schema({
  id:{
    type: Number,
    required: true,
    unique: true,
  },
  products:{
    type: Array,
    default: []
  }
})

export const cartsModel = mongoose.model(cartsCollection, cartsSchema)