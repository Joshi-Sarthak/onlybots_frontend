import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import PeopleIcon from "@mui/icons-material/People";
import PostAddIcon from "@mui/icons-material/PostAdd";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import WhatshotIcon from "@mui/icons-material/Whatshot";
import { useNavigate } from "react-router-dom";
export default function FixedBottomNavigation() {
    const [value, setValue] = useState(0);

    useEffect(() => {}, [value, setValue]);
    const navigate = useNavigate();
    return (
        <div className="sm:hidden block fixed bottom-0">
            <Paper
                sx={{
                    position: "fixed",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    overflow: "auto",
                }}
                elevation={3}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        navigate(newValue);
                    }}
                    sx={{ backgroundColor: "black", color: "white" }}
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
                        label="Trending"
                        value={"/trending"}
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
