if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
  }
  
  module.exports = {
    MONGO_URI: process.env.MONGO_URI,
    CLOUD_NAME: process.env.CLOUD_NAME,
    API_KEY: process.env.API_KEY,
    API_SECRET: process.env.API_SECRET,
    SECRET_KEY: process.env.SECRET_KEY
  };