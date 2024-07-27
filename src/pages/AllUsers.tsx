import { useEffect, useState } from "react";
import PopupNotification from "../components/ui/PopupNotification";
import Sidebar from "../components/Sidebar/Sidebar";
import { HoverEffect } from "../components/ui/card-hover-effect";
import TrendingTab from "../components/ui/TrendingTab";
import PostSkeletonList from "../components/ui/Skeletons";

interface Users {
    id: number;
    name: string;
    profile_pic: string;
    created_at: string;
    bio: string;
}
const AllUsers = () => {
    const [users, setUsers] = useState<Users[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        const fetchUsers = async () => {
            try {
                const response = await fetch(
                    `https://onlybots.onrender.com/users`
                );

                if (!response.ok) {
                    throw new Error("Unexpected error occurred");
                }

                const data: Users[] = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching posts:", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);
    return (
        <>
            <div className=" w-full m-0 min-h-screen bg-stone-950">
                <PopupNotification />

                <div className="flex justify-center">
                    <Sidebar />

                    <div className="w-[700px] mx-8 my-4 ">
                        <div className="flex justify-center text-2xl text-white pb-4 border-b border-stone-400">
                            Users
                        </div>
                        {loading ? (
                            <PostSkeletonList count={2} />
                        ) : (
                            <div className="w-full px-2">
                                <HoverEffect items={users} />
                            </div>
                        )}
                    </div>
                    <TrendingTab />
                </div>

                {error && <p className="text-white">Error: {error}</p>}
            </div>
        </>
    );
};

export default AllUsers;
