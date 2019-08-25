// require our packages
const express = require("express");

// setup our app
const app = express();
const port = process.env.PORT || 3000;

// allows us to serve all files within public directory
app.use(express.static("public"));

// CORS middleware
app.use((request, response, next) => {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// mount our routes
app.use("/", require("./routes/index"));
app.use("/students", require("./routes/students"));
app.use("/cohorts", require("./routes/cohorts"));

// error middleware
app.use(({ status, message }, request, response, next) => {
  return response.status(status).send({ error: message });
});

// listener fires when server is first fired up
app.listen(port, (request, response) => {
  console.log(`We are all fired up on port: ${port}/`);
});
