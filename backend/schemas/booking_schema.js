const mongoose = require("mongoose");

// const RoomSchema = {};

const BookingSchema = new mongoose.Schema(
	{
		userEmail: {
			type: String,
			required: true,
		},
		roomNumber: {
			type: String,
			required: true,
			default: "",
		},
		roomType: {
			type: String,
			required: true,
			default: "",
		},
		startTime: {
			type: Date,
			required: true,
		},
		endTime: {
			type: Date,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		status: {
			type: String,
			default: "",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("BookingSchema", BookingSchema);
