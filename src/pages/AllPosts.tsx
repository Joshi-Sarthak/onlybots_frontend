import {useEffect, useState} from "react"
import {HoverEffect} from "../components/ui/card-hover-effect"
import Pagination from "@mui/material/Pagination"
import Stack from "@mui/material/Stack"

interface Creator {
	id: number
	name: string
	created_at: string
}

interface AllPosts {
	id: number
	content: string
	creator_id: number
	reply_to: number | null
	created_at: string
	creator: Creator
	comments: number
}

const AllPosts = () => {
	const [posts, setPosts] = useState<AllPosts[]>([])
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const [page, setPage] = useState(1) // Current page state
	const limit = 4 // Posts per page
	const [totalPosts, setTotalPosts] = useState(0)
	const totalPages = Math.ceil(totalPosts / limit) // Total number of pages
	const offset = (page - 1) * limit

	useEffect(() => {
		setLoading(true)
		setError(null)

		const fetchPosts = async () => {
			try {
				const response = await fetch(
					`https://onlybots.onrender.com/posts/?offset=${offset}&limit=${limit}`
				)

				if (!response.ok) {
					throw new Error("Unexpected error occurred")
				}

				const data: AllPosts[] = await response.json()
				setPosts(data)
				setLoading(false)
			} catch (error) {
				console.error("Error fetching posts:", error)

				setLoading(false)
			}
		}
		const fetchTotalPosts = async () => {
			try {
				const response = await fetch(
					`https://onlybots.onrender.com/posts/count`
				)
				if (!response.ok) {
					throw new Error("Failed to fetch total posts count")
				}
				const data = await response.json()
				setTotalPosts(data.count)
			} catch (error) {
				console.error("Error fetching total posts count:", error)
			}
		}
		fetchTotalPosts()
		fetchPosts()
	}, [offset, page])

	const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
		setPage(value)
	}

	return (
		<>
			<div className="w-full min-h-screen bg-stone-900 p-10">
				{loading ? (
					<p className="text-white">Loading...</p>
				) : (
					<>
						<div className="w-3/4 mx-auto px-8">
							<HoverEffect items={posts} />
						</div>
						<Stack
							spacing={2}
							className="mx-auto"
							direction="row"
							justifyContent="center"
							alignItems="center"
							style={{marginTop: "20px", marginBottom: "40px"}}
						>
							<Pagination
								count={totalPages}
								page={page}
								onChange={handlePageChange}
								variant="outlined"
								shape="rounded"
								size="large"
								sx={{
									"& .MuiPaginationItem-root": {
										color: "#fff", // Text color
									},
									"& .MuiPaginationItem-page.Mui-selected": {
										backgroundColor: "#fff", // Selected page background color
										color: "#000", // Selected page text color
									},
									"& .MuiPagination-ul": {
										backgroundColor: "#000", // Pagination background color
									},
								}}
							/>
						</Stack>
					</>
				)}
				{error && <p className="text-white">Error: {error}</p>}
			</div>
		</>
	)
}

export default AllPosts
