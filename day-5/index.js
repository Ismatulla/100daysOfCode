// Understanding Express,express path parameters,working with query strings ,autostart with nodemons

const express = require('express')
const app = express()
// express path 
app.get('/', (req, res) => {
  res.send('<h1>im main page 🤵‍♂️ </h1>')
  console.log(`params in main ${JSON.stringify(req.params)}`)
  // params in main {}
})
app.get('/r/:subreddit/:postId', (req, res) => {
  const { subreddit, postId } = req.params
  res.send(`<h1>Viewing post id ${postId} on the ${subreddit} 🤗</h1>`);
  console.log(`params in subreddit ${JSON.stringify(req.params)}`)
  // params in subreddit {"subreddit":"ismatulla"} i gave ismatulla in url so i got this 
})
app.get('*', (req, res) => {
  res.send('<h1>i dont know this path 👃</h1>')
  console.log(`params in not match ${JSON.stringify(req.params)}`)
  // params in not match {"0":"/wefwefe"}
})

app.listen('3000', () => console.log('server running on port 3000'))