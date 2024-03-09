const AppError = (message, statusCode) => {
	const error = new Error();
	error.statusCode = statusCode;
	error.message = message;
	console.log(error);
	return error;
};

module.exports = AppError;
