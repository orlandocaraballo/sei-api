'use strict';

const path = require('path');
const utils = require(path.join(__dirname, '..', 'libraries', 'utils'));
const Cohort = require('../models').Cohort;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // load our students from first cohort json file
    const firstCohortJSON = utils.loadJSONSync(utils.FIRST_COHORT_JSON_PATH);

    // wait to find first cohort
    let firstCohort = await Cohort.findOne({
      where: {
        name: utils.FIRST_COHORT_NAME
      }
    });

    // convert our first cohort json object into a proper
    //  sequelize model object
    const firstCohortSequelizeObj = firstCohortJSON.map(student => {
      return {
        name: student['name'],
        gender: student['gender'],
        knownFor: student['known-for'],
        github: student['github'],
        slack: student['slack-handle'],
        CohortId: firstCohort.id,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      };
    });

    // insert one student per item in sequelize object
    return queryInterface.bulkInsert('Students', firstCohortSequelizeObj, {});
  },

  down: (queryInterface, Sequelize) => {
    // deletes students table
    return queryInterface.bulkDelete('Students', null, {
      where: {
        name: utils.FIRST_COHORT_NAME
      }
    });
  }
};
