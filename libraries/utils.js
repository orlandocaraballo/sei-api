import fs from "fs";
import path from "path";

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// sets app path for simplicity
export const APP_PATH = path.join(__dirname, "..");

// set cohort names
export const FIRST_COHORT_NAME = "edge-case";
export const SECOND_COHORT_NAME = "methods";
export const THIRD_COHORT_NAME = "sei-nov";

// for filtering sequelize column names
export const COHORT_ATTRIBUTES = ["id", "name"];
export const STUDENT_ATTRIBUTES = ["id", "name", "gender", "knownFor", "github", "slack"];

// sets json path of students
export const COHORTS_JSON_PATH = path.join(__dirname, "..", "data", "cohorts.json");

// set error string
export const ID_NOT_A_NUMBER_ERROR = "Id is not a number";

// picks random number between min and max
export const random = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

// get student json data path from cohort name
export const getStudentJSONPAth = cohortName => {
  return path.join(__dirname, "..", "data", `${cohortName}.json`);
};

// loads json file from filepath then executes callback
export const loadJSON = (filepath, callback) => {
  fs.readFile(filepath, (error, data) => {
    if (error) {
      throw error;
    }

    callback(JSON.parse(data));
  });
};

export const loadJSONSync = filepath => {
  return JSON.parse(fs.readFileSync(filepath, "utf-8"));
};
