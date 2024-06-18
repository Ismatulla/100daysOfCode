// working with mongoose ,inserting infos,saving infos and connecting mongoose to db and manipulating db with nodejs terminal that is connected to db through 
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/movieDB').then(() => {
  console.log('Connected!! 😀')
}).catch((err) => console.log(err));

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String
})

const Movie = mongoose.model("Movie", movieSchema)
const amadeus = new Movie({ title: "Amadeus", year: 2024, score: 4, rating: '4.5' })


const infoSchema = new mongoose.Schema({
  name: String,
  surename: String,
  age: Number,
  isMarried: Boolean
})

const Info = mongoose.model('PersonalAccount', infoSchema)

const men = new Info({
  name: "Harry",
  surename: "Kane",
  age: 43,
  isMarried: false
})