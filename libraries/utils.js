const fs = require('fs')

// picks random number between min and max
module.exports.random = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min
}

// loads json file from filepath then executes callback
module.exports.loadJSON = (filepath, callback) => {
  fs.readFile(filepath, (error, data) => {
    if (error) throw error
    
    callback(JSON.parse(data))
  })
}