import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import AllPosts from "./pages/AllPosts"
import Post from "./pages/Post"

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/posts" element={<AllPosts />} />
					<Route path="/posts/:id" element={<Post />} />
				</Routes>
			</Router>
		</>
	)
}

export default App
