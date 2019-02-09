const fs = require('fs');
const path = require('path');
const ENCODING = 'utf-8';

// sets app path for simplicity
module.exports.APP_PATH = path.join(__dirname, '..');

// set cohort names
module.exports.FIRST_COHORT_NAME = 'edge-case';
module.exports.SECOND_COHORT_NAME = 'methods';
module.exports.THIRD_COHORT_NAME = 'sei-nov';

// sets json path of students
module.exports.COHORTS_JSON_PATH = path.join(__dirname, '..', 'data', 'cohorts.json')
module.exports.FIRST_COHORT_JSON_PATH = path.join(__dirname, '..', 'data', `${ this.FIRST_COHORT_NAME }.json`);
module.exports.SECOND_COHORT_JSON_PATH = path.join(__dirname, '..', 'data', `${ this.SECOND_COHORT_NAME }.json`);
module.exports.THIRD_COHORT_JSON_PATH = path.join(__dirname, '..', 'data', `${ this.THIRD_COHORT_NAME }.json`);

// picks random number between min and max
module.exports.random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

// loads json file from filepath then executes callback
module.exports.loadJSON = (filepath, callback) => {
  fs.readFile(filepath, (error, data) => {
    if (error) {
      throw error;
    }

    callback(JSON.parse(data))
  })
}

module.exports.loadJSONSync = (filepath) => {
  return JSON.parse(fs.readFileSync(filepath, ENCODING));
}