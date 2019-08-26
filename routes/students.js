import express from "express";
import Student from "../models/student.js";
import Cohort from "../models/cohort.js";
import Sequelize from "sequelize";
import {
  ID_NOT_A_NUMBER_ERROR,
  COHORT_ATTRIBUTES,
  STUDENT_ATTRIBUTES
} from "../libraries/utils.js";

const router = express.Router();

// responds with all students data
router.get("/", async (request, response, next) => {
  let students;
  try {
    students = await Student.all({
      attributes: STUDENT_ATTRIBUTES,
      // sort ascending by id
      order: [["id", "ASC"]],
      include: { model: Cohort, attributes: COHORT_ATTRIBUTES }
    });
  } catch (error) {
    next({
      status: 400,
      message: error.message
    });
  }

  response.status(200).send(students);
});

// // responds with random student data
router.get("/random", async (request, response, next) => {
  let student;

  try {
    // use pg random function to find random student
    student = await Student.findOne({
      attributes: STUDENT_ATTRIBUTES,
      order: Sequelize.literal("random()"),
      include: { model: Cohort, attributes: COHORT_ATTRIBUTES }
    });
  } catch (error) {
    next({ status: 400, message: error.message });
  }

  response.status(200).send(student);
});

// // responds with a specific student's data
router.get("/:id", async (request, response, next) => {
  let student;
  const { id } = request.params;

  // if element is not a number then return an error
  if (isNaN(id)) {
    next({ status: 400, message: ID_NOT_A_NUMBER_ERROR });
  }

  try {
    student = await Student.findById(id, {
      attributes: STUDENT_ATTRIBUTES,
      include: { model: Cohort, attributes: COHORT_ATTRIBUTES }
    });
  } catch (error) {
    next({ status: 400, message: error.message });
  }

  if (!student) {
    // if student is not found then return error message
    next({ status: 400, message: `Student with id of ${id} does not exist` });
  }

  response.status(200).send(student);
});

export default router;
