const mongoose = require('mongoose');
const Campground = require('../models/campground')
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp')
  .then(() => {
    console.log('connected')

  })

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      author: '668201d0789692cfc384fb3f',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: 'https://picsum.photos/400/400',
      description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam suscipit fugiat perferendis laborum rerum sed ipsa, quos necessitatibus alias saepe.',
      price
    })
    await camp.save();
  }
}
seedDB().then(() => {
  mongoose.connection.close();
})
28 / 4928 / 3264
