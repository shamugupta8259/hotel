const AppError = (message, statusCode) => {
	const error = new Error();
	error.statusCode = statusCode;
	error.message = message;
	console.log(error);
	return error;
};

module.exports = AppError;
// class AppError extends Error {
// 	constructor(message, statusCode) {
// 		console.log(message, statusCode);

// 		super(message);

// 		this.statusCode = statusCode;
// 		this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
// 		this.isOperational = true;

// 		Error.captureStackTrace(this, this.constructor);
// 	}
// }

module.exports = AppError;
