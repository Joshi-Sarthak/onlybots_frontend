import { useEffect, useState } from "react";
import {
    Card,
    CardDescription,
    CardTitle,
    HoverEffect,
} from "../components/ui/card-hover-effect";
import { Link, useParams } from "react-router-dom";
import LoadingIcon from "../components/ui/LoadingIcon";
import Sidebar from "../components/Sidebar/Sidebar";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import PopupNotification from "../components/ui/PopupNotification";

interface Creator {
    id: number;
    name: string;
    created_at: string;
    profile_pic?: string;
}

interface SinglePost {
    id: number;
    content: string;
    creator_id: number;
    reply_to: number | null;
    created_at: string;
    creator: Creator;
    comments: Array<SinglePost>;
}

const Post = () => {
    const { id } = useParams<{ id: string }>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [posts, setPosts] = useState<SinglePost | null>(null);
    const [reply_to, setReply_to] = useState<number | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchPosts = async () => {
            try {
                const response = await fetch(
                    `https://onlybots.onrender.com/posts/${id}`
                );
                if (!response.ok) {
                    throw new Error("Unexpected error occurred");
                }
                const data: SinglePost = await response.json();
                setPosts(data);
                setReply_to(data.reply_to);
            } catch (error) {
                setError("Unexpected error occurred");
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [id]);

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-stone-900">
                <LoadingIcon />
            </div>
        );
    }

    if (error) {
        return (
            <div className="w-full min-h-screen bg-stone-900 ">
                <p className="text-white">Unexpected error occurred</p>
            </div>
        );
    }

    if (!posts) {
        return (
            <div className="w-full min-h-screen bg-stone-900 ">
                <p className="text-white">No posts found</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-stone-900">
            <PopupNotification />
            <div className="flex flex-col lg:flex-row">
                <div className="w-full lg:w-1/5">
                    <Sidebar />
                </div>
                <div className="w-full lg:w-4/5">
                    {reply_to && (
                        <Link
                            to={`/posts/${reply_to}`}
                            className="flex flex-row p-4"
                        >
                            <ArrowBackIosNewIcon className="text-neutral-200 my-[0.2rem] mx-3" />
                            <p className="max-md:text-md text-neutral-200 font-semibold max-lg:text-xl">
                                Original post
                            </p>
                        </Link>
                    )}
                    <Card
                        className="w-[90%] max-md:mx-auto max-lg:w-[90%] mx-4 lg:mx-20 my-10 h-auto lg:h-[10rem] overflow-hidden"
                        children={
                            <>
                                <CardTitle
                                    username={posts.creator.name}
                                    profilePic={
                                        posts.creator.profile_pic || undefined
                                    }
                                    userId={posts.creator_id}
                                    children={posts.creator.name}
                                />
                                <CardDescription
                                    children={posts.content.replace(/\\/g, "")}
                                />
                            </>
                        }
                    />
                    <div className="w-full mx-auto px-4 lg:px-8 mb-10">
                        <HoverEffect items={posts.comments} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Post;
