// import { useState } from "react";
// import Button from "@mui/material/Button";

// import Form from "react-bootstrap/Form";
// import * as React from "react";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { Alert, Box, TextField } from "@mui/material";

// const CreatingBooking = () => {
// 	const [errorMessage, setErrorMessage]{message: = useState("YOO",success:"error"});
// 	const [email, setEmail] = useState("");
// 	const [roomA, setRoomA] = useState({
// 		requiredRoom: null,
// 		startTime: null,
// 		endTime: null,
// 	});
// 	const [roomB, setRoomB] = useState({
// 		requiredRoom: null,
// 		startTime: null,
// 		endTime: null,
// 	});
// 	const [roomC, setRoomC] = useState({
// 		requiredRoom: null,
// 		startTime: null,
// 		endTime: null,
// 	});

// 	return (
// 		<div className="max-w-[37rem] max-md:m-6 md:mx-auto mt-12">
// 			<div>
// 				{errorMessage && <Alert severity="error">{errorMessage}</Alert>}
// 			</div>
// 			<div className=" flex flex-col gap-2">
// 				<div className="">Email address :</div>
// 				<TextField
// 					id="outlined-basic"
// 					label="Email address"
// 					variant="outlined"
// 					type="email"
// 					required
// 					style={{}}
// 					value={email}
// 					onChange={(e) => setEmail(e.target.value)}
// 				/>
// 				<div className="mt-4 border-4 rounded p-2">
// 					<div className="flex flex-row items-center">
// 						<div className="mx-0">Room Type A:</div>
// 						<TextField
// 							id="outlined-basic"
// 							label="Rooms required"
// 							variant="outlined"
// 							sx={{ width: "28rem" }}
// 							style={{ marginLeft: "auto" }}
// 							value={roomA.requiredRoom}
// 							onChange={(e) => {
// 								setRoomA({ requiredRoom: e.target.value });
// 							}}
// 						/>
// 					</div>
// 					<div className="flex md:flex-row flex-col gap-1 ">
// 						<LocalizationProvider dateAdapter={AdapterDayjs}>
// 							<DemoContainer components={["DateTimePicker"]}>
// 								<DateTimePicker
// 									onChange={(e) => {
// 										// console.log(e);
// 										setRoomA({ startTime: e.toDate() });
// 									}}
// 									label="Check In Time"
// 								/>
// 							</DemoContainer>
// 						</LocalizationProvider>
// 						<LocalizationProvider dateAdapter={AdapterDayjs}>
// 							<DemoContainer components={["DateTimePicker"]}>
// 								<DateTimePicker
// 									onChange={(e) => {
// 										setRoomA({ endTime: e.toDate() });
// 									}}
// 									label="Check Out Time"
// 								/>
// 							</DemoContainer>
// 						</LocalizationProvider>
// 					</div>
// 				</div>
// 				<div className="mt-4 border-4 rounded p-2">
// 					<div className="flex flex-row items-center">
// 						<div className="mx-0 text-1xl">Room Type B:</div>
// 						<TextField
// 							id="outlined-basic"
// 							label="Rooms required"
// 							variant="outlined"
// 							sx={{ width: "28rem" }}
// 							style={{ marginLeft: "auto" }}
// 							value={roomB.requiredRoom}
// 							onChange={(e) => {
// 								setRoomB({ requiredRoom: e.target.value });
// 							}}
// 						/>
// 					</div>
// 					<div className="flex md:flex-row flex-col gap-1 ">
// 						<LocalizationProvider dateAdapter={AdapterDayjs}>
// 							<DemoContainer components={["DateTimePicker"]}>
// 								<DateTimePicker
// 									onChange={(e) => {
// 										setRoomB({ startTime: e.toDate() });
// 									}}
// 									label="Check In Time"
// 								/>
// 							</DemoContainer>
// 						</LocalizationProvider>
// 						<LocalizationProvider dateAdapter={AdapterDayjs}>
// 							<DemoContainer components={["DateTimePicker"]}>
// 								<DateTimePicker
// 									onChange={(e) => {
// 										setRoomB({ endTime: e.toDate() });
// 									}}
// 									label="Check Out Time"
// 								/>
// 							</DemoContainer>
// 						</LocalizationProvider>
// 					</div>
// 				</div>
// 				<div className="mt-4 border-4 rounded p-2">
// 					<div className="flex flex-row items-center">
// 						<div className="mx-0">Room Type C:</div>
// 						<TextField
// 							id="outlined-basic"
// 							label="Rooms required"
// 							variant="outlined"
// 							sx={{ width: "28rem" }}
// 							style={{ marginLeft: "auto" }}
// 							value={roomC.requiredRoom}
// 							onChange={(e) => {
// 								setRoomC({ requiredRoom: e.target.value });
// 							}}
// 						/>
// 					</div>
// 					<div className="flex md:flex-row flex-col gap-1 ">
// 						<LocalizationProvider dateAdapter={AdapterDayjs}>
// 							<DemoContainer components={["DateTimePicker"]}>
// 								<DateTimePicker
// 									onChange={(e) => {
// 										setRoomC({ startTime: e.toDate() });
// 									}}
// 									label="Check In Time"
// 								/>
// 							</DemoContainer>
// 						</LocalizationProvider>
// 						<LocalizationProvider dateAdapter={AdapterDayjs}>
// 							<DemoContainer components={["DateTimePicker"]}>
// 								<DateTimePicker
// 									onChange={(e) => {
// 										setRoomC({ endTime: e.toDate() });
// 									}}
// 									label="Check Out Time"
// 								/>
// 							</DemoContainer>
// 						</LocalizationProvider>
// 					</div>
// 				</div>
// 				<div className="flex justify-end">
// 					<button className=" text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white py-2 px-4   text-center w-[20rem] mt-5 rounded h-12">
// 						Submit
// 					</button>
// 				</div>
// 			</div>
// 		</div>
// 	);
// };

