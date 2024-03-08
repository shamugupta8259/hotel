import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";

const EditBooking = () => {
	const location = useLocation();
	const totalRooms = { A: [1, 2], B: [1, 2, 3], C: [1, 2, 3, 4, 5] };
	const { _id } = useParams();
	const [bookingData, setBookingData] = useState({
		email: "",
		startTime: null,
		endTime: null,
		roomType: "",
		roomNumber: "",
		price: undefined,
	});

	const navigate = useNavigate();
	const [roomArray, setRoomArray] = useState();
	const perRoomPrice = {
		A: 100,
		B: 80,
		C: 50,
	};
	const [errorMessage, setErrorMessage] = useState({
		message: "",
		success: "",
	});
	const [room, setRoom] = useState({});
	useEffect(() => {
		try {
			// console.log(_id);
			const fetchbooking = async () => {
				// http://localhost:5005/api/booking/edit/65eae8fce2adf35fbdd6f641
				const res = await fetch(
					`http://localhost:5005/api/booking/getbooking/${_id}`,
					{
						method: "GET",
						headers: {
							"Content-Type": "application/json",
						},
					}
				);
				if (res.ok) {
					const data = await res.json();
					setRoom(data);
					setBookingData({
						...bookingData,
						email: data.userEmail,
						startTime: data.startTime,
						endTime: data.endTime,
						roomType: data.roomType,
						roomNumber: data.roomNumber,
						price: data.price,
					});
					setRoomArray(totalRooms[data.roomType]);
				}
				if (!res.ok) {
					setErrorMessage({ message: res.errorMessage, success: "error" });
				}
			};
			fetchbooking();
		} catch (error) {}
	}, []);
	console.log(bookingData);

	useEffect(() => {
		setBookingData({
			...bookingData,
			price: 0,
		});
		const checkInTime =
			bookingData.startTime === undefined
				? new Date()
				: new Date(bookingData.startTime);

		const checkOutTime =
			bookingData.endTime === undefined
				? new Date()
				: new Date(bookingData.endTime);

		const timeDifference = checkOutTime - checkInTime;
		const totalHours = timeDifference / (1000 * 60 * 60);
		if (
			bookingData.roomType &&
			bookingData.roomType.length === 1 &&
			bookingData.roomNumber > 0 &&
			checkInTime > new Date() &&
			checkInTime < checkOutTime
		) {
			console.log("i am in use eFFect");
			const roomCategory = bookingData.roomType.charAt(0) || "S";
			if (
				roomCategory === "A" ||
				roomCategory === "B" ||
				roomCategory === "C"
			) {
				const roomPrice = totalHours.toFixed(2) * perRoomPrice[roomCategory];
				setBookingData({
					...bookingData,
					price: roomPrice.toFixed(0),
				});
			}
		}
	}, [
		bookingData.email,
		bookingData.endTime,
		bookingData.startTime,
		bookingData.roomNumber,
		bookingData.roomType,
	]);
	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	const handleSubmit = async () => {
		try {
			if (!isValidEmail(bookingData.email)) {
				setErrorMessage({ message: "Invalid email address", success: "error" });
				return;
			}

			const checkInTime = bookingData.startTime;

			const checkOutTime = bookingData.endTime;
			if (!bookingData.email) {
				setErrorMessage({
					message: "Email is required",
					success: "error",
				});
				return;
			} else if (
				!bookingData.roomType ||
				bookingData.roomType === "Select Room" ||
				!bookingData.roomNumber ||
				bookingData.roomNumber === "Select Room number"
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
				setBookingData({
					...bookingData,
					startTime: null,
					endTime: null,
				});

				setErrorMessage({
					message: "Check In Time cannot be after or same Check Out Time",
					success: "error",
				});
				return;
			}
			const res = await fetch(`http://localhost:5005/api/booking/edit/${_id}`, {
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					userEmail: bookingData.email,
					roomNumber: bookingData.roomNumber,
					roomType: bookingData.roomType[0],
					startTime: bookingData.startTime,
					endTime: bookingData.endTime,
					price: bookingData.price,
				}),
			});
			const data = await res.json();
			// console.log(data);
			if (res.ok) {
				navigate("/create");

				setErrorMessage({
					message: "You have successfully updated the booking",
					success: "success",
				});

				console.log("YYYYYYYYIOOOOO");
			}
			if (!res.ok) {
				console.log(data);
				setErrorMessage({ message: data.message, success: "error" });
			}
		} catch (error) {
			console.log(error);
		}
	};

	// const handleChangeRooms = (e) => {
	// 	setBookingData({
	// 		...bookingData,
	// 		roomType: e.target.value,
	// 	});
	// };

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
					value={bookingData.email}
					onChange={(e) => {
						setBookingData({
							...bookingData,
							email: e.target.value,
						});
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
						value={bookingData.roomType}
						onChange={(e) => {
							setBookingData({
								...bookingData,
								roomType: e.target.value,
							});
							// console.log(bookingData.roomType);
							setRoomArray(totalRooms[e.target.value]);

							// console.log(e.target.value);
						}}
					>
						<MenuItem key="Select" value="1">
							Select Room
						</MenuItem>
						{Object.keys(totalRooms).map((option) => (
							<MenuItem key={option} value={option}>
								{option}
							</MenuItem>
						))}
					</TextField>
					<TextField
						id="outlined-select-currency"
						sx={{ width: "100%" }}
						select
						label="Select Room Number"
						defaultValue="Select Room Number"
						helperText="Please select room"
						disabled={roomArray && roomArray.length === 0}
						value={bookingData.roomNumber}
						onChange={(e) => {
							setBookingData({
								...bookingData,
								roomNumber: e.target.value,
							});
						}}
					>
						<MenuItem key="Select Room Number" value="0">
							Select Room Number
						</MenuItem>
						{roomArray &&
							roomArray.map((option) => (
								<MenuItem key={option} value={option}>
									{option}
								</MenuItem>
							))}
					</TextField>
				</div>
				<div className="flex md:flex-row flex-col gap-8 ">
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={["DateTimePicker"]}>
							<DateTimePicker
								value={
									bookingData.startTime ? dayjs(bookingData.startTime) : null
								}
								onChange={(e) => {
									setBookingData({
										...bookingData,
										startTime: e !== null ? e.toISOString() : new Date(),
									});
								}}
								label="Check In Time"
							/>
						</DemoContainer>
					</LocalizationProvider>
					<LocalizationProvider dateAdapter={AdapterDayjs}>
						<DemoContainer components={["DateTimePicker"]}>
							<DateTimePicker
								value={bookingData.endTime ? dayjs(bookingData.endTime) : null}
								onChange={(e) => {
									setBookingData({
										...bookingData,
										endTime: e !== null ? e.toISOString() : new Date(),
									});
								}}
								label="Check Out Time"
							/>
						</DemoContainer>
					</LocalizationProvider>
				</div>
				<div className="flex justify-end text-2xl font-serif font-bold">
					Updated Ammount in Rs :{bookingData.price}
				</div>
				<div className="flex justify-end">
					<Button
						variant="contained"
						onClick={handleSubmit}
						className="text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white py-2 px-4 w-[20rem] mt-5 rounded h-12"
					>
						Update booking
					</Button>
				</div>
			</div>
		</div>
	);
};

export default EditBooking;
