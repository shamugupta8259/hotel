require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");
const connectToDb = require("./db/connection.js");
const createBookingRouter = require("./routers/booking_route");
const mongoose = require("mongoose");
const AppError = require("./utils/errorHandler");

const connectionUrl = process.env.CONNECTION_URL;

connectToDb(connectionUrl);
app.use(express.json());
app.use(cors());
app.use("/api/booking", createBookingRouter);
app.get("/", (req, res) => {
	res.json("hello");
});
app.all("*", (req, res, next) => {
	next(AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.listen(port, () => {
	console.log("server is running on port 5005");
});
