'use strict';

const path = require('path');
const utils = require(path.join(__dirname, '..', 'libraries', 'utils'));

module.exports = {
  up: (queryInterface, Sequelize) => {
    // load cohorts from cohorts data file
    //  then transform them into cohort objects that can be used by sequelize
    //  to populate the database
    const cohortObjects = utils.loadJSONSync(utils.COHORTS_JSON_PATH).map(cohort => {
      return {
        name: cohort,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      };
    })

    // insert cohorts into database using objects created above
    return queryInterface.bulkInsert('Cohorts', cohortObjects, {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cohorts', null, {});
  }
};
