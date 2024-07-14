import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function BackButton({
    className,
    navigateTo,
}: {
    className?: string;
    navigateTo: string;
}) {
    const navigate = useNavigate();
    return (
        <div className={className}>
            <Button
                variant="outlined"
                sx={{ color: "white" }}
                onClick={() => {
                    navigate(`${navigateTo}`, { replace: true });
                }}
            >
                <ArrowBackIcon />
            </Button>
        </div>
    );
}

export default BackButton;
