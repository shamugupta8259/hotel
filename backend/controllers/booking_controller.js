const Booking = require("../schemas/booking_schema");
// const errorHandler = require("../utils/errorHandler");
const AppError = require("./../utils/errorHandler");

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
		console.log(room);
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
		console.log(ifAvailableRoom);
		if (ifAvailableRoom > 0) {
			// return next(AppError("Room is not available at the specified time", 404));
			res.status(400).json({
				success: false,
				message: "Room is not available at the specified time",
			});
			return;
		}
		const totalTime = room.endTime - room.startTime;
		console.log(totalTime);
		const newBooking = new Booking({ ...room, status: "success" });
		// newBooking.status = "success";
		await newBooking.save();

		return res.status(201).json({
			success: true,
			message: "Booking created successfully",
			data: newBooking,
		});
	} catch (err) {
		// next(err);
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
	console.log("int the edit");
	const room = req.body;
	console.log(room);
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
	console.log(ifAvailableRoom);
	if (ifAvailableRoom > 0) {
		// return next(AppError("Room is not available at the specified time", 404));
		res.status(400).json({
			success: false,
			message: "Room is not available at the specified time",
		});
		return;
	}
	console.log("********************************");
	const editedBooking = await Booking.findByIdAndUpdate(req.params._id, {
		...room,
		status: "success",
	});
	console.log(editedBooking);
	res.status(200).json(editedBooking);
};

const deleteBooking = async (req, res, next) => {
	const deleteBookingRequest = await Booking.findByIdAndDelete(req.params._id);
	res.status(200).json({
		message: "Booking deleted successfully",
	});
};

const getBooking = async (req, res, next) => {
	// console.log(typeof req.params._id);

	const bookingReq = await Booking.find({ _id: req.params._id });
	// console.log(bookingReq[0].userEmail);
	res.status(200).json(bookingReq[0]);
};

const viewallBookings = async (req, res, next) => {
	try {
		// const sortDirection = req.query.order === "asc" ? 1 : -1;

		const roomNumber =
			req.query.roomNumber && req.query.roomNumber[0] === "S"
				? ""
				: req.query.roomNumber;
		const roomType =
			req.query.roomType && req.query.roomType[0] === "S"
				? ""
				: req.query.roomType;
		console.log(req.query);
		const room = req.query;
		// if (req.query === ) {
		// 	const posts = await Booking.find({});

		// 	return res.status(200).json(posts);
		// }
		const reqstartTime = new Date(req.query.startTime);
		const reqendTime = new Date(req.query.startTime);
		if (!roomType.startTime && !roomType.endTime) {
			console.log("yooooo");
			const posts = await Booking.find({
				...(roomNumber && { roomNumber: roomNumber }),
				...(roomType && { roomType: roomType }),
			});

			return res.status(200).json(posts);
		} else if (!roomType.endTime) {
			const posts = await Booking.find({
				...(req.query.startTime !== null && {
					startTime: { $gte: reqstartTime },
				}),
				...(roomNumber && { roomNumber: roomNumber }),
				...(roomType && { roomType: roomType }),
			});

			return res.status(200).json(posts);
		} else if (!roomType.startTime) {
			const posts = await Booking.find({
				...(req.query.endTime !== null && {
					endTime: { $lte: reqendTime },
				}),
				...(roomNumber && { roomNumber: roomNumber }),
				...(roomType && { roomType: roomType }),
			});

			return res.status(200).json(posts);
		} else {
			const posts = await Booking.find({
				...(req.query.startTime !== null && {
					startTime: { $gte: reqstartTime },
				}),
				...(req.query.endTime !== null && {
					endTime: { $lte: reqendTime },
				}),
				...(roomNumber && { roomNumber: roomNumber }),
				...(roomType && { roomType: roomType }),
			});

			return res.status(200).json(posts);
		}
		// const post11 = await Booking.find();
		// console.log(post11);
		// if (req.query.endTime === null && req.query.startTime === null) {
		// 	const posts = await Booking.find({
		// 		...(roomNumber && { roomNumber: roomNumber }),
		// 		...(roomType && { roomType: roomType }),
		// 	});
		// 	console.log(posts);
		// 	return res.status(200).json(posts);
		// } else {
		// 	const posts = await Booking.find({
		// 		...(req.query.startTime && {
		// 			startTime: { $gte: moment(req.query.startTime).toDate() },
		// 		}),
		// 		...(req.query.endTime && {
		// 			endTime: { $lte: moment(req.query.endTime).toDate() },
		// 		}),
		// 		...(roomNumber && { roomNumber: roomNumber }),
		// 		...(roomType && { roomType: roomType }),
		// 	});
		// 	console.log(posts);
		// 	return res.status(200).json(posts);
		// }

		// const totalPosts = await posts.countDocuments();
		// const totalPosts = await Booking.find();
		// console.log(totalPosts);
	} catch (error) {
		next(error);
	}
};

module.exports = {
	createBooking,
	editBooking,
	deleteBooking,
	getBooking,
	viewallBookings,
};