// export default CreatingBooking;

// import React, { useState } from "react";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
// import Alert from "@mui/material/Alert";
// import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// // import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
// import { MenuItem } from "@mui/material";

// const CreatingBooking = () => {
// 	const [errorMessage, setErrorMessage]{message: = useState("",success:"error"});
// 	const [email, setEmail] = useState("");
// 	const [rooms, setRooms] = useState({
// 		requiredRoom: "Select Room",
// 		startTime: new Date(),
// 		endTime: new Date(),
// 	});
// 	const [roomType, setRoomType] = useState("Select Room");
// 	const [price, setPrice] = useState(0);

// 	const totalRooms = [
// 		"A1",
// 		"A2",
// 		"B1",
// 		"B2",
// 		"B3",
// 		"C1",
// 		"C2",
// 		"C3",
// 		"C4",
// 		"C5",
// 	];
// 	const perRoomPrice = {
// 		A: 100,
// 		B: 80,
// 		C: 50,
// 	};
// 	console.log(email, rooms);

// 	const handleSubmit = async () => {
// 		if (!email) {
// 			setErrorMessage({message:"Email is required",success:"error"});
// 			return;
// 		}
// 		if (!roomType) {
// 			setErrorMessage({message:"Room is required",success:"error"});
// 			return;
// 		}
// 		if (!rooms.startTime) {
// 			setErrorMessage({message:"Check In Time is required",success:"error"});
// 			return;
// 		}
// 		if (!rooms.endTime) {
// 			setErrorMessage({message:"Check Out Time is required",success:"error"});
// 			return;
// 		}
// 		if (rooms.startTime > rooms.endTime) {
// 			setErrorMessage({message:"Check In Time cannot be after or same Check Out Time",success:"error"});
// 			return;
// 		}
// 		if (roomType === "Select Room") {
// 			setErrorMessage({message:"Room is required",success:"error"});
// 			return;
// 		}
// 		// const timeDifference = rooms.endTime - rooms.startTime;
// 		// const totalHours = timeDifference / (1000 * 60 * 60);
// 		// const roomPrice =
// 		// 	totalHours.toFixed(2) * perRoomPrice[rooms.requiredRoom[0]];
// 		// console.log(
// 		// 	roomPrice,
// 		// 	perRoomPrice[rooms.requiredRoom[0]],
// 		// 	rooms.requiredRoom[0]
// 		// );
// 		// setRooms({
// 		// 	price: roomPrice,
// 		// });
// 		console.log("Form submitted:", { email, rooms });
// 		const res = await fetch("http://localhost:5005/api/booking/create", {
// 			method: "POST",
// 			headers: {
// 				"Content-Type": "application/json",
// 			},
// 			body: JSON.stringify({
// 				userEmail: email,
// 				requiredRoom: roomType,
// 				startTime: rooms.startTime,
// 				endTime: rooms.endTime,
// 				price: rooms.price,
// 			}),
// 		});
// 		if (res.ok) {
// 			console.log("YYYYYYYYIOOOOO");
// 		}
// 		if (!res.ok) {
// 			setErrorMessage({message:res.errorMessage,success:"error"});
// 		}
// 		console.log("Form submitted:", { email, rooms });
// 	};
// 	const handleChangeRooms = (e) => {
// 		setRoomType(e.target.value);
// 		handleChangeTime();
// 	};
// 	const handleChangeTime = () => {
// 		console.log("i am handletime");
// 		// console.log(
// 		// 	// roomPrice,
// 		// 	// perRoomPrice[rooms.requiredRoom[0]],
// 		// 	// rooms.requiredRoom[0],
// 		// 	rooms.endTime,
// 		// 	rooms.startTime
// 		// );
// 		const checkInTime =
// 			rooms.startTime === undefined ? new Date() : new Date(rooms.startTime);

