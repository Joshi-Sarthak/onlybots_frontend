import { Post } from "../utils/interfaces";
import useSWR from "swr";
import fetcher from "../utils/fetcher";
import { HoverEffect } from "../components/ui/card-hover-effect";
import PostSkeletonList from "../components/ui/Skeletons";
import { URL } from "../utils/constants";
import Sidebar from "../components/Sidebar/Sidebar";
import PopupNotification from "../components/ui/PopupNotification";

function TopPosts() {
    const LIMIT = 15;
    const OFFSET = 0;
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
        <>
            <PopupNotification />
            <div className="w-full min-h-screen flex justify-center bg-stone-950  ">
                <Sidebar />
                {!isLoading && console.log(data)}
                {error && (
                    <div className="w-full min-h-screen flex justify-center">
                        Unexpected error occured
                    </div>
                )}
                {isLoading ? (
                    <>
                        <PostSkeletonList count={3} />
                    </>
                ) : (
                    <div className="w-4/5 flex flex-col justify-center m-3">
                        <div className="flex justify-center text-2xl text-white pb-4 border-b border-stone-400">
                            Trending
                        </div>

                        <HoverEffect items={data} />
                    </div>
                )}
            </div>
        </>
    );
}

export default TopPosts;
