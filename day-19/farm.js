const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://127.0.0.1:27017/farm')
  .then(() => {
    console.log('connected')

  })

const productSchema = new Schema({
  name: String,
  price: Number,
  season: {
    type: String,
    enum: ['Spring', 'Winter', 'Summer', 'Autumn']
  }
})
const farmSchema = new Schema({
  name: String,
  city: String,
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }]
})

const Product = mongoose.model('Product', productSchema);
const Farm = mongoose.model('Farm', farmSchema);

// Product.insertMany([
//   { name: "Big Melon", price: 4.99, season: 'Summer' },
//   { name: "medium Melon", price: 10.99, season: 'Spring' },
//   { name: "small Melon", price: 4.99, season: 'Summer' },
// ])

const makeFarm = async () => {
  const farm = new Farm({ name: "Full Belly Farms", city: "Guinda, CA" });
  const melon = await Product.findOne({ name: 'Big Melon' })
  farm.products.push(melon);
  await farm.save()
  console.log(farm);
}
// makeFarm()
Farm.findOne({ name: "Full Belly Farms" })
  .populate('products')
  .then(farm => console.log(farm))