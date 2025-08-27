import mongoose, { Types } from "mongoose";


const ProductScheme = mongoose.Schema({
    id:{
        type: String,
        unique :true,
    },

    name:{
        type: String,

    } ,
    price:{
        type: Number,
    },
    imageUrl:{
        type: String,

    } ,
   desc: {
    type: String,
   },


});
const Product = mongoose.model("products", ProductScheme);
export default Product;