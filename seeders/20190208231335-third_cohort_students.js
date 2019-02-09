'use strict';

const path = require('path');
const utils = require(path.join(__dirname, '..', 'libraries', 'utils'));
const Cohort = require('../models').Cohort;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // load our students from third cohort json file
    const thirdCohortJSON = utils.loadThirdCohortJSONSync();

    // wait to find third cohort
    let thirdCohort = await Cohort.findOne({
      where: {
        name: utils.THIRD_COHORT_NAME
      }
    });

    // convert our third cohort json object into a proper
    //  sequelize model object
    const thirdCohortSequelizeObj = thirdCohortJSON.map(student => {
      return {
        name: student['name'],
        gender: student['gender'],
        knownFor: student['known-for'],
        github: student['github'],
        slack: student['slack-handle'],
        CohortId: thirdCohort.id,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      };
    });

    // insert one student per item in sequelize object
    return queryInterface.bulkInsert('Students', thirdCohortSequelizeObj, {});
  },

  down: (queryInterface, Sequelize) => {
    // deletes methods data
    return queryInterface.bulkDelete('Students', null, {
      where: {
        name: utils.THIRD_COHORT_NAME
      }
    });
  }
};
