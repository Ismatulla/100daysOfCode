// nodejs module,runtime,package.json( "type": "module",)
// nodejs-> not backend language ,it is js runtime environment mens environment where js can run to perform server side operation (not a language!)

// modular export import
// const { generateRandomNumber, greeting } = require('./utils')
// console.log(`random number ${generateRandomNumber()}`)
// console.log(greeting('John'))

// ES-6 import export
import { allPosts } from "./postController.js";
console.log(allPosts())

// creating http server in pure nodejs (server that handles http )
import http from 'http'
const PORT = 3000
const server = http.createServer((req, res) => {
  res.write('Hello world')
  res.end()
})
server.listen(PORT, () => {
  console.log(`server running on port ${PORT}`)
})