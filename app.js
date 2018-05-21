// require our packages
const express = require('express')
const fs = require('fs')
const path = require('path')
const ejs = require('ejs')
const utils = require('./libraries/utils')

// setup our app
const encoding = 'utf8'
const studentJSONPath = path.join(__dirname, 'data', 'students.json')
const app = express()
const port = process.env.PORT || 3000
const indexTemplate = ejs.compile(fs.readFileSync('views/index.ejs', encoding))

// allows us to serve all files within public directory
app.use(express.static('public'))

// enable CORS
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// set our routes
app.get("/", (request, response) => {
  utils.loadJSON(studentJSONPath, (data) => {
    response.end(indexTemplate({ 
      title: "The title",
      students: data
    }))
  })
})

// responds with all students data
app.get("/students", (request, response) => {
  utils.loadJSON(studentJSONPath, (data) => {
    response.json(data)
  })
})

// responds with random student data
app.get("/students/random", (request, response) => {
  utils.loadJSON(studentJSONPath, (data) => {
    response.json(data[utils.random(0, studentsJSON.length)])
  })
})

// responds with a specific student's data
app.get("/students/:id", (request, response) => {
  utils.loadJSON(studentJSONPath, (data) => {
    response.json(data[request.params['id'] - 1])
  })
})

app.listen(port, () => {
  console.log("We are all fired up")
})