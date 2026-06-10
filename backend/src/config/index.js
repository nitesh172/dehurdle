require("dotenv").config()

module.exports = {
  port: process.env.PORT || 8080,
  databaseUrl: process.env.DATABASE_URL,
  corsOrigin: process.env.CORS_ORIGIN,
}