// 		const checkOutTime =
// 			rooms.endTime === undefined ? new Date() : new Date(rooms.endTime);

// 		const timeDifference = checkOutTime - checkInTime;
// 		// console.log(checkOutTime, checkInTime, "^^^^^^^^^^^^^^^^^");
// 		const totalHours = timeDifference / (1000 * 60 * 60);
// 		// console.log(roomType, checkInTime, checkOutTime);
// 		const typeRoom = roomType.charAt(0) || "S";
// 		console.log(
// 			totalHours,
// 			roomType,
// 			"**%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%******"
// 		);
// 		if (typeRoom === "A" || typeRoom === "B" || typeRoom === "C") {
// 			const roomPrice = totalHours.toFixed(2) * perRoomPrice[typeRoom];
// 			console.log(
// 				typeof roomPrice.toFixed(0),
// 				totalHours,
// 				perRoomPrice[typeRoom],
// 				"**************************************************************"
// 			);
// 			setPrice(roomPrice);
// 		}
// 		// console.log(rooms, price, "*******************************");
// 	};

// 	if (errorMessage !== "") {
// 		setTimeout(() => {
// 			setErrorMessage({message:"",success:"error"});
// 		}, 2000);
// 	}

import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { MenuItem } from "@mui/material";
import dayjs from "dayjs";

