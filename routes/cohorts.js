const router = require("express").Router();
const Sequelize = require("sequelize");
const { Student, Cohort } = require("../models/");
const {
  ID_NOT_A_NUMBER_ERROR,
  COHORT_ATTRIBUTES,
  STUDENT_ATTRIBUTES
} = require("../libraries/utils");

// responds with all cohorts data
router.get("/", async (request, response, next) => {
  let cohorts;

  try {
    cohorts = await Cohort.all({
      attributes: COHORT_ATTRIBUTES,
      // sort ascending by id
      order: [["id", "ASC"]],
      include: { model: Student, attributes: STUDENT_ATTRIBUTES }
    });
  } catch (error) {
    next({ status: 400, message: error.message });
  }

  response.status(200).send(cohorts);
});

// responds with random cohort data
router.get("/random", async (request, response, next) => {
  let cohort;

  try {
    // use pg random function to find random cohort
    cohort = await Cohort.findOne({
      attributes: COHORT_ATTRIBUTES,
      order: Sequelize.literal("random()"),
      include: { model: Student, attributes: STUDENT_ATTRIBUTES }
    });
  } catch (error) {
    next({ status: 400, message: error.message });
  }

  response.status(200).send(cohort);
});

// responds with a specific cohort's data
router.get("/:id", async (request, response, next) => {
  let cohort;
  const { id } = request.params;

  // if element is not a number then return an error
  if (isNaN(id)) {
    next({ status: 400, message: ID_NOT_A_NUMBER_ERROR });
  }

  try {
    cohort = await Cohort.findById(id, {
      attributes: COHORT_ATTRIBUTES,
      include: { model: Student, attributes: STUDENT_ATTRIBUTES }
    });
  } catch (error) {
    next({ status: 400, message: error.message });
  }

  // if cohort is not found then return error message
  if (!cohort) {
    next({ status: 400, message: `Cohort with id of ${id} does not exist` });
  }

  response.status(200).send(cohort);
});

module.exports = router;
