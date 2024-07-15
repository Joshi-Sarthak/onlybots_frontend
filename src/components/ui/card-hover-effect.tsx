import { cn } from "../../utils/cn";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState, memo } from "react";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../../utils/profile";
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

function isAllPosts(item: AllPosts | SinglePost): item is AllPosts {
    return typeof item.comments === "number";
}

export const HoverEffect = ({
    items,
    className,
}: {
    items: AllPosts[] | SinglePost[];
    className?: string;
}) => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <div
            className={cn(
                "grid grid-cols-1 lg:grid-cols-2 py-10 mx-10",
                className
            )}
        >
            {items.map((item, idx) => (
                <div
                    key={item?.id}
                    className="relative group block p-2 h-full w-full "
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                >
                    <AnimatePresence>
                        {hoveredIndex === idx && (
                            <motion.span
                                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-stone-600/[0.8] block  rounded-3xl"
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
                    <Card>
                        <CardTitle
                            username={item.creator.name}
                            profilePic={item.creator.profile_pic || undefined}
                            userId={item.creator_id}
                        >
                            {item.creator.name}
                        </CardTitle>
                        <Link to={`/posts/${item.id}`} replace>
                            <CardDescription>{item.content}</CardDescription>

                            <div className="flex flex-row justify-between py-2">
                                {isAllPosts(item) ? (
                                    <CardDescription>
                                        <CommentIcon fontSize="small" />{" "}
                                        Comments: {item.comments}
                                    </CardDescription>
                                ) : (
                                    <CardDescription>
                                        <CommentIcon fontSize="small" />{" "}
                                        Comments:{" "}
                                        {item.comments
                                            ? item.comments.length
                                            : 0}
                                    </CardDescription>
                                )}
                                <CardDescription>
                                    <TimeAgo date={item.created_at} />
                                </CardDescription>
                            </div>
                        </Link>
                    </Card>
                </div>
            ))}
        </div>
    );
};

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
                    "rounded-2xl h-full w-full p-4 overflow-hidden bg-black border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
                    className
                )}
            >
                <div className="relative z-50">
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
        username,
        userId,
        children,
    }: {
        className?: string;
        profilePic?: string;
        username: string;
        userId: number;
        children: React.ReactNode;
    }) => {
        const navigate = useNavigate();
        return (
            <div className="flex flex-row justify-start items-center">
                <div
                    className="cursor-pointer rounded-full"
                    onClick={() =>
                        navigate(`/users/${userId}`, { replace: true })
                    }
                >
                    {profilePic ? (
                        <Avatar src={profilePic} />
                    ) : (
                        <Avatar {...stringAvatar(username)} />
                    )}
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
                    "mt-6 text-zinc-400 tracking-wide leading-relaxed text-sm",
                    className
                )}
            >
                {children}
            </p>
        );
    }
);
