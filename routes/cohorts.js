const router = require("express").Router();
const Sequelize = require("sequelize");
const Serializer = require("sequelize-to-json");
const { Student, Cohort } = require("../models/");
const schemes = require("../libraries/schemes");
const utils = require("../libraries/utils");

// responds with all cohorts data
router.get("/", async (request, response, next) => {
  let cohorts;

  try {
    cohorts = await Cohort.all({
      // sort ascending by id
      order: [["id", "ASC"]],
      include: { model: Student }
    });
  } catch (error) {
    next({ status: 400, message: error.message });
  }

  // send a 200 response and serialize all cohorts according to cohort scheme
  response.status(200).send(Serializer.serializeMany(cohorts, Cohort, schemes.cohort));
});

// responds with random cohort data
router.get("/random", async (request, response, next) => {
  let cohort;

  try {
    // use pg random function to find random cohort
    cohort = await Cohort.findOne({
      order: Sequelize.literal("random()"),
      include: { model: Student }
    });
  } catch (error) {
    next({ status: 400, status: error.message });
  }

  const serializer = new Serializer(Cohort, schemes.cohort);

  response.status(200).send(serializer.serialize(cohort));
});

// responds with a specific cohort's data
router.get("/:id", async (request, response, next) => {
  let cohort;
  const { id } = request.params;

  // if element is not a number then return an error
  if (isNaN(id)) {
    next({ status: 400, message: utils.ID_NOT_A_NUMBER_ERROR });
  }

  try {
    cohort = await Cohort.findById(id, {
      include: { model: Student }
    });
  } catch (error) {
    next({ status: 400, message: error.message });
  }

  // if cohort is not found then return error message
  if (!cohort) {
    next({
      status: 400,
      message: `Cohort with id of ${id} does not exist`
    });
  }

  const serializer = new Serializer(Cohort, schemes.cohort);

  response.status(200).send(serializer.serialize(cohort));
});

module.exports = router;
