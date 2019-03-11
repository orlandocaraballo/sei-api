const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Serializer = require('sequelize-to-json');
const models = require('../models/');
const schemes = require('../libraries/schemes');

// utility vars
const Student = models.Student;
const Cohort = models.Cohort;

// responds with all students data
router.get("/", (request, response) => {
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

// // responds with random student data
router.get("/random", (request, response) => {

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

// // responds with a specific student's data
router.get("/:id", (request, response) => {
  // if element is not a number then return an error
  if(isNaN(request.params['id'])){ 
    response.status(400).send(utils.ID_NOT_A_NUMBER_ERROR);
    return;
  }

  Student
    .findById(request.params['id'], {
      include: { model: Cohort }
    })
    .then(student => {
      if(student) {
        // utilize student scheme to serialize Student data
        const serializer = new Serializer(Student, schemes.student);

        // send a 200 response and serialize the returned student
        response.status(200).send(serializer.serialize(student));
        return;
      } else {
        // if student is not found then return error message
        response.status(400).send({ 
          error: `Student with id of ${request.params['id']} does not exist` 
        });
        return;
      }
    })
    .catch(error => response.status(400).send(error));
});

module.exports = router;