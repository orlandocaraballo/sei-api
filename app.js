// require our packages
const express = require('express');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const utils = require('./libraries/utils');
const Sequelize = require('sequelize')
const models = require('./models/');
const Serializer = require('sequelize-to-json');
const schemes = require('./libraries/schemes');

// loading our models
const Student = models.Student;
const Cohort = models.Cohort;

// setup our app
const encoding = 'utf8';
const app = express();
const port = process.env.PORT || 3000;

// allows us to serve all files within public directory
app.use(express.static('public'));

// enable CORS
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// set our routes
app.get("/", (request, response) => {
  // setup our template
  const indexTemplate = ejs.compile(fs.readFileSync(
    path.join(__dirname, 'views', 'index.ejs'),
    encoding
  ));

  Student
    .all({
      // sort ascending by id
      order: [
        ['id', 'ASC']
      ],
      include: { model: Cohort }
    })
    .then(students => { 
      response.end(indexTemplate({ 
        title: "SEI | Homepage",
        students: students
      }));
    })
    .catch(error => response.status(400).send(error));
});

// responds with all students data
app.get("/students", (request, response) => {
  Student
    .all({
      // sort ascending by id
      order: [
        ['id', 'ASC']
      ],
      include: { model: Cohort }
    })
    .then(students => { 
      // send a 200 response and serialize all students according to student scheme
      response.status(200).send(Serializer.serializeMany(students, Student, schemes.student));
    })
    .catch(error => response.status(400).send(error));
});

// responds with random student data
app.get("/students/random", (request, response) => {

  // use pg random function to find random student
  Student
    .findOne({
      order: Sequelize.literal('random()'),
      include: { model: Cohort }
    })
    .then(student => {
      // utilize student scheme to serialize Student data
      const serializer = new Serializer(Student, schemes.student);

      // send a 200 response and serialize the returned student
      response.status(200).send(serializer.serialize(student));
    })
    .catch(error => response.status(400).send(error));
});

// responds with a specific student's data
app.get("/students/:id", (request, response) => {
  Student
    .findById(request.params['id'], {
      include: { model: Cohort }
    })
    .then(student => {
      if(student) {
        // utilize student scheme to serialize Student data
        const serializer = new Serializer(Student, schemes.student);

        // send a 200 response and serialize the returned student
        return response.status(200).send(serializer.serialize(student));
      } else {

        // if student is not found then return error message
        return response.status(400).send({ 
          error: `Student with id of ${request.params['id']} does not exist` 
        })
      }
    })
    .catch(error => response.status(400).send(error));
});

// responds with all cohorts data
app.get("/cohorts", (request, response) => {
  Cohort
    .all({
      // sort ascending by id
      order: [
        ['id', 'ASC']
      ],
      include: { model: Student }
    })
    .then(cohorts => {
      // send a 200 response and serialize all cohorts according to cohort scheme
      response.status(200).send(Serializer.serializeMany(cohorts, Cohort, schemes.cohort));
    })
    .catch(error => response.status(400).send(error));
});

// responds with random cohort data
app.get("/cohorts/random", (request, response) => {
  
  // use pg random function to find random cohort
  Cohort
    .findOne({ 
      order: Sequelize.literal('random()'),
      include: { model: Student }
    })
    .then(cohort => {
      const serializer = new Serializer(Cohort, schemes.cohort);
      
      response.status(200).send(serializer.serialize(cohort));
    })
    .catch(error => response.status(400).send(error));
});

// responds with a specific cohort's data
app.get("/cohorts/:id", (request, response) => {
  Cohort
    .findById(request.params['id'], {
      include: { model: Student }
    })
    .then(cohort => {
  
      // if cohort is not found then return error message
      if(cohort) {
        const serializer = new Serializer(Cohort, schemes.cohort);

        return response.status(200).send(serializer.serialize(cohort));
      } else {
        return response.status(400).send({ 
          error: `Cohort with id of ${request.params['id']} does not exist` 
        });
      }
    })
    .catch(error => response.status(400).send(error));
})

// listener fires when server is first fired up
app.listen(port, (request, response) => {
  console.log(`We are all fired up on port: http://localhost:${port}/`);
});