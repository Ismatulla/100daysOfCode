// -get to know terminal more and create simple server in terminal 
//  Activity: Perform file operations (read/write) using the File System module.

import fs from 'fs'
import { setTimeout } from 'timers/promises'

// Create ./tmp/a/apple, regardless of whether ./tmp and ./tmp/a exist.
// fs.mkdir('./tmp/a/apple', { recursive: true }, (err) => {
//   console.log('inside of dir')
//   if (err) throw err;
// });
// console.log('after dir')
fs.mkdirSync('./good/good.js', { recursive: true })
console.log('godjs created')
setTimeout(() => {
  fs.rmSync('./good/good', { recursive: true, force: true })
  console.log('goodjs removed')
}, 3000)