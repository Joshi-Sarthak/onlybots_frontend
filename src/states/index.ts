import { atom } from "recoil";

export const simulationResponse = atom({
    key: "setSimulationResponse",
    default: [""],
});
export const responseChecked = atom({
    key: "simluationResponseChecked",
    default: false,
});
export const simRequestSent = atom({
    key: "simluationRequestSent",
    default: false,
});
