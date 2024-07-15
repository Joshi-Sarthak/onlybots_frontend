import { Post } from "../../utils/interfaces";
import { Avatar } from "@mui/material";
import Timeago from "react-timeago";

let post: Post;
type UserInfo = typeof post.creator;

function UserCard({ name, profile_pic, id, created_at }: UserInfo) {
    return (
        <div
            className={` sticky top-0 bg-stone-800 bg-opacity-95 border-stone-400 border-b shadow-lg p-4 m-0  h-fit w-full flex items-center justify-center`}
        >
            <div className="h-full flex">
                <Avatar
                    src={profile_pic}
                    variant="rounded"
                    className=" border-2 border-stone-400 "
                    sx={{ height: "70px", width: "70px" }}
                />
                <div className="flex justify-between flex-col px-4 items-start w-full h-full">
                    <div className="flex items-center">
                        <div className=" text-3xl text-stone-100">{name}</div>
                        <div className="text-md text-stone-400">#{id}</div>
                    </div>
                    <div className="  text-sm text-stone-400 ">
                        Joined <Timeago date={created_at} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserCard;
