const Booking = require("../schemas/booking_schema");
// const errorHandler = require("../utils/errorHandler");
const AppError = require("./../utils/errorHandler");
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
		room,
	});
	console.log(editedBooking);
	res.status(200).json(editedBooking);
};

const deleteBooking = async (req, res, next) => {
	const deleteBookingRequest = Booking.findByIdAndDelete(req.params._id);
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

module.exports = { createBooking, editBooking, deleteBooking, getBooking };
