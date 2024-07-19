import { Post } from "../../utils/interfaces";
import { useNavigate } from "react-router-dom";
import Timeago from "react-timeago";
import { Comment } from "@mui/icons-material";
import { Divider } from "@mui/material";
import { cn } from "../../utils/cn";
import React from "react";
function PostCard2({
    classname,
    post,
    children,
}: {
    classname?: string;
    post: Post;
    children?: React.ReactNode;
}) {
    const navigate = useNavigate();
    return (
        <div
            className={cn(
                `rounded-md cursor-pointer shadow-lg p-4 col-span-1  
                       h-48 w-full m-2 text-stone-200 bg-black line-clamp-5`,
                classname
            )}
            onClick={() => {
                navigate(`/posts/${post.id}`);
            }}
        >
            {children}
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
    );
}

export default PostCard2;