const CreatingBooking = () => {
	const [errorMessage, setErrorMessage] = useState({
		message: "",
		success: "",
	});
	const [email, setEmail] = useState("");
	const [rooms, setRooms] = useState({
		startTime: null,
		endTime: null,
	});
	const [roomType, setRoomType] = useState("Select Room");
	const [roomNumber, setRoomNumber] = useState(0);
	const [price, setPrice] = useState(0);
	const totalRooms = [
		"A1",
		"A2",
		"B1",
		"B2",
		"B3",
		"C1",
		"C2",
		"C3",
		"C4",
		"C5",
	];
	const perRoomPrice = {
		A: 100,
		B: 80,
		C: 50,
	};
	useEffect(() => {
		setPrice(0);
		const checkInTime =
			rooms.startTime === undefined ? new Date() : new Date(rooms.startTime);

		const checkOutTime =
			rooms.endTime === undefined ? new Date() : new Date(rooms.endTime);

		const timeDifference = checkOutTime - checkInTime;
		const totalHours = timeDifference / (1000 * 60 * 60);
		console.log("i am out out tou use eFFect");
		console.log("totalHours", totalHours);
		if (
			roomType.length === 2 &&
			checkInTime > new Date() &&
			checkInTime < checkOutTime
		) {
			console.log("i am in use eFFect");
			const roomCategory = roomType.charAt(0) || "S";
			if (
				roomCategory === "A" ||
				roomCategory === "B" ||
				roomCategory === "C"
			) {
				console.log("totalHours", totalHours);
				const roomPrice = totalHours.toFixed(2) * perRoomPrice[roomCategory];
				setPrice(roomPrice.toFixed(0));
			}
		}
	}, [roomType, rooms.startTime, rooms.endTime]);
	function isValidEmail(email) {
		// Regular expression for basic email validation
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}
	const handleSubmit = async () => {
		try {
			if (!isValidEmail(email)) {
				setErrorMessage({ message: "Invalid email address", success: "error" });
				return;
			}
			// const checkInTime =
			// 	rooms.startTime === undefined ? new Date() : new Date(rooms.startTime);

			// const checkOutTime =
			// 	rooms.endTime === undefined ? new Date() : new Date(rooms.endTime);
			const checkInTime = rooms.startTime;

			const checkOutTime = rooms.endTime;
			if (!email) {
				setErrorMessage({
					message: "Email is required",
					success: "error",
				});
				return;
			} else if (!roomType || roomType === "Select Room") {
				setErrorMessage({
					message: "Room is required",
					success: "error",
				});
				return;
			} else if (!checkInTime) {
				setErrorMessage({
					message: "Check In Time is required",
					success: "error",
				});
				return;
			} else if (checkInTime < new Date()) {
				setErrorMessage({
					message:
						"check in date time should be greater than or equal to current time and date",
					success: "error",
				});
				return;
			} else if (!checkOutTime) {
				setErrorMessage({
					message: "Check Out Time is required",
					success: "error",
				});
				return;
			} else if (checkInTime > checkOutTime) {
				setRooms({
					startTime: null,
					endTime: null,
				});
				setErrorMessage({
					message: "Check In Time cannot be after or same Check Out Time",
					success: "error",
				});
				return;
			}
			const res = await fetch("http://localhost:5005/api/booking/create", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userEmail: email,
					roomNumber: roomType[1],
					roomType: roomType[0],
					startTime: rooms.startTime,
					endTime: rooms.endTime,
					price: price,
				}),
			});
			const data = await res.json(); // Extract JSON data from the response
			console.log(data);
			if (res.ok) {
				setEmail("");
				setRoomType("Select Room");
				setRooms({
					startTime: null,
					endTime: null,
				});
				setPrice(0);
				setErrorMessage({
					message: "You have successfully booked the room",
					success: "success",
				});

				console.log("YYYYYYYYIOOOOO");
			}
			if (!res.ok) {
				console.log(data);
				setErrorMessage({ message: data.message, success: "error" });
			}
			// console.log("Form submitted:", { email, rooms });
		} catch (error) {
			console.log(error);
		}
	};
	const handleChangeRooms = (e) => {
		setRoomType(e.target.value);
	};

	if (errorMessage !== "") {
		setTimeout(() => {
			setErrorMessage({ message: "", success: "error" });
		}, 9000);
	}
	// useEffect(() => {
	//   first

	//   return () => {
	// 	second
	//   }
	// }, [errorMessage])

	return (
		<div className="max-w-[37rem] mx-auto mt-12">
			{errorMessage.message && (
				<Alert severity={errorMessage.success}>{errorMessage.message}</Alert>
			)}
			<div className="flex flex-col gap-2">
				<div className="">Email address :</div>
				<TextField
					id="outlined-basic"
					label="Email address"
					variant="outlined"
					type="email"
					required
					style={{ width: "100%" }}
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
						console.log(email);
					}}
				/>

				<TextField
					id="outlined-select-currency"
					select
					label="Select"
					defaultValue="Select Room"
					helperText="Please select room"
					value={roomType}
					onChange={(e) => {
						setRoomType(e.target.value);
						// console.log(
						// 	roomType,
						// 	"&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&"
						// );
						// handleChangeTime();
					}}
				>
					<MenuItem key="Select" value="Select Room">
						Select Room
					</MenuItem>
					{totalRooms.map((option) => (
						<MenuItem key={option} value={option}>
							{option}
						</MenuItem>
					))}
				</TextField>
				<div className="flex md:flex-row flex-col gap-8 ">
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={["DateTimePicker"]}>
							<DateTimePicker
								value={rooms.startTime ? dayjs(rooms.startTime) : null}
								onChange={(e) => {
									setRooms({
										...rooms,
										startTime: e !== null ? e.toDate() : new Date(),
									});
									// handleChangeTime();
								}}
								// onAccept={handleChangeTime}
								label="Check In Time"
							/>
						</DemoContainer>
					</LocalizationProvider>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={["DateTimePicker"]}>
							<DateTimePicker
								value={rooms.endTime ? dayjs(rooms.endTime) : null}
								onChange={(e) => {
									setRooms({
										...rooms,
										endTime: e !== null ? e : new Date(),
									});
									// handleChangeTime();
								}}
								// onAccept={handleChangeTime}
								label="Check Out Time"
							/>
						</DemoContainer>
					</LocalizationProvider>
				</div>
				<div className="flex justify-end text-2xl font-serif font-bold">
					Total Ammount in Rs :{price}
				</div>
				<div className="flex justify-end">
					<Button
						variant="contained"
						onClick={handleSubmit}
						className="text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white py-2 px-4 w-[20rem] mt-5 rounded h-12"
					>
						Submit
					</Button>
				</div>
			</div>
		</div>
	);
};

export default CreatingBooking;
