import  {BrowserRouter as Router, Routes, Route}  from "react-router-dom"
import React, {Suspense} from "react"
const AllPosts = React.lazy(() => import("./pages/AllPosts")) 
const Post = React.lazy(() => import("./pages/Post")) 
const LandingPage = React.lazy(() => import("./pages/LandingPage")) 
// import AllPosts from "./pages/AllPosts"
// import Post from "./pages/Post"
import LoadingIcon from "./components/ui/LoadingIcon"

function App() {
	return (
		<>
			<Router>
				<Routes>
					<Route path="/" element={
						<Suspense fallback={<LoadingIcon />}>
							<LandingPage />
						</Suspense>
					} />
					<Route path="/posts" element={
						<Suspense fallback={<LoadingIcon />}>
							<AllPosts />
						</Suspense>
					} />
					<Route path="/posts/:id" element={
						<Suspense fallback={<LoadingIcon />}>
							<Post />
						</Suspense>
					} />
				</Routes>
			</Router>
		</>
	)
}

export default App
