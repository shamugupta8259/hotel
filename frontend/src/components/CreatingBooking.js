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
		startTime: new Date(),
		endTime: new Date(),
	});
	const [roomType, setRoomType] = useState("Select Room");
	const [roomNumber, setRoomNumber] = useState("Select Room number");
	const [price, setPrice] = useState(0);
	const [roomArray, setRoomArray] = useState([]);

	const totalRooms = { A: [1, 2], B: [1, 2, 3], C: [1, 2, 3, 4, 5] };
	// const roomA = ;
	// const roomB = ;
	// const roomC = ;

	// const rooms
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
		// console.log("i am out out tou use eFFect");
		// console.log("totalHours", totalHours);
		if (
			roomType.length === 1 &&
			roomNumber > 0 &&
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
				// console.log("totalHours", totalHours);
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
	// console.log("ROOM TYPES TYPES", totalRooms);
	// console.log("ROOM TYPES TYPES", roomType);

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
			} else if (
				!roomType ||
				roomType === "Select Room" ||
				!roomNumber ||
				roomNumber === "Select Room number"
			) {
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
					roomNumber: roomNumber,
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

	// if (errorMessage !== "") {
	// 	setTimeout(() => {
	// 		setErrorMessage({ message: "", success: "error" });
	// 	}, 9000);
	// }
	useEffect(() => {
		setTimeout(() => {
			setErrorMessage({ message: "", success: "error" });
		}, 9000);
	}, [errorMessage]);

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
				<div className="flex justify-center gap-8 mt-3 mb-2">
					<TextField
						sx={{ width: "100%" }}
						id="outlined-select-currency"
						select
						label="Select"
						defaultValue="Select Room"
						helperText="Please select room"
						value={roomType}
						onChange={(e) => {
							setRoomType(e.target.value);
							setRoomArray(totalRooms[e.target.value]);
							setRoomNumber("Select Room Number");
							console.log(e.target.value);
						}}
					>
						<MenuItem key="Select" value="1">
							Select Room
						</MenuItem>
						{Object.keys(totalRooms).map((option, index) => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>
					{/* <div className="flex justify-end"> */}
					<TextField
						id="outlined-select-currency"
						sx={{ width: "100%" }}
						select
						label="Select Room Number"
						defaultValue="Select Room Number"
						helperText="Please select room"
						disabled={roomArray && roomArray.length === 0}
						value={roomNumber}
						onChange={(e) => {
							setRoomNumber(e.target.value);
						}}
					>
						<MenuItem key="Select Room Number" value="1">
							Select Room Number
						</MenuItem>
						{roomArray.map((option, index) => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>
				</div>
				{/* </div> */}
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
										endTime: e !== null ? e.toDate() : new Date(),
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
