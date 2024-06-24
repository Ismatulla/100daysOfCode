// project is in separate folder since it requires a lot of dependencies to install
const express = require('express')
const path = require('path')
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const ejsMate = require('ejs-mate')
const Product = require('./models/product')
const Farm = require('./models/farm')

mongoose.connect('mongodb://127.0.0.1:27017/farmStandTake2')
  .then(() => {
    console.log('connected')

  })
  .catch((err) => console.log(err));

const app = express();

app.engine('ejs', ejsMate)
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// farm routing
app.get('/farms', async (req, res) => {
  const farms = await Farm.find({})
  res.render('farms/index', { farms })
})
app.get('/farms/new', (req, res) => {
  res.render('farms/new')
})
app.post('/farms', async (req, res) => {
  const farm = new Farm(req.body);
  await farm.save()
  res.redirect('/farms')
})

app.get('/farms/:id', async (req, res) => {
  const farm = await Farm.findById(req.params.id);
  res.render('farms/show', { farm })
})
// product routing 
const categories = ['fruit', 'vegetable', 'diary']

app.get('/products', async (req, res) => {
  const { category } = req.query;
  if (category) {
    const products = await Product.find({ category })
    res.render('product/index', { products, category })
  } else {
    const products = await Product.find({})
    res.render('products/index', { products, category: 'All' })
  }
})
app.get('/products/new', (req, res) => {
  res.render('products/new', { categories })
})
app.post('/products', async (req, res) => {
  const newProduct = new Product(req.body)
  await newProduct.save()
  res.redirect(`products/${newProduct._id}`)
})
app.get('/products/:id', async (req, res) => {
  const { id } = req.params
  const product = await Product.findById(id)
  res.render('products/show', { product })
})
app.get('/product/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('product/edit', { product, categories })
})
app.put('/product/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  res.redirect(`product/${product._id}`)
})
app.delete('/product/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  res.redirect(`products`)
})
app.listen('8080', () => {
  console.log('running on port 8080 🙄')
})