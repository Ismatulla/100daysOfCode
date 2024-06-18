const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const Product = require('./models/product')
const methodOverride = require('method-override')

// setting views and middleware
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
// 

mongoose.connect('mongodb://127.0.0.1:27017/farmStand')
  .then(() => {
    console.log('Connected!! 😀')

  })
  .catch((err) => console.log(err));


// routings
app.get('/products', async (req, res) => {
  const products = await Product.find({})
  res.render('product/index', { products })

})

app.get('/products/new', (req, res) => {
  res.render("product/new")
})

app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body)
  await newProduct.save()

  res.redirect(`/products/${newProduct._id}`)
})

// deleting product
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const result = await Product.findByIdAndDelete(id)
  console.log(result)
  res.redirect('/products')
})
// 

app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  const prodDetail = await Product.findById(id)
  res.render('product/show', { prodDetail })

})
// editing 
app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render('product/edit', { product })
})
app.put('/products/:id', async (req, res) => {
  const { id } = req.params
  const updateProduct = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true })
  res.redirect(`/products/${updateProduct._id}`)
})

// 
app.listen('8080', () => console.log('listening on port 8080'))