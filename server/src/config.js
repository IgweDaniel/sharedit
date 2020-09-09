const path = require("path");

const Environment = process.env.NODE_ENV || "development";

if (process.env.NODE_ENV !== "production") {
  const dotenv = require("dotenv-safe");
  dotenv.config({
    path: path.join(__dirname, "../.env"),
    example: path.join(__dirname, "../.env.example"),
  });
}

const requireProcessEnv = (name) => {
  if (!process.env[name]) {
    throw new Error(`You must set the  ${name}  environment variable`);
  }
  return process.env[name];
};

const config = {
  all: {
    port: process.env.PORT || 9000,
    jwtSecret: requireProcessEnv("JWT_SECRET"),
    googleId: requireProcessEnv("GOOGLE_CLIENT_ID"),
    apiRoot: process.env.API_ROOT || "/api",
    userEmail: requireProcessEnv("USER_EMAIL"),
    userPass: requireProcessEnv("USER_PASS"),
  },
  test: {},
  dev: {},
};

module.exports = { ...config.all, ...config[Environment] };
