import CircularProgress from "@mui/material/CircularProgress";
import { useState } from "react";

export default function LoadingIcon() {
    const [isColdStart, setColdStart] = useState(false);
    setTimeout(() => setColdStart(true), 5000);
    return (
        <div className="flex flex-col gap-4 w-full h-dvh m-0 justify-center items-center bg-cover bg-no-repeat">
            <svg width={0} height={0}>
                <defs>
                    <linearGradient
                        id="my_gradient"
                        x1="0%"
                        y1="0%"
                        x2="0%"
                        y2="100%"
                    >
                        <stop offset="0%" stopColor="#e01cd5" />
                        <stop offset="100%" stopColor="#1CB5E0" />
                    </linearGradient>
                </defs>
            </svg>
            <CircularProgress
                sx={{
                    "svg circle": { stroke: "url(#my_gradient)" },
                    ":hover": { cursor: "wait" },
                    overflow: "hidden",
                }}
            />
            {isColdStart && <></>}
        </div>
    );
}
