// require our packages
const express = require('express')
const fs = require('fs')
const ejs = require('ejs')
const utils = require('./libraries/utils')

// setup our app
const encoding = 'utf8'
const app = express()
const studentsJSON = JSON.parse(fs.readFileSync('data/students.json', encoding))
const port = process.env.PORT || 3000
const indexTemplate = ejs.compile(fs.readFileSync('views/index.ejs', encoding))

// allows us to serve all files within public directory
app.use(express.static('public'))

// set our routes
app.get("/", (request, response) => {
  response.end(indexTemplate({ 
    title: "The title",
    students: studentsJSON
  }))
})

app.get("/students", (request, response) => {
  response.json(studentsJSON)
})

app.get("/students/random", (request, response) => {
  response.json(studentsJSON[utils.random(0, studentsJSON.length)])
})

app.get("/students/:id", (request, response) => {
  console.log(utils.random(1,10))
  console.log(request.params)
  response.json(studentsJSON[request.params['id'] - 1])
})

// app.get("/students/:name", (request, response) => {
//   // Martin's code here
//   response.json(studentsJSON[request.params['name']])
// })

app.listen(port, () => {
  console.log("We are all fired up")
})