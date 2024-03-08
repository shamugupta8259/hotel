/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable react/no-unescaped-entities */
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
	const path = useLocation().pathname;
	return (
		<Navbar expand="lg" className="bg-body-tertiary">
			<Container>
				<Navbar.Brand href="#home">
					<div className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
						Hotel Booking
					</div>
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="me-auto">
						<Link to={"/"}>
							<Nav.Link as={"div"}>View all Bookings</Nav.Link>
						</Link>
						<Link to={"/book"}>
							<Nav.Link as={"div"}>Create Booking</Nav.Link>
						</Link>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
