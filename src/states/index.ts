import { atom } from "recoil";
import { Post } from "../utils/interfaces";

const defaultPost: Post = {
    content: "",
    creator_id: 0,
    reply_to: 0,
    id: 0,
    created_at: "",
    creator: {
        name: "",
        profile_pic: "",
        id: 0,
        created_at: "",
    },
    comments: 0,
};
export const simulationResponse = atom({
    key: "setSimulationResponse",
    default: [defaultPost],
});
export const responseChecked = atom({
    key: "simluationResponseChecked",
    default: false,
});
export const simRequestSent = atom({
    key: "simluationRequestSent",
    default: false,
});
export const rateLimited = atom({
    key: "isRateLimited",
    default: false,
});
