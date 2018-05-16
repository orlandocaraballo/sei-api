const express = require('express')

const app = express()

app.get("/", (request, response) => {
  response.json({ name : "orlando" })
})

app.listen(3000, () => {
  console.log("We are all fired up")
})