const express = require('express')
const router = express.Router()

router.get('/dog', (req, res) => {
  res.send('all dogs')
})
router.get('/dog/:id', (req, res) => {
  res.send('single dogs')
})

module.exports = router