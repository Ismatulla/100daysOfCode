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
  const farm = await Farm.findById(req.params.id).populate('products');
  console.log(farm)
  res.render('farms/show', { farm })
  // res.send(farm.products)
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
app.get('/products/:id/edit', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render('products/edit', { product, categories })
})
app.put('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
  res.redirect(`/products/${product._id}`)
})
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect('/products')
})

// creating products for farms
app.get('/farms/:id/products/new', (req, res) => {
  const { id } = req.params
  res.render('products/new', { id, categories })
})

app.post('/farms/:id/products', async (req, res) => {
  const { id } = req.params
  const farm = await Farm.findById(id)
  const { name, price, category } = req.body;
  const product = new Product({ name, price, category })
  farm.products.push(product);
  product.farm = farm
  await farm.save()
  await product.save();
  res.redirect(`/farms/${id}`)
})

app.listen('8080', () => {
  console.log('running on port 8080 🙄')
})