module.exports = {
  // Development Environment
  development: {
    username: process.env.DB_USERNAME || "tes",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "development_db",
    host: process.env.DB_HOST || "localhost",
    port: "5432",
    dialect: "postgres",
  },
  // Production Environment
  production: {
    username: process.env.DB_USERNAME || "my_user",
    password: process.env.DB_PASSWORD || "example",
    database: process.env.DB_NAME || "production_db",
    host: process.env.DB_HOST || "localhost",
    port: "5432",
    dialect: "postgres",
  },
};
