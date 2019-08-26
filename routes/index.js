import express from "express";
import ejs from "ejs";
import fs from "fs";
import path from "path";
import Student from "../models/student.js";
import Cohort from "../models/cohort.js";

const router = express.Router();

console.log(Student);

// set our routes
router.get("/", async (request, response, next) => {
  let students;
  // setup our template
  const template = ejs.compile(
    fs.readFileSync(path.join(__dirname, "..", "views", "index.ejs"), "utf8")
  );

  try {
    students = await Student.all({
      // sort ascending by id
      order: [["id", "ASC"]],
      include: { model: Cohort }
    });
  } catch (error) {
    next({ status: 400, message: error.message });
  }

  response.end(
    template({
      title: "SEI | Homepage",
      students: students
    })
  );
});

export default router;
