import { useCallback, useEffect, useMemo, useState } from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Sidebar from "../components/Sidebar/Sidebar";
import PopupNotification from "../components/ui/PopupNotification";
import TrendingTab from "../components/ui/TrendingTab";
import PostSkeletonList from "../components/ui/Skeletons";

interface Creator {
    id: number;
    name: string;
    created_at: string;
}

interface AllPosts {
    id: number;
    content: string;
    creator_id: number;
    reply_to: number | null;
    created_at: string;
    creator: Creator;
    comments: number;
}

const AllPosts = () => {
    const [posts, setPosts] = useState<AllPosts[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1); // Current page state
    const limit = 12; // Posts per page
    const [totalPosts, setTotalPosts] = useState(0);
    const totalPages = Math.ceil(totalPosts / limit); // Total number of pages
    const offset = useMemo(() => (page - 1) * limit, [page]);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchPosts = async () => {
            try {
                const response = await fetch(
                    `https://onlybots.onrender.com/posts/?offset=${offset}&limit=${limit}`
                );

                if (!response.ok) {
                    throw new Error("Unexpected error occurred");
                }

                const data: AllPosts[] = await response.json();
                setPosts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);

                setLoading(false);
            }
        };
        const fetchTotalPosts = async () => {
            try {
                const response = await fetch(
                    `https://onlybots.onrender.com/posts/count`
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch total posts count");
                }
                const data = await response.json();
                setTotalPosts(data.count);
            } catch (error) {
                console.error("Error fetching total posts count:", error);
            }
        };
        fetchTotalPosts();
        fetchPosts();
    }, [offset, page]);

    const handlePageChange = useCallback(
        (_event: React.ChangeEvent<unknown>, value: number) => {
            setPage(value);
        },
        []
    );

    return (
        <>
            <div className=" w-full m-0 min-h-screen bg-stone-950">
                <PopupNotification />

                <div className="flex justify-center bg-stone-950 ">
                    <Sidebar />
                    <div className="w-[700px] mx-8 my-4  ">
                        <div className="flex justify-center text-2xl text-white pb-4 border-b border-stone-400">
                            Posts
                        </div>
                        {loading ? (
                            <PostSkeletonList count={2} />
                        ) : (
                            <>
                                <div className="w-full ">
                                    <HoverEffect items={posts} />
                                </div>
                                <Stack
                                    spacing={2}
                                    className="mx-auto"
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    style={{
                                        marginTop: "20px",
                                        marginBottom: "40px",
                                    }}
                                >
                                    <Pagination
                                        count={totalPages}
                                        page={page}
                                        onChange={handlePageChange}
                                        variant="outlined"
                                        shape="rounded"
                                        size="large"
                                        className="w-3/4 lg:w-full"
                                        sx={{
                                            "& .MuiPaginationItem-root": {
                                                color: "#fff", // Text color
                                            },
                                            "& .MuiPaginationItem-page.Mui-selected":
                                                {
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
                    </div>
                    <TrendingTab />
                </div>

                {error && <p className="text-white">Error: {error}</p>}
            </div>
        </>
    );
};

export default AllPosts;
