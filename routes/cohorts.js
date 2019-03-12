const express = require('express');
const router = express.Router();
const Sequelize = require('sequelize');
const Serializer = require('sequelize-to-json');
const models = require('../models/');
const schemes = require('../libraries/schemes');

// utility vars
const Student = models.Student;
const Cohort = models.Cohort;

// responds with all cohorts data
router.get('/', (request, response) => {
  Cohort.all({
    // sort ascending by id
    order: [['id', 'ASC']],
    include: { model: Student }
  })
    .then(cohorts => {
      // send a 200 response and serialize all cohorts according to cohort scheme
      response.status(200).send(Serializer.serializeMany(cohorts, Cohort, schemes.cohort));
    })
    .catch(error => response.status(400).send(error));
});

// responds with random cohort data
router.get('/random', (request, response) => {
  // use pg random function to find random cohort
  Cohort.findOne({
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
router.get('/:id', (request, response) => {
  // if element is not a number then return an error
  if (isNaN(request.params['id'])) {
    response.status(400).send(utils.ID_NOT_A_NUMBER_ERROR);
    return;
  }

  Cohort.findById(request.params['id'], {
    include: { model: Student }
  })
    .then(cohort => {
      // if cohort is not found then return error message
      if (cohort) {
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
});

module.exports = router;
