// require our packages
const express = require('express');

// routes
const indexRouter = require('./routes/index');
const studentsRouter = require('./routes/students');
const cohortsRouter = require('./routes/cohorts');

// setup our app
const app = express();
const port = process.env.PORT || 3000;

// allows us to serve all files within public directory
app.use(express.static('public'));

// enable CORS
app.use((request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// set our routes
app.use('/', indexRouter);
app.use('/students', studentsRouter);
app.use('/cohorts', cohortsRouter);

// listener fires when server is first fired up
app.listen(port, (request, response) => {
  console.log(`We are all fired up on port: ${port}/`);
});
