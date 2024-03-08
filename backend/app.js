require("dotenv").config();
const express = require("express");
const app = express();
const port = 5005;
const cors = require("cors");
const connectToDb = require("./db/connection");
const { welcomePage } = require("./controllers/home_controller");
const welcomeRouter = require("./routers/welcome_route");
const createBookingRouter = require("./routers/booking_route");
const mongoose = require("mongoose");
const AppError = require("./utils/errorHandler");

const connectionUrl = process.env.CONNECTION_URL;
mongoose
	.connect(connectionUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => console.log("monggose connected siccessfully******************"))
	.catch((error) => {
		console.log(error);
	});

app.use(express.json());
app.use(cors());
app.use("/", welcomeRouter);
app.use("/api/booking", createBookingRouter);

app.all("*", (req, res, next) => {
	next(AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});
app.listen(port, () => {
	console.log("server is running on port 5005");
});
