const express = require("express");
const router = express.Router();
const {
	createBooking,
	viewallBookings,
	deleteBooking,
} = require("../controllers/booking_controller");
const { editBooking } = require("../controllers/booking_controller");
const { getBooking } = require("../controllers/booking_controller");

router.route("/create").post(createBooking);
router.route("/edit/:_id").put(editBooking);
router.route("/getbooking/:_id").get(getBooking);
router.route("/viewallbook").get(viewallBookings);
router.route("/delete/:_id").delete(deleteBooking);

module.exports = router;
