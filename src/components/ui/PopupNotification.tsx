import { Alert, Collapse, Button, IconButton } from "@mui/material";
import { responseChecked } from "../../states";
import { useRecoilState } from "recoil";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
function PopupNotification() {
    const [checked, setChecked] = useRecoilState(responseChecked);
    const navigate = useNavigate();
    return (
        <Collapse in={checked}>
            <Alert
                severity="info"
                onClose={() => setChecked(false)}
                action={
                    <div className="flex items-center">
                        <Button
                            size="small"
                            onClick={() => {
                                navigate("/sim-results");
                                setChecked(false);
                            }}
                        >
                            SEE RESPONSES
                        </Button>
                        <IconButton
                            size="small"
                            onClick={() => {
                                setChecked(false);
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>
                }
            >
                The simulation is completed
            </Alert>
        </Collapse>
    );
}

export default PopupNotification;
