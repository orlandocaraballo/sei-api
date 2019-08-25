const express = require("express");
const router = express.Router();
const Sequelize = require("sequelize");
const Serializer = require("sequelize-to-json");
const { Student, Cohort } = require("../models/");
const schemes = require("../libraries/schemes");
const utils = require("../libraries/utils");

// responds with all students data
router.get("/", async (request, response, next) => {
  let students;
  try {
    students = await Student.all({
      // sort ascending by id
      order: [["id", "ASC"]],
      include: { model: Cohort }
    });
  } catch (error) {
    next({
      status: 400,
      message: error.message
    });
  }

  // send a 200 response and serialize all students according to student scheme
  response.status(200).send(Serializer.serializeMany(students, Student, schemes.student));
});

// // responds with random student data
router.get("/random", async (request, response, next) => {
  let student;

  try {
    // use pg random function to find random student
    student = await Student.findOne({
      order: Sequelize.literal("random()"),
      include: { model: Cohort }
    });
  } catch (error) {
    next({ status: 400, message: error.message });
  }

  // utilize student scheme to serialize Student data
  const serializer = new Serializer(Student, schemes.student);

  // send a 200 response and serialize the returned student
  response.status(200).send(serializer.serialize(student));
});

// // responds with a specific student's data
router.get("/:id", async (request, response, next) => {
  let student;

  // if element is not a number then return an error
  if (isNaN(request.params["id"])) {
    next({ status: 400, message: utils.ID_NOT_A_NUMBER_ERROR });
  }

  try {
    student = await Student.findById(request.params["id"], {
      include: { model: Cohort }
    });
  } catch (error) {
    next({ status: 400, message: error.message });
  }

  if (!student) {
    // if student is not found then return error message
    next({ status: 400, message: `Student with id of ${request.params["id"]} does not exist` });
  }

  // utilize student scheme to serialize Student data
  const serializer = new Serializer(Student, schemes.student);

  // send a 200 response and serialize the returned student
  response.status(200).send(serializer.serialize(student));
});

module.exports = router;
