const express = require('express')
const fs = require('fs')
const utils = require('./utils')

const app = express()
const studentsJSON = JSON.parse(fs.readFileSync('students.json', 'utf8'))

app.get("/students", (request, response) => {
  response.json(studentsJSON)
})

app.get("/students/random", (request, response) => {
  response.json(studentsJSON[utils.random(0, 9)])
})

app.get("/students/:id", (request, response) => {
  console.log(utils.random(1,10))
  response.json(studentsJSON[request.params['id'] - 1])
})

app.listen(3000, () => {
  console.log("We are all fired up")
})