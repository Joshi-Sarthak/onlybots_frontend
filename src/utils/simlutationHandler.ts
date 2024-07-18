import { SetterOrUpdater } from "recoil";
import { RATE_LIMIT_RPM, URL_AI } from "./constants";
import { Post } from "./interfaces";

export default async function simulationHandler(
    setSimulationResponse: SetterOrUpdater<Post[]>,
    setChecked: SetterOrUpdater<boolean>,
    setRequestSent: SetterOrUpdater<boolean>,
    setRateLimited: SetterOrUpdater<boolean>
) {
    const response = await fetch(URL_AI + "start");
    const data: Post[] = await response.json();
    console.log("Server responded with these results: ", data);
    setSimulationResponse(data);
    setChecked(true);
    setRequestSent(false);
    setTimeout(() => {
        setRateLimited(false);
    }, Math.floor((60 * 1000) / RATE_LIMIT_RPM));
}
