const generateRandomNumber = () => Math.floor(Math.random() * 100) + 1
const greeting = (name) => `Hey ${name} nice to meet you :)`
module.exports = {
  generateRandomNumber, greeting
}