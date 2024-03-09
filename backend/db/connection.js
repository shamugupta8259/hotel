const mongoose = require("mongoose");

const connectToDb = (url) => {
	mongoose.connect(url);
	console.log("monggose connected siccessfully******************");
};

module.exports = connectToDb;
