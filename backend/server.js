const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const { errorHandler } = require("./middlewares/errorMiddleware");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

const Port = process.env.PORT;

//middlewaeres
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", require("./routes/authRoute"));
app.use("/api/users", require("./routes/userRoute"));
app.use("/api/hotels", require("./routes/hotelRoute"));
// app.use("/api/rooms", require("./routes/roomsRoute"));

app.use(errorHandler);

app.listen(Port, () => {
  connectDB();
  console.log(`Server is running on Port ${Port}`);
});
