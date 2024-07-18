import { useRecoilValue } from "recoil";
import { simulationResponse } from "../states";
import { Post } from "../utils/interfaces";
import PostCard2 from "../components/ui/PostCard2";
import { CardTitle } from "../components/ui/card-hover-effect";

function SimulationResults() {
    const simluationResults = useRecoilValue(simulationResponse);
    return (
        <div className="grid grid-cols-1 justify-items-center w-full min-h-screen bg-stone-950">
            <div className="w-full text-2xl text-center text-white p-4 border-b border-stone-600">
                New Responses
            </div>
            {simluationResults.map((post: Post) => {
                console.log(post);
                return (
                    <PostCard2
                        post={post}
                        key={post.id}
                        classname="col-span-1 w-1/2"
                    >
                        <CardTitle
                            username={post.creator.name}
                            userId={post.creator.id}
                            profilePic={post.creator.profile_pic || undefined}
                        >
                            {post.creator.name}
                        </CardTitle>
                    </PostCard2>
                );
            })}
        </div>
    );
}

export default SimulationResults;
