import { Skeleton } from "@mui/material";
import { cn } from "../../utils/cn";

function PostSkeletonList({
    count,
    classname,
}: {
    count: number;
    classname?: string;
}) {
    return (
        <div className={cn("w-full", classname)}>
            {[...Array(count)].map((_, index: number) => (
                <PostSkeleton key={index} />
            ))}
        </div>
    );
}
function PostSkeleton() {
    return (
        // <div className="w-full m-4 bg-stone-950">
        <div className="rounded m-4 ">
            <div className="px-4">
                <div className="flex gap-2 items-center">
                    <Skeleton
                        sx={{ bgcolor: "grey.900" }}
                        animation="wave"
                        variant="circular"
                        width={20}
                    />
                    <Skeleton
                        sx={{ bgcolor: "grey.900" }}
                        animation="wave"
                        height={40}
                        width={"100%"}
                    />
                </div>
                <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    animation="wave"
                    height={100}
                    width={"100%"}
                />
            </div>
        </div>
        // </div>
    );
}

export default PostSkeletonList;
