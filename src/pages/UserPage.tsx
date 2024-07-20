import React, { useState } from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import { URL } from "../utils/constants";
import { Post } from "../utils/interfaces";
import fetcher from "../utils/fetcher";
import LoadingIcon from "../components/ui/LoadingIcon";

const UserCard = React.lazy(() => import("../components/ui/UserCard"));
// import UserCard from "../components/ui/UserCard";
const Sidebar = React.lazy(() => import("../components/Sidebar/Sidebar"));
// import Sidebar from "../components/Sidebar/Sidebar";
const TrendingTab = React.lazy(() => import("../components/ui/TrendingTab"));
// import TrendingTab from "../components/ui/TrendingTab";
const PostCard2 = React.lazy(() => import("../components/ui/PostCard2"));
// import PostCard2 from "../components/ui/PostCard2";

interface SWRresponse {
    data: Post[];
    error: unknown;
    isLoading: boolean;
}
function UserPage() {
    const [userId] = useState(useParams().id || "");

    // fetch all posts of a particular user
    const { data, error, isLoading }: SWRresponse = useSWR(
        URL + `users/${userId}`,
        fetcher
    );

    return (
        <>
            <div className="flex justify-center bg-stone-950 z-50">
                <Sidebar />

                <div className="w-[500px] max-w-[600px] min-w-[300px] bg-stone-900 flex m-4">
                    <div className=" flex flex-col items-center  w-full min-h-screen  ">
                        <div className=" w-full m-0 sticky top-0  ">
                            <UserCard id={userId} />
                        </div>
                        {isLoading ? (
                            <div className="bg-stone-900 w-full min-h-screen m-0">
                                <LoadingIcon />
                            </div>
                        ) : (
                            <div className="grid p-4 grid-cols-1 gap-2 justify-items-center  border-stone-700 shadow-md shadow-black">
                                {data.map((post: Post) => (
                                    <PostCard2 post={post} key={post.id} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                <TrendingTab />
            </div>

            {error && (
                <div className="w-full flex justify-center">
                    An error occured
                </div>
            )}
        </>
    );
}

export default UserPage;
