require("dotenv").config();

const API_URL = process.env.API_URL;
const API_USERNAME = process.env.API_USERNAME;
const API_PASSWORD = process.env.API_PASSWORD;

module.exports = {
  api: {
    baseUrl: API_URL,
    username: API_USERNAME,
    password: API_PASSWORD,
  },
};
