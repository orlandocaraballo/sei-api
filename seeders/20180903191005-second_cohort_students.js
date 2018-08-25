'use strict';

const path = require('path');
const utils = require(path.join(__dirname, '..', 'libraries', 'utils'));
const Cohort = require('../models').Cohort;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // load our students from second cohort json file
    const secondCohortJSON = utils.loadSecondCohortJSONSync();

    // wait to find second cohort
    let secondCohort = await Cohort.findOne({
      where: {
        name: utils.SECOND_COHORT_NAME
      }
    });

    // convert our second cohort json object into a proper
    //  sequelize model object
    const secondCohortSequelizeObj = secondCohortJSON.map(student => {
      return {
        name: student['name'],
        gender: student['gender'],
        knownFor: student['known-for'],
        github: student['github'],
        slack: student['slack-handle'],
        CohortId: secondCohort.id,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      };
    });

    // insert one student per item in sequelize object
    return queryInterface.bulkInsert('Students', secondCohortSequelizeObj, {});
  },

  down: (queryInterface, Sequelize) => {
    // deletes methods data
    return queryInterface.bulkDelete('Students', null, {
      where: {
        name: utils.SECOND_COHORT_NAME
      }
    });
  }
};
