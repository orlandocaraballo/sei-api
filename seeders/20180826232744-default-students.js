'use strict';

const path = require('path');
const utils = require(path.join(__dirname, '..', 'libraries', 'utils'));
const Cohort = require('../models').Cohort;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // load all cohorts
    const cohorts = await Cohort.all();

    // setup our student sequelize object array
    const studentsObject = [];

    // loop thru every cohort object
    cohorts.forEach(cohort => {
      // get the current cohort's students json file path
      let studentJSONPath = utils.getStudentJSONPAth(cohort.name);

      // load the current cohort's students into json object
      let studentsJSON = utils.loadJSONSync(studentJSONPath);

      // loop thru every student and transform into object
      //  for use with sequelize
      studentsJSON.forEach(student => {
        // create object and push it into object array
        studentsObject.push({
          name: student['name'],
          gender: student['gender'],
          knownFor: student['known-for'],
          github: student['github'],
          slack: student['slack-handle'],
          CohortId: cohort.id,
          createdAt: Sequelize.fn('now'),
          updatedAt: Sequelize.fn('now')
        });
      });
    });

    // insert all students from sequelize object array
    return queryInterface.bulkInsert('Students', studentsObject, {});
  },

  down: (queryInterface, Sequelize) => {
    // deletes students table
    return queryInterface.bulkDelete('Students', null, {});
  }
};
