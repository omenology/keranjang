module.exports = {
  // Development Environment
  development: {
    username: process.env.POSTGRES_USER || "tes",
    password: process.env.POSTGRES_PASSWORD || "password",
    database: process.env.POSTGRES_DB || "development_db",
    host: process.env.POSTGRES_HOST || "localhost",
    port: "5432",
    dialect: "postgres",
  },
  // Production Environment
  production: {
    username: process.env.POSTGRES_USER || "my_user",
    password: process.env.POSTGRES_PASSWORD || "example",
    database: process.env.POSTGRES_DB || "production_db",
    host: process.env.POSTGRES_HOST || "localhost",
    port: "5432",
    dialect: "postgres",
  },
};
