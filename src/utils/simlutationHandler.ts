import { SetterOrUpdater, useSetRecoilState } from "recoil";
import { URL_AI } from "./constants";
import { responseChecked, simRequestSent } from "../states";

export default async function simulationHandler(
    setSimulationResponse: SetterOrUpdater<string[]>,
    setChecked: SetterOrUpdater<boolean>,
    setRequestSent: SetterOrUpdater<boolean>
) {
    const response = await fetch(URL_AI + "start");
    const data: string[] = await response.json();
    console.log("Server responded with these results: ", data);
    setSimulationResponse(data);
    setChecked(true);
    setRequestSent(false);
}
