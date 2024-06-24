const mongoose = require('mongoose')
const Product = require('./models/product.js')
const seedProducts = [
  {
    name: "apple",
    price: 1.2,
    category: 'vegetable'
  },
  {
    name: "Organic Goddess melon",
    price: 4.99,
    category: 'fruit'
  },
  {
    name: "Watermelon",
    price: 2.99,
    category: 'vegetable'
  },
]
mongoose.connect('mongodb://127.0.0.1:27017/farmStandTake2')
  .then(() => {
    console.log('Connected!! 😀')
    Product.insertMany(seedProducts)
      .then(p => console.log(p))
      .catch(e => console.log(e))
  })
  .catch((err) => console.log(err));





