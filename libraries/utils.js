const fs = require("fs");
const path = require("path");
const ENCODING = "utf-8";

// sets app path for simplicity
module.exports.APP_PATH = path.join(__dirname, "..");

// set cohort names
module.exports.FIRST_COHORT_NAME = "edge-case";
module.exports.SECOND_COHORT_NAME = "methods";
module.exports.THIRD_COHORT_NAME = "sei-nov";

// for filtering sequelize column names
module.exports.COHORT_ATTRIBUTES = ["id", "name"];
module.exports.STUDENT_ATTRIBUTES = ["id", "name", "gender", "knownFor", "github", "slack"];

// sets json path of students
module.exports.COHORTS_JSON_PATH = path.join(__dirname, "..", "data", "cohorts.json");

// set error string
module.exports.ID_NOT_A_NUMBER_ERROR = "Id is not a number";

// picks random number between min and max
module.exports.random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// get student json data path from cohort name
module.exports.getStudentJSONPAth = cohortName => {
  return path.join(__dirname, "..", "data", `${cohortName}.json`);
};

// loads json file from filepath then executes callback
module.exports.loadJSON = (filepath, callback) => {
  fs.readFile(filepath, (error, data) => {
    if (error) {
      throw error;
    }

    callback(JSON.parse(data));
  });
};

module.exports.loadJSONSync = filepath => {
  return JSON.parse(fs.readFileSync(filepath, ENCODING));
};
