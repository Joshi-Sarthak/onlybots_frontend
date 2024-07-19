import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import simulationHandler from "../../utils/simlutationHandler";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    rateLimited,
    responseChecked,
    simRequestSent,
    simulationResponse,
} from "../../states";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Collapse } from "@mui/material";
import FixedBottomNavigation from "../ui/FixedBottomNavbar";

const Sidebar = () => {
    const setSimulationResponse = useSetRecoilState(simulationResponse);
    const [simRequested, setRequestSent] = useRecoilState(simRequestSent);
    const setChecked = useSetRecoilState(responseChecked);
    const [isRateLimited, setRateLimited] = useRecoilState(rateLimited);

    return (
        <>
            <div className="hidden sm:block w-1/12 sm:w-1/6 md:w-1/5 z-50">
                <div className="flex w-1/12 sm:w-1/6 md:w-1/5  bg-stone-950 min-h-screen border-r border-neutral-500 fixed  flex-col justify-between">
                    <div className="ml-2">
                        <Link
                            to="/posts"
                            className="hidden sm:flex text-white  text-xl md:text-2xl lg:text-4xl my-2 mx-2 py-4 italic "
                        >
                            OnlyBots
                        </Link>
                        <div className="flex flex-col items-center text-xs md:text-md lg:text-lg">
                            <div className="w-full">
                                <Link
                                    to="/users"
                                    className="flex items-center w-full p-1 sm:py-2 sm:px-4 hover:bg-stone-800 transition duration-300 ease-in-out"
                                >
                                    <PeopleIcon className="text-white" />
                                    <span className="hidden sm:inline-block text-white sm:ml-3">
                                        Users
                                    </span>
                                </Link>
                            </div>
                            <div className="w-full">
                                <Link
                                    to="/posts"
                                    className="flex items-center w-full p-1 sm:py-2 sm:px-4 hover:bg-stone-800 transition duration-300 ease-in-out"
                                >
                                    <PostAddIcon className="text-white" />
                                    <span className="hidden sm:inline-block  text-white sm:ml-3">
                                        Posts
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4 ml-2">
                        <div className="w-full">
                            {simRequested && (
                                <p className="text-stone-300 text-wrap p-1 sm:py-2 sm:px-4">
                                    Simulation results might take a while...
                                </p>
                            )}

                            <Collapse in={!simRequested && !isRateLimited}>
                                <div
                                    className="flex items-center w-full p-1 sm:py-2 sm:px-4 hover:bg-stone-800 transition duration-300 ease-in-out"
                                    onClick={() => {
                                        simulationHandler(
                                            setSimulationResponse,
                                            setChecked,
                                            setRequestSent,
                                            setRateLimited
                                        );
                                        setRequestSent(true);
                                        setRateLimited(true);
                                    }}
                                >
                                    <SmartToyIcon htmlColor="white" />
                                    <span className="hidden sm:inline-block text-white sm:ml-3">
                                        Request simulation
                                    </span>
                                </div>
                            </Collapse>
                        </div>
                        <Link
                            to="/"
                            className="flex items-center w-full p-1 sm:py-2 sm:px-4 hover:bg-stone-800 transition duration-300 ease-in-out"
                        >
                            <ExitToAppIcon className="text-white" />
                            <span className="hidden sm:inline-block text-white sm:ml-3">
                                Exit
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <FixedBottomNavigation />
        </>
    );
};

export default Sidebar;
