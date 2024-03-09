import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { useNavigate, useParams } from "react-router-dom";
import { MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { useLocation } from "react-router-dom";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

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
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const [roomArray, setRoomArray] = useState();

	const [errorMessage, setErrorMessage] = useState({
		message: "",
		success: "",
	});
	const [room, setRoom] = useState({});
	useEffect(() => {
		// console.log("i am here");
		try {
			const fetchbooking = async () => {
				const res = await fetch(
					`https://hotel-production.up.railway.app/api/booking/getbooking/${_id}`,
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
					// console.log(data);
					setBookingData({
						...bookingData,
						email: data.userEmail,
						startTime: data.startTime,
						endTime: data.endTime,
						roomType: data.roomType,
						roomNumber: data.roomNumber,
						price: data.price,
					});
					// console.log(bookingData, "******");
					setRoomArray(totalRooms[data.roomType]);
				}
				if (!res.ok) {
					setErrorMessage({ message: res.errorMessage, success: "error" });
				}
			};
			fetchbooking();
			// console.log(bookingData);
		} catch (error) {}
	}, [2]);
	console.log(bookingData);

	useEffect(() => {
		const perRoomPrice = {
			A: 100,
			B: 80,
			C: 50,
		};
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
			checkInTime >= new Date() &&
			checkInTime < checkOutTime
		) {
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
		bookingData,
	]);
	function isValidEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailRegex.test(email);
	}

	const handleSubmit = async () => {
		setShowModal(false);
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
			} else if (new Date(checkInTime) < new Date()) {
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
					message: "Check In Time cannot be greater  than Check Out Time",
					success: "error",
				});
				return;
			}
			const res = await fetch(
				`https://hotel-production.up.railway.app/api/booking/edit/${_id}`,
				{
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
				}
			);
			const data = await res.json();

			if (res.ok) {
				navigate("/");

				setErrorMessage({
					message: "You have successfully updated the booking",
					success: "success",
				});
			}
			if (!res.ok) {
				// console.log(data);
				setErrorMessage({ message: data.message, success: "error" });
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		setTimeout(() => {
			setErrorMessage({ message: "", success: "error" });
		}, 5000);
	}, [errorMessage]);

	return (
		<div className="max-w-[37rem] mx-auto mt-12">
			{errorMessage.message && (
				<Alert severity={errorMessage.success}>{errorMessage.message}</Alert>
			)}
			<div className={`flex flex-col gap-2 ${showModal ? "opacity-50" : ""}`}>
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
								roomNumber: 0,
							});
							setRoomArray(totalRooms[e.target.value]);
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
					Ammount in Rs :
					<span className="text-pink-700 text-3xl mx-1 font-mono font-extrabold underline">
						{bookingData.price}
					</span>
				</div>
				<div className="flex justify-end">
					<Button
						variant="contained"
						onClick={() => setShowModal(true)}
						// onClick={handleSubmit}
						className="text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white py-2 px-4 w-[20rem] mt-5 rounded h-12"
					>
						Update booking
					</Button>
				</div>
			</div>
			<div className="w-[300px]">
				<Modal
					show={showModal}
					// show={true}
					onClose={() => setShowModal(false)}
					popup
					size="md"
					className="max-w-xl mx-auto z-20"
				>
					<Modal.Header />
					<Modal.Body>
						<div className="text-center">
							<HiOutlineExclamationCircle className="h-14 w-14 text-black mb-4 mx-auto" />
							<h3 className="mb-5 text-lg text-black font-semibold">
								Are you sure you want to update this booking?<br></br>
								Your updated amount will be:
								{/* <span className="font-bold text-xl italic underline text-pink-600 mx-1"></span> */}
								<span className=" mx-2 text-2xl italic underline text-pink-700 font-bold font-it">
									<span className="text-xl">Rs</span>
									{bookingData.price}
								</span>
							</h3>
							<div className="flex justify-center items-center gap-4">
								<div
									onClick={handleSubmit}
									className="text-white hover:cursor-pointer bg-red-700 rounded text-center flex items-center justify-center hover:bg-red-500 border-2 w-48 h-12"
								>
									Yes, I'm sure
								</div>

								<Button color="black" onClick={() => setShowModal(false)}>
									<div className="text-white bg-green-700 rounded text-center flex items-center justify-center hover:bg-green-500 border-2 w-24 h-12">
										No, cancel
									</div>
								</Button>
							</div>
						</div>
					</Modal.Body>
				</Modal>
			</div>
		</div>
	);
};

export default EditBooking;
