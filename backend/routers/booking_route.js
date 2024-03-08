const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/booking_controller");
const { editBooking } = require("../controllers/booking_controller");
const { getBooking } = require("../controllers/booking_controller");

router.route("/create").post(createBooking);
router.route("/edit/:_id").post(editBooking);
router.route("/getbooking/:_id").get(getBooking);

module.exports = router;
