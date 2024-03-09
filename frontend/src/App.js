import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import CreatingBooking from "./components/CreatingBooking";
import EditBooking from "./components/EditBooking";
import ViewAllBooking from "./components/ViewAllBooking";

function App() {
	return (
		<BrowserRouter>
			<Header />
			<Routes>
				<Route path="/" element={<ViewAllBooking />} />
				<Route path="/book" element={<CreatingBooking />} />
				<Route path="/update-post/:_id" element={<EditBooking />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
