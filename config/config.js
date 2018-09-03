const fs = require('fs');

module.exports = {
  development: {
    username: process.env.SEI_API_DB_USERNAME,
    password: process.env.SEI_API_DB_PASSWORD,
    database: process.env.SEI_API_DB_NAME,
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  test: {
    username: 'database_test',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'postgres'
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres'
    // TODO: add ssl certificate
    // leaving this out until I understand it lol
    // dialectOptions: {
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
    //   }
    // }
  }
};