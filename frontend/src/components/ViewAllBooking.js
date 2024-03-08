/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import { Button, Modal, Table, TableRow } from "flowbite-react";
import Alert from "@mui/material/Alert";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

import {
	HiArrowSmRight,
	HiChartPie,
	HiInbox,
	HiShoppingBag,
	HiTable,
	HiUser,
	HiViewBoards,
} from "react-icons/hi";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { MenuItem } from "@mui/material";
import dayjs from "dayjs";
import moment from "moment/moment";

const ViewAllBooking = () => {
	const totalRooms = { A: [1, 2], B: [1, 2, 3], C: [1, 2, 3, 4, 5] };
	const [roomArray, setRoomArray] = useState();
	const perRoomPrice = {
		A: 100,
		B: 80,
		C: 50,
	};
	const [bookingData, setBookingData] = useState({
		email: "",
		startTime: null,
		endTime: null,
		roomType: "",
		roomNumber: "",
	});
	const [showMore, setShowMore] = useState(false);
	const [booking, setBooking] = useState(true);
	const [showModal, setShowModal] = useState(false);
	const [bookIdToDelete, setBookIdToDelete] = useState("");
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
			console.log("i am in fetching posts");
			const res = await fetch(
				`http://localhost:5005/api/booking/viewallbook?startTime=${bookingData.startTime}&endTime=${bookingData.endTime}&roomNumber=${bookingData.roomNumber}&roomType=${bookingData.roomType}`,
				{
					method: "GET",
				}
			);
			const data = await res.json();
			console.log(data);
			if (res.ok) {
				setBooking(data);
			}
			// console.log(data);
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		fetchPosts();
		setShowMore(false);
	}, [showMore]);
	const handleDeleteModal = () => {
		setRefundPrice(0);
		const timeDifferenceInMilliseconds =
			new Date() - new Date(bookIdToDelete.updatedAt);
		const timeDifferenceInHours =
			timeDifferenceInMilliseconds / (1000 * 60 * 60);
		if (timeDifferenceInHours.toFixed(0) > 48) {
			setRefundPrice(bookIdToDelete.price);
		} else if (
			timeDifferenceInHours.toFixed(0) < 48 &&
			timeDifferenceInHours.toFixed(0) > 24
		) {
			setRefundPrice(bookIdToDelete.price / 2);
		} else {
			setRefundPrice(0);
		}
	};

	const handleDeletePost = async () => {
		handleDeleteModal();
		// setRefundPrice(0);
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
		} catch (error) {}
		// const refundAmount
	};
	const handleSubmit = async () => {
		console.log(bookingData);
		setBookingData({
			...bookingData,
			startTime: bookingData.startTime,
			endTime: bookingData.endTime,
			roomNumber:
				bookingData.roomNumber === undefined ? "" : bookingData.roomNumber,
			roomType: bookingData.roomType === undefined ? "" : bookingData.roomType,
		});
		console.log(bookingData);

		const res = await fetch(
			`http://localhost:5005/api/booking/viewallbook?startTime=${bookingData.startTime}&endTime=${bookingData.endTime}&roomNumber=${bookingData.roomNumber}&roomType=${bookingData.roomType}`,
			{
				method: "GET",
			}
		);
		const data = await res.json();
		console.log(data);
		if (res.ok) {
			setBooking(data);
		}

		console.log(data);
	};
	const handleClear = () => {
		setShowMore(true);
		fetchPosts();
	};
	console.log(booking);
	return (
		<div className="flex flex-row">
			<div className="w-[79%]   table-auto overflow-x-scroll p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300">
				{booking && booking.length > 0 ? (
					<>
						<Table hoverable className="shadow-md">
							<Table.Head>
								<Table.HeadCell>Created At</Table.HeadCell>
								<Table.HeadCell>Room Type</Table.HeadCell>
								<Table.HeadCell>Room Number</Table.HeadCell>
								<Table.HeadCell>Check In Time</Table.HeadCell>
								<Table.HeadCell>Check Out Time</Table.HeadCell>
								<Table.HeadCell>Delete</Table.HeadCell>
								<Table.HeadCell>Edit</Table.HeadCell>
							</Table.Head>
							{booking.map((post) => (
								<Table.Body className="divide-y" key={post._id}>
									<Table.Row className="bg-white border-gray-700">
										<Table.Cell>
											{new Date(post.updatedAt).toLocaleDateString()}
										</Table.Cell>
										<Table.Cell>{post.roomType}</Table.Cell>
										<Table.Cell>{post.roomNumber}</Table.Cell>
										<Table.Cell>{post.startTime}</Table.Cell>
										<Table.Cell>{post.endTime}</Table.Cell>
										<Table.Cell>
											<span
												onClick={() => {
													setBookIdToDelete(post);
													setShowModal(true);
												}}
												className="font-medium text-red-500 hover:underline cursor-pointer"
											>
												Delete
											</span>
										</Table.Cell>
										<Table.Cell>
											<Link
												className="text-teal-500 hover:underline"
												to={`/update-post/${post._id}`}
											>
												Edit
											</Link>
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
									Are you sure you want to delete this post? Your Refund amount
									will be {bookIdToDelete.price}
								</h3>
								<div className="flex justify-center items-center gap-4">
									{/* <Button color="failure"> */}
									<div
										onClick={handleDeletePost}
										className="text-white hover:cursor-pointer bg-red-700 rounded text-center flex items-center justify-center hover:bg-red-500 border-2 w-48 h-12"
									>
										Yes, I'm sure
									</div>
									{/* </Button> */}
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
											startTime: e !== null ? e.toISOString() : new Date(),
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
											endTime: e !== null ? e.toISOString() : new Date(),
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
