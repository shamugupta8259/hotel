const Booking = require("../schemas/booking_schema");
const AppError = require("./../utils/errorHandler");
const nodemailer = require("nodemailer");
const moment = require("moment");
const getAllBookings = async (req, res) => {
	try {
		const fetchAllBookings = await Booking.find({});
		return { fetchAllBookings };
	} catch (err) {
		console.log(err);
	}
};

const createBooking = async (req, res, next) => {
	try {
		const room = req.body;
		if (!room.userEmail) {
			res.status(400).json({
				success: false,
				message: "Email is required",
			});
			return;
		}
		const ifAvailableRoom = await Booking.countDocuments({
			startTime: { $lte: room.endTime },
			endTime: { $gte: room.startTime },
			roomNumber: room.roomNumber,
			roomType: room.roomType,
		});

		if (ifAvailableRoom > 0) {
			res.status(400).json({
				success: false,
				message: "Room is not available at the specified time",
			});
			return;
		}

		const newBooking = new Booking({ ...room, status: "success" });

		await newBooking.save();
		await nodemailerMailingService(
			"learnandgrowonefiveoneone@gmail.com",
			room.userEmail,
			"vhfp ffmp fylt qdci",
			room,
			"Booking is Confirmed",
			"Thanks for using our app.\nYou have booked a room " +
				room.roomType +
				room.roomNumber +
				" from " +
				room.startTime +
				" to " +
				room.endTime +
				".\n" +
				"price Rs:" +
				room.price
		);

		return res.status(201).json({
			success: true,
			message: "Booking created successfully",
			data: newBooking,
		});
	} catch (err) {
		console.log(err);
	}
};

const editBooking = async (req, res, next) => {
	const ifExists = await Booking.findById(req.params._id);
	if (!ifExists) {
		return res.status(404).json({
			message: "Booking not found",
		});
	}

	const room = req.body;
	if (!room.userEmail) {
		res.status(400).json({
			success: false,
			message: "Email is required",
		});
		return;
	}
	const ifAvailableRoom = await Booking.countDocuments({
		startTime: { $lte: room.endTime },
		endTime: { $gte: room.startTime },
		roomNumber: room.roomNumber,
		roomType: room.roomType,
		_id: { $ne: req.params._id },
	});

	if (ifAvailableRoom > 0) {
		res.status(400).json({
			success: false,
			message: "Room is not available at the specified time",
		});
		return;
	}

	const editedBooking = await Booking.findByIdAndUpdate(req.params._id, {
		...room,
		status: "success",
	});
	await nodemailerMailingService(
		"learnandgrowonefiveoneone@gmail.com",
		room.userEmail,
		"vhfp ffmp fylt qdci",
		room,
		"Booking is Updated successfully",
		"Thanks for using our app.\nYou have booked a room " +
			room.roomType +
			room.roomNumber +
			" from " +
			room.startTime +
			" to " +
			room.endTime +
			".\n" +
			"price Rs:" +
			room.price
	);

	res.status(200).json(editedBooking);
};

const deleteBooking = async (req, res, next) => {
	const deleteBookingRequest = await Booking.findByIdAndDelete(req.params._id);
	res.status(200).json({
		message: "Booking deleted successfully",
	});
};

const getBooking = async (req, res, next) => {
	const bookingReq = await Booking.find({ _id: req.params._id });
	res.status(200).json(bookingReq[0]);
};

const viewallBookings = async (req, res, next) => {
	try {
		const roomNumber =
			req.query.roomNumber && req.query.roomNumber[0] === "S"
				? ""
				: req.query.roomNumber;
		const roomType =
			req.query.roomType && req.query.roomType[0] === "S"
				? ""
				: req.query.roomType;

		const room = req.query;

		const reqstartTime = new Date(Date.parse(req.query.startTime));
		const reqendTime = new Date(Date.parse(req.query.endTime));
		if (room.startTime === "null" && room.endTime === "null") {
			const posts = await Booking.find({
				...(roomNumber && { roomNumber: roomNumber }),
				...(roomType && { roomType: roomType }),
			});
			return res.status(200).json(posts);
		} else if (room.startTime === "null" && room.endTime !== "null") {
			const posts = await Booking.find({
				...(req.query.endTime && {
					endTime: { $lte: reqendTime },
				}),
				...(roomNumber && { roomNumber: roomNumber }),
				...(roomType && { roomType: roomType }),
			});
			return res.status(200).json(posts);
		} else if (room.startTime !== "null" && room.endTime === "null") {
			const posts = await Booking.find({
				...(req.query.startTime && {
					startTime: { $gte: reqstartTime },
				}),
				...(roomNumber && { roomNumber: roomNumber }),
				...(roomType && { roomType: roomType }),
			});
			return res.status(200).json(posts);
		} else {
			const posts = await Booking.find({
				...(req.query.startTime && {
					startTime: { $gte: reqstartTime },
				}),
				...(req.query.endTime && {
					endTime: { $lte: reqendTime },
				}),
				...(roomNumber && { roomNumber: roomNumber }),
				...(roomType && { roomType: roomType }),
			});
			return res.status(200).json(posts);
		}
	} catch (error) {
		next(error);
	}
};

const nodemailerMailingService = async (
	emailFrom,
	emailTo,
	passKey,
	room,
	subject,
	text
) => {
	const transporter = nodemailer.createTransport({
		service: "Gmail",
		auth: {
			user: emailFrom,
			pass: passKey,
		},
	});

	// Define email options
	const mailOptions = {
		from: emailFrom,
		to: emailTo,
		subject: subject,
		text: text,
	};

	// Send email
	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.error(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};

module.exports = {
	createBooking,
	editBooking,
	deleteBooking,
	getBooking,
	viewallBookings,
};
