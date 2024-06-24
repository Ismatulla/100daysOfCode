const mongoose = require('mongoose')
const { Schema } = mongoose

mongoose.connect('mongodb://127.0.0.1:27017/tweet')
  .then(() => {
    console.log('connected')

  })
const userSchema = new Schema({
  username: String,
  age: Number
})

const tweetSchema = new Schema({
  text: String,
  likes: Number,
  user: { type: Schema.Types.ObjectId, ref: "User" }
})


const User = mongoose.model('User', userSchema)
const Tweet = mongoose.model('Tweet', tweetSchema)

const makeTweets = async () => {
  const user = new User({ username: "Chicken", age: 99 });
  const tweet1 = new Tweet({ text: 'omg i love my chicken', likes: 0 })
  tweet1.user = user
  await user.save()
  await tweet1.save()
  console.log(user)
  console.log(tweet1)
}
makeTweets()
