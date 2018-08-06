import {isStyled} from "../utils/detectors";
import transpileFunctions from "./transpileFunctions";
import convert from "./convert";
import stripJsonComments from "strip-json-comments";

export default (path, state) => {
    if (!isStyled(path.node.tag, state)) {
        return;
    }

    let source = path.getSource();

    if (!source.includes("@")) {
        return;
    }

    source = stripJsonComments(source);

    // https://regex101.com/r/WcrEPe/2
    source = source.replace(/if\s*\(\s*([\w-#@]+)\s*,\s*([\w-#@]+)\s*(?:,\s*([\w-#@]+)\s*)?\)/g, (match, m1, m2, m3) => {
        return `\${props => ${convert(m1)} ? ${convert(m2)} : ${convert(m3)}}` // Replaces if(@a, @b)
    });

    source = transpileFunctions(source);

    source = source.replace(/(\w*)\s*\(@\s*([\w-]+)\s*\)/g, (match, func, param) => {
        return `\${props => ${func}(${convert(param)})}` // Replaces function(@a)
    });

    source = source.replace(/(@[\w-]+)/g, (match, m1) => {
        return `\${props => ${convert(m1)}}` // Replaces @a
    });

    path.replaceWithSourceString(source);
}