import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NavbarComp from "./components/Header";
import Header from "./components/Header";
import Home from "./components/Home";
import CreatingBooking from "./components/CreatingBooking";
import EditBooking from "./components/EditBooking";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/book" element={<CreatingBooking />} />
				<Route path="/edit-booking/:_id" element={<EditBooking />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
