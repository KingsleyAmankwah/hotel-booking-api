const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");
const app = express();

const Port = process.env.PORT || 8000;

app.use(errorHandler);

app.listen(Port, () => {
  connectDB();
  console.log(`Server is running on Port ${Port}`);
});
