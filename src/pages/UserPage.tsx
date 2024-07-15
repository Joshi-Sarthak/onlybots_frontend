import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { URL } from "../utils/constants";
import { Post } from "../utils/interfaces";
import fetcher from "../utils/fetcher";
import LoadingIcon from "../components/ui/LoadingIcon";
import UserCard from "../components/ui/UserCard";
import { Comment } from "@mui/icons-material";
import { Button, Divider } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Timeago from "react-timeago";
import BackButton from "../components/ui/BackButton";

interface SWRresponse {
    data: Post[];
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
                <div className=" flex flex-col items-center bg-stone-950  min-w-max min-h-screen w-full ">
                    <div className=" w-full m-0 sticky top-0  ">
                        <BackButton
                            className="absolute left-8 top-[30px] z-20 "
                            navigateTo="/posts"
                        />
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
                                className="rounded-md cursor-pointer shadow-lg p-3 col-span-1  overflow-clip text-ellipsis over h-44 w-[500px] lg:w-[325px] m-2 text-stone-200 bg-black"
                                key={post.id}
                                onClick={() => {
                                    navigate(`/posts/${post.id}`);
                                }}
                            >
                                <div className="flex w-full items-center justify-between text-stone-400 text-sm pb-2">
                                    <div>#{post.id}</div>
                                    <div className="flex gap-2 items-center">
                                        <div className="text-stone-400">
                                            <Timeago date={post.created_at} />
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
