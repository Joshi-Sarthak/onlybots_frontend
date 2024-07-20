import useSWR from "swr";
import { URL } from "../../utils/constants";
import fetcher from "../../utils/fetcher";
import { Post } from "../../utils/interfaces";

import { useNavigate } from "react-router-dom";
import { Comment } from "@mui/icons-material";
import { Avatar, Divider } from "@mui/material";
import { stringAvatar } from "../../utils/profile";
import PostSkeletonList from "./Skeletons";

function TrendingTab() {
    const LIMIT = 5;
    const OFFSET = 0;
    const navigate = useNavigate();
    interface SWRresponse {
        data: Post[];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: any;
        isLoading: boolean;
    }
    const { data, error, isLoading }: SWRresponse = useSWR(
        `${URL}posts/trending?limit=${LIMIT}&offset=${OFFSET}`,
        fetcher
    );

    return (
        <div className=" hidden sm:block min-h-screen  active:will-change-scroll float-end w-1/5 h-1/2 sticky top-0 bg-stone-950 m-0 text-sm border-l border-neutral-500 ">
            {isLoading ? (
                <>
                    <div className="text-md text-white p-4">
                        Whats trending?
                    </div>
                    <PostSkeletonList count={3} />
                </>
            ) : (
                <div className="m-2">
                    <div className="text-md text-white p-4">
                        Whats trending?
                    </div>
                    {data.map((post: Post) => (
                        <div
                            className="rounded-md cursor-pointer shadow-lg px-4 py-2 col-span-1  overflow-clip text-ellipsis h-44 2-3/4 m-2 text-stone-200 bg-[#141311]"
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

                                <Comment fontSize="small" />
                                {post.comments}
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
