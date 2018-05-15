const express = require('express')
const lodash = require('lodash')

const app = express()

app.get("/", (request, response) => {
  response.send(lodash.without([1, 2, 3], 1))
})

app.listen(3000, () => {
  console.log("We are all fired up")
})