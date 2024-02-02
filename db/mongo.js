const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config()

const connectToMongo = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to mongo successfully");
    })
    .catch(() => {
      console.log("mongo connection failed");
    });
};

module.exports = connectToMongo;
