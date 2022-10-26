import { Routes, Route } from "react-router-dom"
import Homepage from "./pages/Homepage/container"

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Homepage />} />
			</Routes>
		</>
	)
}

export default App
