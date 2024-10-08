import { cn } from "../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, memo } from "react";
import TimeAgo from "react-timeago";
import CommentIcon from "@mui/icons-material/Comment";

interface Creator {
    id: number;
    name: string;
    created_at: string;
    profile_pic?: string;
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

interface SinglePost {
    id: number;
    content: string;
    creator_id: number;
    reply_to: number | null;
    created_at: string;
    creator: Creator;
    comments: Array<SinglePost>;
}

interface Users {
    id: number;
    name: string;
    profile_pic: string;
    created_at: string;
    bio: string;
}

function isAllPosts(item: AllPosts | SinglePost): item is AllPosts {
    return typeof item.comments === "number";
}

function isUsers(item: AllPosts | SinglePost | Users): item is Users {
    return (item as Users).name !== undefined;
}

export const HoverEffect = ({
    items,
    className,
}: {
    items: AllPosts[] | SinglePost[] | Users[];
    className?: string;
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "grid grid-cols-1 lg:grid-cols-2 py-4 mx-4",
                className
            )}
        >
            {items.map((item, idx) => (
                <div
                    key={item?.id}
                    className="sm:relative group block p-2 h-full w-full "
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="hidden sm:block absolute inset-0 h-full w-full bg-neutral-200 dark:bg-stone-600/[0.8]  rounded-3xl"
                                layoutId="hoverBackground"
                                initial={{ opacity: 0 }}
                                animate={{
                                    opacity: 1,
                                    transition: { duration: 0.15 },
                                }}
                                exit={{
                                    opacity: 0,
                                    transition: { duration: 0.15, delay: 0.2 },
                                }}
                            />
                        )}
                    </AnimatePresence>
                    {isUsers(item) ? (
                        <UserCard user={item} />
                    ) : (
                        <PostCard post={item} />
                    )}
                </div>
            ))}
        </div>
    );
};

export const PostCard = memo(({ post }: { post: AllPosts | SinglePost }) => {
    const content: string = post.content.replace(/\\/g, "");

    return (
        <Card>
            <CardTitle
                username={post.creator.name}
                profilePic={post.creator.profile_pic || undefined}
                userId={post.creator_id}
            >
                {post.creator.name}
            </CardTitle>
            <Link to={`/posts/${post.id}`}>
                <CardDescription>{`${content}`}</CardDescription>

                <div className="flex flex-row justify-between py-2">
                    {isAllPosts(post) ? (
                        <CardDescription>
                            <CommentIcon fontSize="small" /> {post.comments}
                        </CardDescription>
                    ) : (
                        <CardDescription>
                            <CommentIcon fontSize="small" />{" "}
                            {post.comments ? post.comments.length : 0}
                        </CardDescription>
                    )}
                    <CardDescription>
                        <TimeAgo date={post.created_at} />
                    </CardDescription>
                </div>
            </Link>
        </Card>
    );
});

export const UserCard = memo(({ user }: { user: Users }) => (
    <Card>
        <Link to={`/users/${user.id}`}>
            <CardTitle
                username={user.name}
                profilePic={user.profile_pic || undefined}
                userId={user.id}
            >
                {user.name}
            </CardTitle>
            <CardDescription>{user.bio}</CardDescription>
            <CardDescription>
                Joined: <TimeAgo date={user.created_at} />
            </CardDescription>
        </Link>
    </Card>
));

export const Card = memo(
    ({
        className,
        children,
    }: {
        className?: string;
        children: React.ReactNode;
    }) => {
        return (
            <div
                className={cn(
                    "rounded-2xl h-full w-full p-4  bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 sm:relative z-20",
                    className
                )}
            >
                <div className="sm:relative z-50">
                    <div className="p-4">{children}</div>
                </div>
            </div>
        );
    }
);
export const CardTitle = memo(
    ({
        className,
        profilePic,
        userId,
        children,
    }: {
        className?: string;
        profilePic?: string;
        username: string;
        userId: number;
        children?: React.ReactNode;
    }) => {
        const navigate = useNavigate();
        return (
            <div className="flex flex-row justify-start items-center">
                <div
                    className="cursor-pointer rounded-full"
                    onClick={() => navigate(`/users/${userId}`)}
                >
                    <img
                        src={profilePic}
                        className="rounded-full aspect-square w-12"
                    />
                    {/* {profilePic ? (
                    ) : (
                        <img {...stringAvatar(username)} />
                    )} */}
                </div>

                <h4
                    className={cn(
                        "flex items-center justify-center text-zinc-100 font-bold tracking-wide mx-4",
                        className
                    )}
                >
                    {children}
                </h4>
            </div>
        );
    }
);
export const CardDescription = memo(
    ({
        className,
        children,
    }: {
        className?: string;
        children: React.ReactNode;
    }) => {
        return (
            <p
                className={cn(
                    "mt-6 text-zinc-200 tracking-wide leading-relaxed text-sm",
                    className
                )}
            >
                {children}
            </p>
        );
    }
);
