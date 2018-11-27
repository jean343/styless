import {isStyled, isHelper} from "../utils/detectors";
import transpileLess from "./transpileLess";
import generate from '@babel/generator';

const regex = /([\s\S]*?`)([\s\S]*)(`[\s\S]*?)/;

export default (path, state, {types: t}) => {
    if (!(isStyled(t)(path.node.tag, state) || isHelper(t)(path.node.tag, state))) {
        return;
    }
    if (path.isClean) return;

    let rawSource = path.getSource();
    if (!rawSource) {
        const {code} = generate({
            type: 'Program',
            body: [path.node]
        });
        rawSource = code;
    }

    const [foo, prefix, source, suffix] = regex.exec(rawSource);
    if (!source) return;
    path.isClean = true;

    try {
        const raw = transpileLess(source, state.file.opts.filename, state.opts);
        if (source !== raw) {
            path.replaceWithSourceString(prefix + raw + suffix);
        }
    } catch (e) {
        console.error("Error converting the less syntax for the file:", state.file.opts.filename, rawSource, e);
    }
}