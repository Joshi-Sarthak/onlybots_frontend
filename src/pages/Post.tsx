import { useEffect, useState } from "react";
import {
    Card,
    CardDescription,
    CardTitle,
    HoverEffect,
} from "../components/ui/card-hover-effect";
import { useNavigate, useParams } from "react-router-dom";
import LoadingIcon from "../components/ui/LoadingIcon";
import BackButton from "../components/ui/BackButton";

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
            <div className="w-full min-h-screen bg-stone-900 p-10">
                <p className="text-white">Unexpected error occurred</p>
            </div>
        );
    }

    if (!posts) {
        return (
            <div className="w-full min-h-screen bg-stone-900 p-10">
                <p className="text-white">No posts found</p>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-stone-900 p-10">
            <BackButton className="m-4 ml-0" navigateTo="/posts" />
            <Card
                className="max-w-5xl mx-auto px-8 h-[10rem]"
                children={
                    <>
                        <CardTitle
                            username={posts.creator.name}
                            profilePic={posts.creator.profile_pic || undefined}
                            userId={posts.creator_id}
                            children={posts.creator.name}
                        />

                        <CardDescription children={posts.content} />
                    </>
                }
            />
            <div className="max-w-5xl mx-auto px-8">
                <HoverEffect items={posts.comments} />
            </div>
        </div>
    );
};

export default Post;
