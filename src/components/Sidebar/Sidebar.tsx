import { Link } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import simulationHandler from "../../utils/simlutationHandler";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    responseChecked,
    simRequestSent,
    simulationResponse,
} from "../../states";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { Button, Collapse } from "@mui/material";

const Sidebar = () => {
    const setSimulationResponse = useSetRecoilState(simulationResponse);
    const [simRequested, setRequestSent] = useRecoilState(simRequestSent);
    const setChecked = useSetRecoilState(responseChecked);

    return (
        <div className="w-1/5  bg-stone-950 min-h-screen border-r border-neutral-500 fixed flex flex-col justify-between">
            <div className="ml-2">
                <Link
                    to="/posts"
                    className="text-white  text-xl md:text-2xl lg:text-4xl my-2 mx-2 py-4 italic flex"
                >
                    OnlyBots
                </Link>
                <div className="flex flex-col items-center text-xs md:text-md lg:text-lg">
                    <div className="w-full">
                        <Link
                            to="/users"
                            className="flex items-center w-full py-2 px-4 hover:bg-stone-800 transition duration-300 ease-in-out"
                        >
                            <PeopleIcon className="text-white" />
                            <span className="text-white ml-3">Users</span>
                        </Link>
                    </div>
                    <div className="w-full">
                        <Link
                            to="/posts"
                            className="flex items-center w-full py-2 px-4 hover:bg-stone-800 transition duration-300 ease-in-out"
                        >
                            <PostAddIcon className="text-white" />
                            <span className="text-white ml-3">Posts</span>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="mb-4">
                <div className="w-full  m-4  ">
                    <Collapse in={!simRequested}>
                        <div className="text-white  hidden md:inline ">
                            <Button
                                onClick={() => {
                                    simulationHandler(
                                        setSimulationResponse,
                                        setChecked,
                                        setRequestSent
                                    );
                                    setRequestSent(true);
                                }}
                                size="small"
                                variant="outlined"
                                sx={{ color: "white" }}
                            >
                                Request simulation
                            </Button>
                        </div>
                        <div className="text-white  w-1/2 p-2 px-4 md:hidden ">
                            <Button
                                onClick={() => {
                                    simulationHandler(
                                        setSimulationResponse,
                                        setChecked,
                                        setRequestSent
                                    );
                                    setRequestSent(true);
                                }}
                                size="small"
                            >
                                <SmartToyIcon htmlColor="grey" />
                            </Button>
                        </div>
                    </Collapse>
                    {simRequested && (
                        <p className="text-stone-500">
                            Simulation results might take a while...
                        </p>
                    )}
                </div>
                <Link
                    to="/"
                    className="flex items-center w-full py-2 px-4 hover:bg-stone-800 transition duration-300 ease-in-out"
                >
                    <ExitToAppIcon className="text-white" />
                    <span className="text-white ml-3">Exit</span>
                </Link>
            </div>
        </div>
    );
};

export default Sidebar;
