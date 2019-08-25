const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const { Student, Cohort } = require("../models/");

// utility vars
const encoding = "utf8";

// set our routes
router.get("/", async (request, response, next) => {
  let students;
  // setup our template
  const indexTemplate = ejs.compile(
    fs.readFileSync(path.join(__dirname, "..", "views", "index.ejs"), encoding)
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
    indexTemplate({
      title: "SEI | Homepage",
      students: students
    })
  );
});

module.exports = router;
