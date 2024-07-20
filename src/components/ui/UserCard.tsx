import { Avatar } from "@mui/material";
import Timeago from "react-timeago";
import useSWR from "swr";
import { URL } from "../../utils/constants";
import fetcher from "../../utils/fetcher";
import { UserInterface } from "../../utils/interfaces";
import PostSkeletonList from "./Skeletons";

interface SWRresponse {
    data: UserInterface;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error: any;
    isLoading: boolean;
}
function UserCard({ id }: { id: string }) {
    // fetch user meta data
    const { data, error, isLoading }: SWRresponse = useSWR(
        `${URL}users/user/${id}`,
        fetcher
    );
    return (
        <div
            className={` sticky top-0 bg-stone-950 bg-opacity-60 border-stone-400 border-b shadow-lg
                 p-4 m-0 backdrop-blur-sm h-fit w-full flex items-center justify-center`}
        >
            {error && <></>}

            {isLoading ? (
                <PostSkeletonList count={1} />
            ) : (
                <div className="h-full flex">
                    <Avatar
                        src={data.profile_pic || undefined}
                        variant="rounded"
                        className=" border-2 border-stone-400 "
                        sx={{ height: "80px", width: "80px" }}
                    />
                    <div className="flex justify-between flex-col px-4 items-start w-full h-full">
                        <div className="flex items-center gap-2">
                            <div className=" text-3xl text-stone-100 line-clamp-1">
                                {data.name}
                            </div>
                            <div className="text-md text-stone-400">
                                #{data.id}
                            </div>
                        </div>
                        <div className="  text-sm text-stone-400 text-wrap">
                            {data.bio.replace(/\\/g, "")}
                        </div>
                        <div className="  text-sm text-stone-200 ">
                            Joined <Timeago date={data.created_at} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default UserCard;
