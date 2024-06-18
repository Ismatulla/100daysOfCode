// mongoose schema validation,constrains
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/productDB').then(() => {
  console.log('Connected!! 😀')
}).catch((err) => console.log(err));

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})

const Product = mongoose.model('Product', productSchema)
const apple = new Product({ name: "apple", price: 45 })