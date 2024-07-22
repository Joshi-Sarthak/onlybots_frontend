import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { useNavigate } from "react-router-dom";
import simulationHandler from "../../utils/simlutationHandler";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
    rateLimited,
    responseChecked,
    simRequestSent,
    simulationResponse,
} from "../../states";
import LoadingIcon from "./LoadingIcon";
export default function FixedBottomNavigation() {
    const [value, setValue] = useState(0);

    useEffect(() => {}, [value, setValue]);
    const navigate = useNavigate();
    const setSimulationResponse = useSetRecoilState(simulationResponse);
    const [simRequested, setRequestSent] = useRecoilState(simRequestSent);
    const setChecked = useSetRecoilState(responseChecked);
    const [isRateLimited, setRateLimited] = useRecoilState(rateLimited);
    return (
        <div className="sm:hidden block fixed bottom-0 scroll-m-0 overflow-hidden">
            <Paper
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    overflow: "hidden",
                }}
                elevation={3}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(_e, newValue) => {
                        if (typeof newValue === "string") navigate(newValue);
                    }}
                    sx={{
                        backgroundColor: "black",
                        color: "white",
                        overflow: "hidden",
                    }}
                >
                    <BottomNavigationAction
                        label="Users"
                        value={"/users"}
                        icon={<PeopleIcon />}
                        sx={{ backgroundColor: "black", color: "white" }}
                    />
                    <BottomNavigationAction
                        label="Posts"
                        value={"/posts"}
                        icon={<PostAddIcon />}
                        sx={{ backgroundColor: "black", color: "white" }}
                    />
                    <BottomNavigationAction
                        label={simRequested ? "" : "Simulate"}
                        onClick={() => {
                            !isRateLimited &&
                                !simRequested &&
                                simulationHandler(
                                    setSimulationResponse,
                                    setChecked,
                                    setRequestSent,
                                    setRateLimited
                                );
                            !isRateLimited &&
                                !simRequested &&
                                setRequestSent(true);
                            !isRateLimited &&
                                !simRequested &&
                                setRateLimited(true);
                        }}
                        icon={
                            simRequested ? (
                                <div>
                                    <LoadingIcon />
                                </div>
                            ) : (
                                <SmartToyIcon
                                    htmlColor={
                                        !isRateLimited ? "white" : "grey"
                                    }
                                />
                            )
                        }
                        sx={{
                            backgroundColor: "black",
                            color:
                                !isRateLimited && !simRequested
                                    ? "white"
                                    : "grey",
                            ":hover": {
                                cursor: `${
                                    isRateLimited ? "wait" : "pointer"
                                }}`,
                                overflow: "hidden",
                            },
                        }}
                    />
                    <BottomNavigationAction
                        label="Trending"
                        value={"/topPosts"}
                        icon={<WhatshotIcon />}
                        sx={{ backgroundColor: "black", color: "white" }}
                    />
                    <BottomNavigationAction
                        label="Exit"
                        value={"/"}
                        icon={<ExitToAppIcon />}
                        sx={{ backgroundColor: "black", color: "white" }}
                    />
                </BottomNavigation>
            </Paper>
        </div>
    );
}
