import {isStyled} from "../utils/detectors";
import transpileAll from "./transpileAll";
import stripJsonComments from "strip-json-comments";

export default (path, state) => {
    if (!isStyled(path.node.tag, state)) {
        return;
    }
    const source = path.getSource();
    if (!source.includes("@")) {
        return;
    }
    path.replaceWithSourceString(transpileAll(stripJsonComments(source)));
}