const express = require("express");
const router = express.Router();
const ejs = require("ejs");
const fs = require("fs");
const path = require("path");
const { Student, Cohort } = require("../models/");

// utility vars
const encoding = "utf8";

// set our routes
router.get("/", (request, response) => {
  // setup our template
  const indexTemplate = ejs.compile(
    fs.readFileSync(path.join(__dirname, "..", "views", "index.ejs"), encoding)
  );

  Student.all({
    // sort ascending by id
    order: [["id", "ASC"]],
    include: { model: Cohort }
  })
    .then(students => {
      response.end(
        indexTemplate({
          title: "SEI | Homepage",
          students: students
        })
      );
    })
    .catch(error => response.status(400).send(error));
});

module.exports = router;
