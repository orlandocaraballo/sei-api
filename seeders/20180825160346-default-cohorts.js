'use strict';

const path = require('path');
const utils = require(path.join(__dirname, '..', 'libraries', 'utils'));

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Cohorts', [{
        name: utils.FIRST_COHORT_NAME,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      }, {
        name: utils.SECOND_COHORT_NAME,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      }, {
        name: utils.THIRD_COHORT_NAME,
        createdAt: Sequelize.fn('now'),
        updatedAt: Sequelize.fn('now')
      }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Cohorts', null, {});
  }
};
