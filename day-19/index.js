//? data relationships with mongo
const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1:27017/MongoRelations')
  .then(() => {
    console.log('connected')

  })

const userSchema = new mongoose.Schema({
  first: String,
  last: String,
  addresses: [
    {
      _id: { _id: false },
      street: String,
      country: String,
      state: String,
      city: String
    }
  ]
})
const User = mongoose.model("User", userSchema)

const makeUser = async () => {
  const u = new User({
    first: 'Harry',
    last: "Potter"
  })
  u.addresses.push({

    street: "123 Sesame St.",
    city: "New York",
    state: "NY",
    country: "USA"
  })
  const res = await u.save()
  console.log(res)
}
makeUser()