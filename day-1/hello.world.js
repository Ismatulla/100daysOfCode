// console.log('hello Ismatulla')
// console.log(process.env.username)
// reading file 
const {readFile,readFileSync}=require('fs')
const txt=readFileSync('./hello.txt','utf8')
// const txt=readFile('./hello.txt','utf8',(err,txt)=>{
  //   console.log(txt)
  // })
  console.log(txt)
  console.log('run this asap')

  // import export module
  const obj = require('./my-module')
  console.log(obj)