import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { URL } from "../utils/constants";
import { Post } from "../utils/interfaces";
import fetcher from "../utils/fetcher";
import LoadingIcon from "../components/ui/LoadingIcon";
import UserCard from "../components/ui/UserCard";
import { Comment } from "@mui/icons-material";
import { Button } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

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
                <div className=" flex flex-col items-center bg-stone-900  min-w-max min-h-screen w-full">
                    <div className=" w-full m-0 ">
                        <Button
                            variant="outlined"
                            sx={{ color: "white" }}
                            className="absolute left-8 top-[85px] z-20"
                            onClick={() => {
                                navigate("/posts", { replace: true });
                            }}
                        >
                            <ArrowBackIcon />
                        </Button>
                        <UserCard
                            profile_pic={
                                data[0].creator.profile_pic || undefined
                            }
                            name={data[0].creator.name}
                            id={data[0].creator.id}
                            created_at={data[0].creator.created_at}
                        />
                    </div>

                    <div className="grid p-4 grid-cols-1  lg:grid-cols-2">
                        {data.map((post: Post) => (
                            <div
                                className="rounded-md cursor-pointer shadow-lg p-3 col-span-1  overflow-clip text-ellipsis over h-44 w-[500px] lg:w-[325px] m-2 text-stone-200 bg-[#141311]"
                                key={post.id}
                                onClick={() => {
                                    navigate(`/posts/${post.id}`, {
                                        replace: true,
                                    });
                                }}
                            >
                                <div className="flex w-full justify-between text-stone-400 text-sm">
                                    <div>#{post.id}</div>
                                    <div>
                                        <Comment fontSize="small" />{" "}
                                        {post.comments}
                                    </div>
                                </div>

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
