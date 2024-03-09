/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, Modal, Table, TableRow } from "flowbite-react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MenuItem } from "@mui/material";
import dayjs from "dayjs";

const ViewAllBooking = () => {
	const totalRooms = { A: [1, 2], B: [1, 2, 3], C: [1, 2, 3, 4, 5] };

	let postToBeDeleted = {};
	const [bookingData, setBookingData] = useState({
		email: "",
		startTime: null,
		endTime: null,
		roomType: "",
		roomNumber: "",
	});
	const [roomArray, setRoomArray] = useState();
	const [showMore, setShowMore] = useState(false);
	const [booking, setBooking] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [bookIdToDelete, setBookIdToDelete] = useState({
		updatedAt: "",
		_id: "",
	});
	const [refundPrice, setRefundPrice] = useState(0);

	const fetchPosts = async () => {
		setBookingData({
			email: "",
			startTime: null,
			endTime: null,
			roomType: "",
			roomNumber: "",
		});
		try {
			const res = await fetch(
				`http://localhost:5005/api/booking/viewallbook?startTime=${bookingData.startTime}&endTime=${bookingData.endTime}&roomNumber=${bookingData.roomNumber}&roomType=${bookingData.roomType}`,
				{
					method: "GET",
				}
			);
			const data = await res.json();

			if (res.ok) {
				setBooking(data);
			} else {
				console.log(data.error);
			}
		} catch (error) {
			console.log(error);
		}
	};
	// console.log(new Date(), Date.now());
	const handleDeleteModal = () => {
		setRefundPrice(0);

		const currentDate = new Date();
		const endDate = new Date(postToBeDeleted.endTime);
		// console.log();
		const completedBooking = endDate.getTime() - currentDate.getTime();
		if (completedBooking < 0) {
			return setRefundPrice(0);
		}
		const timeDifferenceInMilliseconds =
			new Date() - new Date(postToBeDeleted.updatedAt);
		const timeDifferenceInHours =
			timeDifferenceInMilliseconds / (1000 * 60 * 60);

		if (timeDifferenceInHours.toFixed(2) > 48) {
			setRefundPrice(postToBeDeleted.price);
		} else if (
			timeDifferenceInHours.toFixed(2) < 48 &&
			timeDifferenceInHours.toFixed(2) > 24
		) {
			setRefundPrice((postToBeDeleted.price / 2).toFixed(2));
		} else {
			setRefundPrice(0);
		}
	};
	useEffect(() => {
		fetchPosts();
		setShowMore(false);
	}, [showMore, refundPrice]);
	const handleDeletePost = async () => {
		setShowModal(false);
		try {
			const res = await fetch(
				`http://localhost:5005/api/booking/delete/${bookIdToDelete._id}`,
				{
					method: "DELETE",
				}
			);
			const data = await res.json();
			if (!res.ok) {
				console.log(data.message);
			} else {
				setBooking((prev) =>
					prev.filter((post) => post._id !== bookIdToDelete._id)
				);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleSubmit = async () => {
		try {
			setBookingData({
				...bookingData,
				startTime: bookingData.startTime,
				endTime: bookingData.endTime,
				roomNumber:
					bookingData.roomNumber === undefined ? "" : bookingData.roomNumber,
				roomType:
					bookingData.roomType === undefined ? "" : bookingData.roomType,
			});

			const res = await fetch(
				`http://localhost:5005/api/booking/viewallbook?startTime=${bookingData.startTime}&endTime=${bookingData.endTime}&roomNumber=${bookingData.roomNumber}&roomType=${bookingData.roomType}`,
				{
					method: "GET",
				}
			);
			const data = await res.json();

			if (res.ok) {
				setBooking(data);
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleDeleteMessage = (post) => {
		handleDeleteModal();
		setBookIdToDelete({
			_id: post._id,
			updatedAt: post.updatedAt,
		});

		setShowModal(true);
	};
	const handleClear = () => {
		setShowMore(true);
		fetchPosts();
	};
	// const handleEdit = () => {
	//     if()
	//     // to={`/update-post/${post._id}`}
	// }
	return (
		<div className={`flex flex-row ${showModal ? "opacity-50" : ""}`}>
			<div className="w-[79%]   table-auto overflow-x-scroll p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
				{booking && booking.length > 0 ? (
					<>
						<Table hoverable className="shadow-md">
							<Table.Head className="text-lg  text-gray-700">
								<Table.HeadCell>Created At</Table.HeadCell>
								<Table.HeadCell>Room Type</Table.HeadCell>
								<Table.HeadCell>Room Number</Table.HeadCell>
								<Table.HeadCell>Check In Time</Table.HeadCell>
								<Table.HeadCell>Check Out Time</Table.HeadCell>
								<Table.HeadCell>Booking Price</Table.HeadCell>
								<Table.HeadCell>Delete</Table.HeadCell>
								<Table.HeadCell>Edit</Table.HeadCell>
							</Table.Head>
							{booking.map((post) => (
								<Table.Body
									className="divide-y border-2 rounded p-2"
									key={post._id}
								>
									<Table.Row className="bg-white border-gray-200 text-gray-700">
										<Table.Cell>
											{new Date(post.updatedAt).toLocaleDateString()}
										</Table.Cell>
										<Table.Cell>{post.roomType}</Table.Cell>
										<Table.Cell>{post.roomNumber}</Table.Cell>
										<Table.Cell>{post.startTime}</Table.Cell>
										<Table.Cell>{post.endTime}</Table.Cell>
										<Table.Cell>
											<span
												className={`${
													new Date(post.endTime) < new Date()
														? "text-sky-800"
														: "text-green-600"
												} `}
											>
												<div className="font-semibold font-mono italic">
													{post.price}
												</div>
												{new Date(post.endTime) < new Date() ? (
													<>
														<div className="text-xs text-red-500">
															Booking Completed
														</div>
													</>
												) : (
													<>
														<div className="text-xs text-blue-500">Booking</div>
													</>
												)}
											</span>
										</Table.Cell>
										<Table.Cell>
											<span
												onClick={() => {
													postToBeDeleted = post;
													handleDeleteMessage(post);
												}}
												className="font-medium text-red-500 hover:underline cursor-pointer"
											>
												Delete
											</span>
										</Table.Cell>
										<Table.Cell>
											<div
												className="text-teal-500"
												// to={`/update-post/${post._id}`}
												// onClick={handleEdit}
											>
												{new Date(post.startTime) < new Date() ||
												new Date(post.endTime) < new Date() ? (
													<div className=" text-gray-600 flex-wrap w-14 h-12">
														progress or completed
													</div>
												) : (
													<Link
														className="text-teal-500 hover:underline"
														to={`/update-post/${post._id}`}
													>
														Edit
													</Link>
												)}
											</div>
										</Table.Cell>
									</Table.Row>
								</Table.Body>
							))}
						</Table>
					</>
				) : (
					<p>You have no posts yet!</p>
				)}

				<div className="w-[300px]">
					<Modal
						show={showModal}
						onClose={() => setShowModal(false)}
						popup
						size="md"
						className="max-w-xl mx-auto"
					>
						<Modal.Header />
						<Modal.Body>
							<div className="text-center">
								<HiOutlineExclamationCircle className="h-14 w-14 text-black mb-4 mx-auto" />
								<h3 className="mb-5 text-lg text-black">
									Are you sure you want to delete this booking?<br></br>
									Your Refund amount will be
									<span className="text-2xl text-pink-700 font-bold">
										{refundPrice}
									</span>
								</h3>
								<div className="flex justify-center items-center gap-4">
									<div
										onClick={handleDeletePost}
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
			<div className="flex justify-end  ">
				<div className=" ">
					<div>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={["DateTimePicker"]}>
								<DateTimePicker
									value={
										bookingData.startTime ? dayjs(bookingData.startTime) : null
									}
									onChange={(e) => {
										setBookingData({
											...bookingData,
											startTime: e !== null ? e.toDate() : new Date(),
										});
									}}
									label="Check In Time"
								/>
							</DemoContainer>
						</LocalizationProvider>
					</div>
					<div>
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<DemoContainer components={["DateTimePicker"]}>
								<DateTimePicker
									value={
										bookingData.endTime ? dayjs(bookingData.endTime) : null
									}
									onChange={(e) => {
										setBookingData({
											...bookingData,
											endTime: e !== null ? e.toDate() : new Date(),
										});
									}}
									label="Check Out Time"
								/>
							</DemoContainer>
						</LocalizationProvider>
					</div>
					<div className=" mt-3 mb-2">
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
					<div className="flex flex-row gap-4">
						<Button
							variant="contained"
							onClick={handleSubmit}
							className="text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white py-2 px-4 w-[8rem] mt-5 rounded h-12"
						>
							Filter
						</Button>
						<Button
							variant="contained"
							onClick={handleClear}
							className="text-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:bg-gradient-to-r hover:from-pink-500 hover:via-purple-500 hover:to-indigo-500 text-white py-2 px-4 w-[8rem] mt-5 rounded h-12"
						>
							Clear
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ViewAllBooking;
