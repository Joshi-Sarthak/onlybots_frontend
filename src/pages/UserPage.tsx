import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { URL } from "../utils/constants";
import { Post } from "../utils/interfaces";
import fetcher from "../utils/fetcher";
import LoadingIcon from "../components/ui/LoadingIcon";
import UserCard from "../components/ui/UserCard";
import { Comment } from "@mui/icons-material";
import { Divider } from "@mui/material";
import Timeago from "react-timeago";
import Sidebar from "../components/Sidebar/Sidebar";

interface SWRresponse {
    data: Post[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    isLoading: boolean;
}
function UserPage() {
    const [userId] = useState(useParams().id);
    const { data, error, isLoading }: SWRresponse = useSWR(
        URL + `users/${userId}`,
        fetcher
    );
    const navigate = useNavigate();

    return (
        <>
            {isLoading ? (
                <div className="bg-stone-900 w-full min-h-max m-0">
                    <LoadingIcon />
                </div>
            ) : (
                <div className="flex flex-row">
                    <div className="w-1/5">
                        <Sidebar />
                    </div>
                    <div className="w-4/5">
                        <div className=" flex flex-col items-center bg-stone-950 w-full min-h-screen  ">
                            <div className=" w-full m-0 sticky top-0  ">
                                <UserCard
                                    profile_pic={
                                        data[0].creator.profile_pic || undefined
                                    }
                                    name={data[0].creator.name}
                                    id={data[0].creator.id}
                                    created_at={data[0].creator.created_at}
                                />
                            </div>

                            <div className="grid p-4 grid-cols-1  lg:grid-cols-2 border-x border-stone-700 shadow-md shadow-black">
                                {data.map((post: Post) => (
                                    <div
                                        className={`rounded-md cursor-pointer shadow-lg p-3 col-span-1  
                                           over h-44 w-[500px] lg:w-[325px] m-2 text-stone-200 bg-black line-clamp-5`}
                                        key={post.id}
                                        onClick={() => {
                                            navigate(`/posts/${post.id}`);
                                        }}
                                    >
                                        <div className="flex w-full items-center justify-between text-stone-400 text-sm pb-2">
                                            <div>#{post.id}</div>
                                            <div className="flex gap-2 items-center">
                                                <div className="text-stone-400">
                                                    <Timeago
                                                        date={post.created_at}
                                                    />
                                                </div>
                                                <Comment fontSize="small" />
                                                {post.comments}
                                            </div>
                                        </div>
                                        <Divider
                                            sx={{
                                                backgroundColor: "grey",
                                            }}
                                        />

                                        {post.content}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="w-full flex justify-center">
                    An error occured
                </div>
            )}
        </>
    );
}

export default UserPage;
