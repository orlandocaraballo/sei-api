const { SEI_API_DB_USERNAME, SEI_API_DB_PASSWORD, SEI_API_DB_NAME } = process.env;
const dialect = "postgres";

module.exports = {
  development: {
    username: SEI_API_DB_USERNAME,
    password: SEI_API_DB_PASSWORD,
    database: SEI_API_DB_NAME,
    host: "127.0.0.1",
    dialect
  },
  production: {
    use_env_variable: "DATABASE_URL",
    dialect
    // TODO: add ssl certificate
    // leaving this out until I understand it lol
    // dialectOptions: {
    //   ssl: {
    //     ca: fs.readFileSync(__dirname + '/mysql-ca-master.crt')
    //   }
    // }
  }
};
