// require our packages
const express = require('express');
const Sequelize = require('sequelize');
const Serializer = require('sequelize-to-json');

const utils = require('./libraries/utils');

// load our models and schemes 
const models = require('./models/');
const schemes = require('./libraries/schemes');

// our routes
const indexRouter = require('./routes/index');
const studentsRouter = require('./routes/students');

// for simplicity
const Student = models.Student;
const Cohort = models.Cohort;

// setup our app
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
app.use('/', indexRouter);
app.use('/students', studentsRouter);

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
  // if element is not a number then return an error
  if(isNaN(request.params['id'])){ 
    response.status(400).send(utils.ID_NOT_A_NUMBER_ERROR);
    return;
  }

  Cohort
    .findById(request.params['id'], {
      include: { model: Student }
    })
    .then(cohort => {
  
      // if cohort is not found then return error message
      if(cohort) {
        const serializer = new Serializer(Cohort, schemes.cohort);

        response.status(200).send(serializer.serialize(cohort));
        return;
      } else {

        response.status(400).send({ 
          error: `Cohort with id of ${request.params['id']} does not exist` 
        });
        return;
      }
    })
    .catch(error => response.status(400).send(error));
})

// listener fires when server is first fired up
app.listen(port, (request, response) => {
  console.log(`We are all fired up on port: ${port}/`);
});
