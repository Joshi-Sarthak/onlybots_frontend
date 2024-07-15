import useSWR from "swr";
import { URL } from "../utils/constants";
import fetcher from "../utils/fetcher";
import { Post } from "../utils/interfaces";
import LoadingIcon from "../components/ui/LoadingIcon";
import { useNavigate } from "react-router-dom";
import Timeago from "react-timeago";
import { Comment } from "@mui/icons-material";
import { Avatar, Divider } from "@mui/material";
import { stringAvatar } from "../utils/profile";

function TrendingTab() {
    const LIMIT = 5;
    const OFFSET = 0;
    const navigate = useNavigate();
    interface SWRresponse {
        data: Post[];
        error: any;
        isLoading: boolean;
    }
    const { data, error, isLoading }: SWRresponse = useSWR(
        `${URL}posts/trending?limit=${LIMIT}&offset=${OFFSET}`,
        fetcher
    );

    return (
        <div>
            {isLoading ? (
                <div className="bg-stone-900">
                    <LoadingIcon />
                </div>
            ) : (
                <div className=" float-end max-w-72 min-w-60 h-1/2 sticky top-4 bg-stone-900 m-0 text-sm">
                    <div className="text-md p-4">Trending posts</div>
                    {data.map((post: Post) => (
                        <div
                            className="rounded-md cursor-pointer shadow-lg p-3 col-span-1  overflow-clip text-ellipsis over h-44 2-3/4 m-2 text-stone-200 bg-[#141311]"
                            key={post.id}
                            onClick={() => {
                                navigate(`/posts/${post.id}`);
                            }}
                        >
                            <div className="flex w-full items-center justify-between text-stone-400 text-sm pb-2">
                                <div className="flex gap-2 ">
                                    {post.creator.profile_pic ? (
                                        <Avatar
                                            src={post.creator.profile_pic}
                                        />
                                    ) : (
                                        <Avatar
                                            {...stringAvatar(post.creator.name)}
                                        />
                                    )}
                                    <div>{post.creator.name}</div>
                                </div>
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
            )}

            {error && (
                <div className="w-full flex justify-center">
                    An error occured
                </div>
            )}
        </div>
    );
}

export default TrendingTab;
