import { useEffect, useState } from "react";
import LoadingIcon from "../components/ui/LoadingIcon";
import PopupNotification from "../components/ui/PopupNotification";
import Sidebar from "../components/Sidebar/Sidebar";
import { HoverEffect } from "../components/ui/card-hover-effect";

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
            <div className=" w-full m-0 min-h-screen bg-stone-900">
                <PopupNotification />
                {loading ? (
                    <LoadingIcon />
                ) : (
                    <div className="flex justify-center">
                        <Sidebar />

                        <div className="w-full sm:w-4/5  mb-20">
                            <div className="w-full px-2">
                                <HoverEffect items={users} />
                            </div>
                        </div>
                    </div>
                )}
                {error && <p className="text-white">Error: {error}</p>}
            </div>
        </>
    );
};

export default AllUsers;
