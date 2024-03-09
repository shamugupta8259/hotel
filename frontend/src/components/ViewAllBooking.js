/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import { Button, Box, Modal, Table, TableRow } from "flowbite-react";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MenuItem } from "@mui/material";
import dayjs from "dayjs";
import { Spinner } from "flowbite-react";

import { Sidebar } from "flowbite-react";
import {
	HiArrowSmRight,
	HiChartPie,
	HiInbox,
	HiShoppingBag,
	HiTable,
	HiUser,
} from "react-icons/hi";

const ViewAllBooking = () => {
	const totalRooms = { A: [1, 2], B: [1, 2, 3], C: [1, 2, 3, 4, 5] };
	const [spinner, setSpinner] = useState(false);
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
			setSpinner(true);
			const res = await fetch(
				`https://hotel-production.up.railway.app/api/booking/viewallbook?startTime=${bookingData.startTime}&endTime=${bookingData.endTime}&roomNumber=${bookingData.roomNumber}&roomType=${bookingData.roomType}`,
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
			setSpinner(false);
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
				`https://hotel-production.up.railway.app/api/booking/delete/${bookIdToDelete._id}`,
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
				`https://hotel-production.up.railway.app/api/booking/viewallbook?startTime=${bookingData.startTime}&endTime=${bookingData.endTime}&roomNumber=${bookingData.roomNumber}&roomType=${bookingData.roomType}`,
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

	return (
		<div className={`flex flex-row ${showModal ? "opacity-50" : ""}`}>
			{spinner && (
				<div className="flex justify-center items-center">
					<Spinner />
				</div>
			)}
			<div className="w-[80%] ">
				<div className="table-auto">
					{booking && booking.length > 0 ? (
						<>
							<div className="container mx-auto">
								<table className="table w-full shadow-md">
									<thead className="text-lg text-gray-700">
										<tr>
											<th>Created At</th>
											<th>Room Type</th>
											<th>Room Number</th>
											<th>Check In Date</th>
											<th>Check Out Date</th>
											<th>Booking Price</th>
											<th>Delete</th>
											<th>Edit</th>
										</tr>
									</thead>
									<tbody>
										{booking.map((post) => (
											<tr
												className="bg-white border-gray-200 text-gray-700"
												key={post._id}
											>
												<td>{new Date(post.updatedAt).toLocaleDateString()}</td>
												<td>{post.roomType}</td>
												<td>{post.roomNumber}</td>
												<td>
													{new Date(post.startTime).toLocaleDateString("en-GB")}
												</td>
												<td>
													{new Date(post.endTime).toLocaleDateString("en-GB")}
												</td>
												<td>
													<span
														className={`${
															new Date(post.endTime) < new Date()
																? "text-sky-800"
																: "text-green-600"
														}`}
													>
														<div className="font-semibold font-mono italic">
															{post.price}
														</div>
														{new Date(post.endTime) < new Date() ? (
															<div className="text-xs text-red-500">
																Booking Completed
															</div>
														) : (
															<div className="text-xs text-blue-500">
																Booking
															</div>
														)}
													</span>
												</td>
												<td>
													<span
														onClick={() => {
															postToBeDeleted = post;
															handleDeleteMessage(post);
														}}
														className="font-medium text-red-500 hover:underline cursor-pointer"
													>
														Delete
													</span>
												</td>
												<td>
													<div className="text-teal-500">
														{new Date(post.startTime) < new Date() ||
														new Date(post.endTime) < new Date() ? (
															<div className="text-gray-600 flex-wrap w-[5.5rem] h-12">
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
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</>
					) : (
						<p>You have no posts yet!</p>
					)}
				</div>
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
			<div className=" right-0 z-100 bg-white flex flex-col fixed">
				<div className="">
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
								Select
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
							<MenuItem key="Select Room Number " className="w-[20%]" value="0">
								Select Room
							</MenuItem>
							{roomArray &&
								roomArray.map((option) => (
									<MenuItem key={option} value={option}>
										{option}
									</MenuItem>
								))}
						</TextField>

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
		</div>
	);
};

export default ViewAllBooking;
