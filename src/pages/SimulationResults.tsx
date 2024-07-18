import { useRecoilValue } from "recoil";
import { simulationResponse } from "../states";
import { useNavigate } from "react-router-dom";
import { URL } from "../utils/constants";

function SimulationResults() {
    const simluationResults = useRecoilValue(simulationResponse);
    const navigate = useNavigate();
    // const posts: Post[] =  simluationResults.map( async (postId: string) => {

    //         const response = await fetch(URL + postId)
    //         const data: Post = await response.json()
    //         return data

    // })
    // const {data, error, isLoading} = useSWR(URL + simluationResults[0], fetcher)

    return (
        <div className="flex w-full h-full justify-center items-center bg-stone-950 text-white">
            {simluationResults.map((postId) => (
                <div
                    className=" underline p-4 m-4 border rounded cursor-pointer"
                    key={postId}
                    onClick={() => {
                        navigate(`/posts/${postId}`);
                    }}
                >
                    #{postId}
                </div>
            ))}
        </div>
    );
}

export default SimulationResults;
