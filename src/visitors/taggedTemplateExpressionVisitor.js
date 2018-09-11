import {isStyled} from "../utils/detectors";
import transpileLess from "./transpileLess";
import {parse} from "babylon";
import generate from 'babel-generator';

const regex = /`([\s\S]*)`/;

function preProcess(source, sourceFilename, traverse) {
    const parsed = parse(source, {sourceFilename});

    traverse(parsed, {
        ArrowFunctionExpression(path) {
            path.traverse({
                TemplateLiteral(p) {
                    if (p.isClean) return;

                    const rawSource = source.slice(p.node.start, p.node.end);
                    if (!rawSource) return;

                    processNode(p, rawSource, sourceFilename);
                },
            });
        }
    });

    const {code} = generate(parsed, {}, source);
    return code;
}

const processNode = (p, rawSource, sourceFilename) => {
    const [foo, source] = regex.exec(rawSource) || [];
    if (!source) return;
    p.isClean = true;

    const raw = transpileLess(source, sourceFilename);
    p.replaceWithSourceString('`' + raw + '`');
};

export default (path, state, {types: t, traverse}) => {
    if (!isStyled(t)(path.node.tag, state)) {
        return;
    }

    // Find the TemplateLiteral in the TaggedTemplateExpression
    path.traverse({
        TemplateLiteral(p) {
            if (p.isClean) return;

            let rawSource = p.getSource();
            if (!rawSource) return;

            rawSource = preProcess(rawSource, state.file.opts.filename, traverse);

            processNode(p, rawSource, state.file.opts.filename);
        },
    });
}